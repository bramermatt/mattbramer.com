// content-loader.js

// 1️⃣ CSS as a string
const styles = `
/* Reset & base */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    
    padding: 1rem;
    max-width: 900px;
    margin: auto;
}
h1,h2,h3,h4,h5,h6 { font-family: 'system-ui', serif; margin: .5em 0; line-height: 1.3; color: #222; }
h1 { font-size: 2.5rem; } h2 { font-size: 2rem; } h3 { font-size: 1rem; }
p { margin: 0; font-size: 1rem; color: #333; }
a { color: #ff4c00; text-decoration: none; line-break: break-word; transition: color 0.3s; }
a:hover { color: #e03e00; text-decoration: underline; }
img { max-width: 100%; height: auto; display: block; margin: 1rem 0; border-radius: 8px; }
ul, ol { margin: 1rem 0 1rem 1.5rem; padding-left: 0; }
li { margin-bottom: 0.5rem; }
pre, code { font-family: 'Fira Code', monospace; background: #f2f2f2; padding: 0.3rem 0.5rem; border-radius: 5px; overflow-x: auto; }
pre { margin: 1rem 0; padding: 1rem; }
blockquote { border-left: 4px solid #ff4c00; padding-left: 1rem; color: #555; font-style: italic; margin: 1rem 0; }
table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
th, td { padding: 0.75rem 1rem; border: 1px solid #ddd; }
th { background: #ff4c00; color: #fff; }
button, .btn { background: #ff4c00; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; transition: background 0.3s; }
button:hover, .btn:hover { background: #e03e00; }
hr { border: none; border-top: 1px solid #ddd; margin: 2rem 0; }
.file-title { font-size: 1.2rem; font-weight: bold; color: #ff4c00; margin-bottom: 1rem; }
.archive-item { margin-bottom: 1.5rem; }
.meta { font-size: 0.85rem; color: #666; }
`;

// 2️⃣ Inject CSS
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// 3️⃣ Content loader
async function loadContent(filePath) {
    try {
        const res = await fetch(filePath);
        const html = await res.text();
        const container = document.getElementById("content");
        container.innerHTML = '';

        // Extract file name from path
        const fileName = filePath.split('/').pop();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const article = doc.querySelector('article');

        // Use data-title if available, else show file name
        const titleText = article?.dataset.title || fileName;
        const titleDiv = document.createElement('div');
        titleDiv.className = 'file-title';
        titleDiv.textContent = titleText;
        container.appendChild(titleDiv);

        // Append the actual content
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = html;
        container.appendChild(contentDiv);
    } catch (err) {
        console.error('Error loading content:', err);
    }
}

// 4️⃣ Navigation setup
let files = []; // will be loaded from index.json
let currentIndex = 0;

document.getElementById("next")?.addEventListener("click", () => {
    if (!files.length) return;
    currentIndex = (currentIndex + 1) % files.length;
    loadContent(files[currentIndex]);
});

document.getElementById("prev")?.addEventListener("click", () => {
    if (!files.length) return;
    currentIndex = (currentIndex - 1 + files.length) % files.length;
    loadContent(files[currentIndex]);
});

// 5️⃣ Load archive list from index.json
(async function() {
    const container = document.getElementById('content-list');
    if (!container) return;

    const contentPath = container.dataset.path || '/content/thoughts/';

    try {
        const response = await fetch(`${contentPath}index.json`);
        files = await response.json();

        const articles = [];
        for (const file of files) {
            const res = await fetch(contentPath + file);
            const text = await res.text();
            const doc = new DOMParser().parseFromString(text, 'text/html');
            const article = doc.querySelector('article');

            articles.push({
                title: article?.dataset.title || file.split('/').pop(),
                date: article?.dataset.date || '1970-01-01',
                url: contentPath + file
            });
        }

        // Sort newest first
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Render list
        articles.forEach(item => {
            const el = document.createElement('div');
            el.className = 'archive-item';
            el.innerHTML = `<h3><a href="${item.url}">${item.title}</a></h3>
                            <p class="meta">${new Date(item.date).toDateString()}</p>`;
            container.appendChild(el);
        });

        // Load first article by default
        if (files.length) loadContent(files[0]);

    } catch (err) {
        console.error('Error loading archive:', err);
    }
})();