function titleFromFileName(fileName) {
    return fileName
        .replace(/\.html$/i, "")
        .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

function categoryFromFileName(fileName) {
    const slug = fileName.replace(/\.html$/i, "").replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "");

    const categoryMap = [
        ["bookreview", "Book Reviews"],
        ["moviereview", "Movie Reviews"],
        ["tvshowreview", "TV Reviews"],
        ["videogamereview", "Video Game Reviews"],
        ["techreview", "Tech Reviews"],
        ["foodreview", "Food Reviews"],
        ["bikecommuteblog", "Bike Commute"],
        ["faithblog", "Faith Writing"],
        ["faith", "Faith Writing"],
        ["opinionblog", "Opinions"],
        ["websiteupdate", "Website Updates"],
        ["interestsblog", "Interests"],
        ["familyblog", "Family"],
        ["schoolblog", "School"],
        ["books", "Books"],
        ["video", "Videos"]
    ];

    const match = categoryMap.find(([token]) => slug.startsWith(token));
    return match ? match[1] : "Writing";
}

function normalizeDate(rawDate, fileName) {
    const fallbackMatch = fileName.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-/);
    const fallbackDate = fallbackMatch
        ? `${fallbackMatch[1]}-${fallbackMatch[2].padStart(2, "0")}-${fallbackMatch[3].padStart(2, "0")}`
        : "1970-01-01";

    if (!rawDate) {
        return fallbackDate;
    }

    const normalized = new Date(rawDate);
    if (Number.isNaN(normalized.getTime())) {
        return fallbackDate;
    }

    return normalized.toISOString().slice(0, 10);
}

function formatDate(dateString) {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function extractTitle(doc, article, fileName) {
    const selectors = [
        article?.dataset?.title,
        article?.querySelector("h1")?.textContent,
        doc.querySelector("#article-title")?.textContent,
        doc.querySelector(".blog-alt-title h1")?.textContent,
        doc.querySelector(".blog-title h1")?.textContent,
        doc.querySelector("main h1")?.textContent,
        doc.querySelector("h1")?.textContent,
        doc.title
    ];

    return selectors.find(Boolean)?.trim() || titleFromFileName(fileName);
}

function extractDate(doc, article, fileName) {
    const selectors = [
        article?.dataset?.date,
        doc.querySelector("#date")?.textContent,
        doc.querySelector(".release #date")?.textContent,
        doc.querySelector("time")?.getAttribute("datetime"),
        doc.querySelector("time")?.textContent
    ];

    return normalizeDate(selectors.find(Boolean)?.trim(), fileName);
}

function extractExcerpt(doc, article) {
    const pools = [
        article,
        doc.querySelector("main article"),
        doc.querySelector("main"),
        doc.body
    ].filter(Boolean);

    for (const pool of pools) {
        const paragraphs = [...pool.querySelectorAll("p")];
        const match = paragraphs
            .map(paragraph => paragraph.textContent.replace(/\s+/g, " ").trim())
            .find(text => text.length > 55 && !/^(matt bramer|home|recent|blog|coverage|projects|reviews|videos|about)$/i.test(text));

        if (match) {
            return match;
        }
    }

    return "A piece from the archive.";
}

async function parseArticle(path, fileName) {
    const response = await fetch(path);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const article = doc.querySelector("article[data-title], article[data-date], main article, article");
    const title = extractTitle(doc, article, fileName);
    const date = extractDate(doc, article, fileName);
    const category = categoryFromFileName(fileName);
    const excerpt = extractExcerpt(doc, article).slice(0, 220);

    return {
        title,
        date,
        dateLabel: formatDate(date),
        category,
        excerpt: excerpt.endsWith(".") ? excerpt : `${excerpt}...`,
        url: path,
        year: date.slice(0, 4),
        searchText: `${title} ${category} ${excerpt}`.toLowerCase()
    };
}

function renderProjects(categories, container) {
    const categoryDescriptions = {
        Web: "Published websites designed around clear navigation, readable structure, and practical presentation.",
        Apps: "Interactive tools meant to help with tracking, study, daily use, or small internet workflows.",
        Games: "Smaller builds focused on interaction, play, and front-end experimentation.",
        "Practice Projects": "Exercises and repositories that show how skills were built and sharpened over time."
    };

    container.innerHTML = "";

    categories.forEach(category => {
        const catDiv = document.createElement("section");
        catDiv.className = "project-category";
        catDiv.innerHTML = `
            <div class="project-category-heading">
                <p class="eyebrow">Category</p>
                <h2>${category.type}</h2>
                <p>${categoryDescriptions[category.type] || "A group of projects from this part of the site."}</p>
            </div>
        `;
        container.appendChild(catDiv);

        const grid = document.createElement("div");
        grid.className = "projects-grid";

        category.projects.forEach(project => {
            const section = document.createElement("section");
            section.className = "project-card";
            section.innerHTML = `
                <div class="project-card-top">
                    <p class="project-tech">${project.tech}</p>
                    ${project.featured ? '<span class="project-badge">Featured</span>' : ""}
                </div>
                <div>
                    <h3><a href="${project.url}" target="_blank" rel="noopener">${project.title}</a></h3>
                    <h4>${project.tech}</h4>
                    <div class="project-blurb">
                        <p>${project.blurb}</p>
                    </div>
                    <a class="text-link" href="${project.url}" target="_blank" rel="noopener">Open project</a>
                </div>
            `;
            grid.appendChild(section);
        });

        container.appendChild(grid);
    });
}

function buildFilterButtons(categories, activeCategory) {
    const filterBar = document.getElementById("filter-bar");
    if (!filterBar) {
        return;
    }

    filterBar.innerHTML = "";
    const allCategories = ["All", ...categories];

    allCategories.forEach(category => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `filter-chip${category === activeCategory ? " active" : ""}`;
        button.dataset.category = category;
        button.textContent = category;
        filterBar.appendChild(button);
    });
}

