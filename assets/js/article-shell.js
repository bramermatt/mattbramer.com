(function () {
    function ensureFontAwesome() {
        if (document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]')) {
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
        document.head.appendChild(link);
    }

    function normalizeAssetPath(path) {
        if (!path) {
            return path;
        }

        if (/^(https?:|\/\/|data:|#|\/)/i.test(path)) {
            return path;
        }

        return path
            .replace(/^(\.\.\/)+(img\/)/i, "/img/")
            .replace(/^(\.\.\/)+(pages\/)/i, "/pages/")
            .replace(/^(\.\.\/)+(assets\/)/i, "/assets/")
            .replace(/^(\.\.\/)+(v2\/)/i, "/v2/")
            .replace(/^(\.\.\/)+(js\/)/i, "/js/")
            .replace(/^(\.\.\/)+(css\/)/i, "/css/");
    }

    function fileNameFromPath() {
        const parts = window.location.pathname.split("/");
        return parts[parts.length - 1] || "article.html";
    }

    function categoryFromFileName(fileName) {
        const slug = fileName.replace(/\.html$/i, "").replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "");
        const categoryMap = [
            ["bookreview", "Book Review"],
            ["bookdiscussion", "Book Discussion"],
            ["moviereview", "Movie Review"],
            ["tvshowreview", "TV Review"],
            ["videogamereview", "Video Game Review"],
            ["techreview", "Tech Review"],
            ["foodreview", "Food Review"],
            ["bikecommuteblog", "Bike Commute"],
            ["faithblog", "Faith Writing"],
            ["faith", "Faith Writing"],
            ["opinionblog", "Opinion"],
            ["websiteupdate", "Website Update"],
            ["websiteupdates", "Website Update"],
            ["interestsblog", "Interests"],
            ["familyblog", "Family"],
            ["schoolblog", "School"],
            ["books", "Books"],
            ["video", "Video"]
        ];

        const match = categoryMap.find(([token]) => slug.startsWith(token));
        return match ? match[1] : "Writing";
    }

    function normalizeDate(rawDate) {
        if (!rawDate) {
            return "";
        }

        const normalized = new Date(rawDate);
        if (Number.isNaN(normalized.getTime())) {
            return rawDate.trim();
        }

        return normalized.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }

    function matchesDateText(text) {
        return /^(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},\s+\d{4}$/i.test(text.trim());
    }

    function textContent(node) {
        return node?.textContent?.replace(/\s+/g, " ").trim() || "";
    }

    function findTitle() {
        const candidates = [
            document.querySelector("article[data-title]")?.dataset.title,
            textContent(document.querySelector("#article-title")),
            textContent(document.querySelector(".blog-title h1")),
            textContent(document.querySelector(".blog-alt-title h1")),
            textContent(document.querySelector("article h1")),
            textContent(document.querySelector("main h1")),
            textContent(document.querySelector("h1")),
            document.title.replace(/\s*\|\s*Matt Bramer$/i, "").trim()
        ];

        return candidates.find(Boolean) || "Article";
    }

    function findDate() {
        const article = document.querySelector("article[data-date]");
        if (article?.dataset.date) {
            return normalizeDate(article.dataset.date);
        }

        const candidates = [
            textContent(document.querySelector("#date")),
            textContent(document.querySelector(".blog-title > p")),
            textContent(document.querySelector(".blog-alt-title > p"))
        ];

        const direct = candidates.find(matchesDateText);
        if (direct) {
            return direct;
        }

        const allParagraphs = [...document.querySelectorAll("p")].map(textContent);
        return allParagraphs.find(matchesDateText) || "";
    }

    function findImageInfo() {
        const selectors = [
            ["#image img", "#image blockquote"],
            [".blog-title img", ".blog-title blockquote"],
            [".blog-alt-title img", ".blog-alt-title blockquote"],
            ["#art img", "#art-caption"],
            ["article img", "article blockquote"],
            ["main img", "main blockquote"]
        ];

        for (const [imageSelector, captionSelector] of selectors) {
            const image = document.querySelector(imageSelector);
            if (!image) {
                continue;
            }

            const caption = textContent(document.querySelector(captionSelector));
            return {
                src: normalizeAssetPath(image.getAttribute("src")),
                alt: image.getAttribute("alt") || "",
                caption
            };
        }

        return null;
    }

    function extractDek(contentRoot, title) {
        const paragraphs = [...contentRoot.querySelectorAll("p")]
            .map(paragraph => textContent(paragraph))
            .filter(Boolean);

        return paragraphs.find(paragraph => paragraph !== title && paragraph.length > 70) || "";
    }

    function collectTagLinks() {
        const links = [...document.querySelectorAll(".blog-title a, #tags a, .blog-tag a, .title a")]
            .map(link => ({
                href: normalizeAssetPath(link.getAttribute("href")),
                label: textContent(link)
            }))
            .filter(link => link.href && link.label && !/^home$/i.test(link.label));

        const seen = new Set();
        return links.filter(link => {
            const key = `${link.href}|${link.label}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    function chooseContentRoot() {
        return (
            document.querySelector(".blog-container .blog") ||
            document.querySelector("article#post > div:last-child") ||
            document.querySelector("main article.pd-15") ||
            document.querySelector("main article") ||
            document.querySelector("article[data-title]") ||
            document.querySelector("main") ||
            document.body
        );
    }

    function cleanContent(root, title, dateText, imageInfo) {
        const content = root.cloneNode(true);
        const removableSelectors = [
            ".hamburger",
            ".navbar",
            ".inline-navbar",
            "#myBtn",
            "script",
            "style",
            ".blog-title",
            ".blog-alt-title",
            ".title",
            "#image",
            "#art",
            "#art-caption",
            "#tags",
            "#article-title",
            ".release",
            "nav"
        ];

        content.querySelectorAll(removableSelectors.join(",")).forEach(node => node.remove());

        const heading = content.querySelector("h1");
        if (heading && textContent(heading) === title) {
            heading.remove();
        }

        const paragraphs = [...content.querySelectorAll("p")];
        paragraphs.forEach((paragraph, index) => {
            const text = textContent(paragraph);
            if (!text) {
                return;
            }

            const sameAsDate = dateText && text === dateText;
            const sameAsCaption = imageInfo?.caption && text === imageInfo.caption;
            const sameAsTitle = text === title;
            const looksLikeIntroNote = /about the links:/i.test(text);

            if ((sameAsDate || sameAsCaption || sameAsTitle) && index < 6) {
                paragraph.remove();
            } else if (looksLikeIntroNote) {
                paragraph.classList.add("article-link-note");
            }
        });

        content.querySelectorAll("img").forEach(image => {
            image.setAttribute("src", normalizeAssetPath(image.getAttribute("src")));
            if (imageInfo?.src && image.getAttribute("src") === imageInfo.src) {
                image.remove();
            }
        });

        content.querySelectorAll("a[href]").forEach(link => {
            link.setAttribute("href", normalizeAssetPath(link.getAttribute("href")));
        });

        content.querySelectorAll("blockquote").forEach(quote => {
            const quoteText = textContent(quote);
            if (imageInfo?.caption && quoteText === imageInfo.caption) {
                quote.remove();
            }
        });

        return content;
    }

    function createTopbar() {
        const header = document.createElement("header");
        header.className = "article-topbar";
        header.innerHTML = `
            <a class="article-brand" href="/index.html" aria-label="Matt Bramer home">
                <span class="article-brand-mark">MB</span>
                <span class="article-brand-text">Matt Bramer</span>
            </a>
            <nav aria-label="Primary">
                <ul>
                    <li><a href="/thoughts.html" data-nav="writing"><span class="nav-label">Writing</span></a></li>
                    <li><a href="/projects.html" data-nav="projects"><span class="nav-label">Projects</span></a></li>
                    <li><a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank" rel="noopener" data-nav="youtube"><span class="nav-label">YouTube</span></a></li>
                    <li><a href="/index.html#support" data-nav="support"><span class="nav-label">Support</span></a></li>
                </ul>
            </nav>
        `;
        return header;
    }

    function createHero(title, dateText, category, dek, imageInfo) {
        const section = document.createElement("section");
        section.className = "article-panel article-hero";

        const copy = document.createElement("div");
        copy.innerHTML = `
            <p class="article-kicker">From the archive</p>
            <h1>${title}</h1>
            <p class="article-category-label">${category}</p>
            ${dek ? `<p class="article-dek">${dek}</p>` : ""}
            <div class="article-meta-strip">
                ${dateText ? `<span class="article-meta-pill">${dateText}</span>` : ""}
                <span class="article-meta-pill">Matt Bramer</span>
            </div>
        `;

        section.appendChild(copy);

        if (imageInfo?.src) {
            const figure = document.createElement("figure");
            figure.className = "article-hero-figure";
            figure.innerHTML = `
                <img src="${imageInfo.src}" alt="${imageInfo.alt}">
                ${imageInfo.caption ? `<figcaption>${imageInfo.caption}</figcaption>` : ""}
            `;
            section.appendChild(figure);
        }

        return section;
    }

    function createSidebar(category, dateText, tagLinks) {
        const aside = document.createElement("aside");
        aside.className = "article-sidebar";

        const detailsCard = document.createElement("section");
        detailsCard.className = "article-aside-card";
        detailsCard.innerHTML = `
            <h2>Article Map</h2>
            <p>This piece lives in the <strong>${category}</strong> shelf.</p>
            ${dateText ? `<p>Published ${dateText}.</p>` : ""}
            <div class="article-meta-nav">
                <a class="article-button primary" href="/thoughts.html">Back to Archive</a>
                <a class="article-button secondary" href="/index.html">Home</a>
            </div>
        `;
        aside.appendChild(detailsCard);

        const browseCard = document.createElement("section");
        browseCard.className = "article-aside-card";
        browseCard.innerHTML = `
            <h2>Keep Exploring</h2>
            <p>Browse more writing, visit the project shelf, or return to the main hub.</p>
            <div class="article-meta-nav">
                <a class="article-button secondary" href="/projects.html">Projects</a>
                <a class="article-button secondary" href="/thoughts.html#content-list">Archive</a>
            </div>
        `;
        aside.appendChild(browseCard);

        if (tagLinks.length) {
            const tagsCard = document.createElement("section");
            tagsCard.className = "article-aside-card";
            const links = tagLinks
                .map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
                .join("");
            tagsCard.innerHTML = `
                <h2>Related Shelves</h2>
                <ul>${links}</ul>
            `;
            aside.appendChild(tagsCard);
        }

        return aside;
    }

    function buildShell() {
        ensureFontAwesome();

        const fileName = fileNameFromPath();
        const title = findTitle();
        const dateText = findDate();
        const category = categoryFromFileName(fileName);
        const contentRoot = chooseContentRoot();
        const imageInfo = findImageInfo();
        const tagLinks = collectTagLinks();
        const dek = extractDek(contentRoot, title);
        const cleanedContent = cleanContent(contentRoot, title, dateText, imageInfo);

        document.body.classList.add("article-shell-page");
        [...document.body.children].forEach(node => {
            node.classList.add("legacy-hidden");
        });

        const shell = document.createElement("div");
        shell.className = "article-shell-root";

        const topbar = createTopbar();
        const main = document.createElement("main");
        main.className = "article-shell";
        main.appendChild(createHero(title, dateText, category, dek, imageInfo));

        const bodyGrid = document.createElement("section");
        bodyGrid.className = "article-panel article-body-grid";

        const prose = document.createElement("article");
        prose.className = "article-prose";
        prose.innerHTML = cleanedContent.innerHTML;

        bodyGrid.append(prose, createSidebar(category, dateText, tagLinks));
        main.appendChild(bodyGrid);

        shell.append(topbar, main);
        document.body.appendChild(shell);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildShell);
    } else {
        buildShell();
    }
})();
