async function loadArticle(filePath) {
    try {
        const res = await fetch(filePath);
        const html = await res.text();
        const container = document.getElementById("content");
        container.innerHTML = '';

        const fileName = filePath.split('/').pop();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const article = doc.querySelector('article');

        const titleText = article?.dataset.title || fileName;
        const titleDiv = document.createElement('div');
        titleDiv.className = 'file-title';
        titleDiv.textContent = titleText;
        container.appendChild(titleDiv);

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = html;
        container.appendChild(contentDiv);

    } catch (err) {
        console.error('Error loading article:', err);
    }
}

// 3️⃣ Load JSON projects
async function loadProjects(jsonPath) {
    const container = document.getElementById("content-list");
    container.innerHTML = ''; // clear old content

    

    try {
        const res = await fetch(jsonPath);
        const categories = await res.json();

        categories.forEach(category => {
            // Category title
            const catDiv = document.createElement('div');
            catDiv.id = 'project-type';
            catDiv.innerHTML = `<h2>${category.type}</h2>`;
            container.appendChild(catDiv);

            // Projects grid
            const grid = document.createElement('div');
            grid.className = 'projects-grid';

            category.projects.forEach(p => {
                const section = document.createElement('section');
                const blurbDiv = document.createElement('p');

                section.innerHTML = `
                    <div>
                        <h3>
                            <a href="${p.url}" target="_blank">${p.title}</a>
                            ${p.featured ? '<i class="fa-solid fa-star glow-link"></i>' : ''}
                        </h3>
                        <h4>${p.tech}</h4>
                        <div class="project-blurb">
                            <p>${p.blurb}</p>
                        </div>
                        
                    </div>
                `;
                grid.appendChild(section);
            });

            container.appendChild(grid);
        });
    } catch (err) {
        console.error("Error loading projects:", err);
        container.innerHTML = '<p>Failed to load projects.</p>';
    }
}

// 4️⃣ Navigation (optional)
let files = [];
let currentIndex = 0;

document.getElementById("next")?.addEventListener("click", () => {
    if (!files.length) return;
    currentIndex = (currentIndex + 1) % files.length;
    loadArticle(files[currentIndex]);
});

document.getElementById("prev")?.addEventListener("click", () => {
    if (!files.length) return;
    currentIndex = (currentIndex - 1 + files.length) % files.length;
    loadArticle(files[currentIndex]);
});

// 5️⃣ Auto-detect content type
(async function init() {
    const container = document.getElementById('content-list');
    if (!container) return;

    const path = container.dataset.path;

    if (path.includes('projects')) {
        // load projects from JSON
        loadProjects(path + 'index.json');
    } else {
        // load articles from index.json
        try {
            const res = await fetch(path + 'index.json');
            files = await res.json();

            if (files.length) loadArticle(files[0]);

            // Optional: render archive list
            const articles = [];
            for (const file of files) {
                const r = await fetch(path + file);
                const text = await r.text();
                const doc = new DOMParser().parseFromString(text, 'text/html');
                const article = doc.querySelector('article');
                articles.push({
                    title: article?.dataset.title || file.split('/').pop(),
                    date: article?.dataset.date || '1970-01-01',
                    url: path + file
                });
            }
            articles.sort((a,b) => new Date(b.date) - new Date(a.date));
            articles.forEach(item => {
                const el = document.createElement('div');
                el.className = 'archive-item';
                el.innerHTML = `<h3><a href="${item.url}">${item.title}</a></h3>
                                <p class="meta">${new Date(item.date).toDateString()}</p>`;
                container.appendChild(el);
            });

        } catch (err) {
            console.error('Error loading articles:', err);
        }
    }
})();