function renderFeatured(article) {
    const panel = document.getElementById("featured-panel");
    if (!panel) {
        return;
    }

    if (!article) {
        panel.innerHTML = `
            <div class="section-heading compact-heading">
                <p class="eyebrow">Featured Read</p>
                <h2>No articles match this filter.</h2>
            </div>
            <p>Try a broader category or clear the search to see the full archive again.</p>
        `;
        return;
    }

    panel.innerHTML = `
        <div class="section-heading compact-heading">
            <p class="eyebrow">Featured Read</p>
            <h2>${article.title}</h2>
        </div>
        <div class="featured-meta">
            <span>${article.dateLabel}</span>
            <span>${article.category}</span>
        </div>
        <p class="featured-excerpt">${article.excerpt}</p>
        <div class="featured-actions">
            <a class="button primary" href="${article.url}">Open article</a>
            <a class="text-link" href="#content-list">Browse the full archive</a>
        </div>
    `;
}

function renderRecent(articles) {
    const list = document.getElementById("recent-list");
    if (!list) {
        return;
    }

    list.innerHTML = "";

    articles.slice(1, 6).forEach(article => {
        const item = document.createElement("article");
        item.className = "recent-article";
        item.innerHTML = `
            <p class="recent-meta">${article.dateLabel} · ${article.category}</p>
            <h3><a href="${article.url}">${article.title}</a></h3>
            <p>${article.excerpt}</p>
        `;
        list.appendChild(item);
    });

    if (!list.children.length) {
        list.innerHTML = "<p class=\"empty-state\">No recent articles to show for this view.</p>";
    }
}

function renderArchiveGroups(articles) {
    const container = document.getElementById("content-list");
    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!articles.length) {
        container.innerHTML = "<p class=\"empty-state\">No articles match your search yet.</p>";
        return;
    }

    const grouped = articles.reduce((accumulator, article) => {
        accumulator[article.year] ||= [];
        accumulator[article.year].push(article);
        return accumulator;
    }, {});

    Object.entries(grouped).forEach(([year, yearArticles]) => {
        const group = document.createElement("section");
        group.className = "year-group";

        const heading = document.createElement("div");
        heading.className = "year-heading";
        heading.innerHTML = `<h3>${year}</h3><p>${yearArticles.length} article${yearArticles.length === 1 ? "" : "s"}</p>`;

        const grid = document.createElement("div");
        grid.className = "archive-card-grid";

        yearArticles.forEach(article => {
            const card = document.createElement("article");
            card.className = "archive-card";
            card.innerHTML = `
                <p class="archive-meta">${article.dateLabel}</p>
                <p class="archive-category">${article.category}</p>
                <h4><a href="${article.url}">${article.title}</a></h4>
                <p>${article.excerpt}</p>
            `;
            grid.appendChild(card);
        });

        group.append(heading, grid);
        container.appendChild(group);
    });
}

function updateArchiveSummary(totalArticles, visibleArticles, activeCategory, query) {
    const summary = document.getElementById("results-summary");
    if (!summary) {
        return;
    }

    const categoryLabel = activeCategory === "All" ? "all shelves" : activeCategory;
    const searchLabel = query ? ` matching "${query}"` : "";
    summary.textContent = `${visibleArticles} of ${totalArticles} articles in ${categoryLabel}${searchLabel}`;
}

function updateStats(articles) {
    const articleCount = document.getElementById("article-count");
    const yearSpan = document.getElementById("year-span");
    const categoryCount = document.getElementById("category-count");

    if (!articleCount || !yearSpan || !categoryCount || !articles.length) {
        return;
    }

    const years = articles.map(article => Number(article.year));
    const categories = new Set(articles.map(article => article.category));

    articleCount.textContent = `${articles.length}`;
    yearSpan.textContent = `${Math.max(...years) - Math.min(...years) + 1}`;
    categoryCount.textContent = `${categories.size}`;
}

function setupArticleExperience(articles) {
    const categories = [...new Set(articles.map(article => article.category))].sort((a, b) => a.localeCompare(b));
    const searchInput = document.getElementById("archive-search");
    const filterBar = document.getElementById("filter-bar");
    const state = {
        activeCategory: "All",
        query: ""
    };

    const render = () => {
        const query = state.query.trim().toLowerCase();
        const filtered = articles.filter(article => {
            const matchesCategory = state.activeCategory === "All" || article.category === state.activeCategory;
            const matchesQuery = !query || article.searchText.includes(query);
            return matchesCategory && matchesQuery;
        });

        buildFilterButtons(categories, state.activeCategory);
        updateArchiveSummary(articles.length, filtered.length, state.activeCategory, state.query);
        renderFeatured(filtered[0]);
        renderRecent(filtered);
        renderArchiveGroups(filtered);
    };

    filterBar?.addEventListener("click", event => {
        const button = event.target.closest("button[data-category]");
        if (!button) {
            return;
        }

        state.activeCategory = button.dataset.category || "All";
        render();
    });

    searchInput?.addEventListener("input", event => {
        state.query = event.target.value;
        render();
    });

    updateStats(articles);
    render();
}

async function loadProjects(jsonPath) {
    const container = document.getElementById("content-list");
    if (!container) {
        return;
    }

    container.innerHTML = "";

    try {
        const response = await fetch(jsonPath);
        const categories = await response.json();
        renderProjects(categories, container);
    } catch (error) {
        console.error("Error loading projects:", error);
        container.innerHTML = "<p>Failed to load projects.</p>";
    }
}

async function loadArticles(path) {
    const container = document.getElementById("content-list");
    if (!container) {
        return;
    }

    container.innerHTML = "<p class=\"empty-state\">Loading the archive...</p>";

    try {
        const response = await fetch(`${path}index.json`);
        const files = await response.json();
        const articles = await Promise.all(
            files.map(fileName => parseArticle(`${path}${fileName}`, fileName))
        );

        articles.sort((first, second) => new Date(second.date) - new Date(first.date));
        setupArticleExperience(articles);
    } catch (error) {
        console.error("Error loading articles:", error);
        container.innerHTML = "<p class=\"empty-state\">Failed to load the archive.</p>";
    }
}

(async function init() {
    const container = document.getElementById("content-list");
    if (!container) {
        return;
    }

    const path = container.dataset.path;

    if (path.includes("projects")) {
        loadProjects(`${path}index.json`);
        return;
    }

    loadArticles(path);
})();
