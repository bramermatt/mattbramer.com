// Immediately-Invoked Function Expression (IIFE) to keep things tidy
(async function() {

  // Get the container where the archive will appear
  const container = document.getElementById('content-list');
  if (!container) return; // nothing to do if container not found

  // Path to the folder containing article files
  const contentPath = container.dataset.path; // e.g., "/content/thoughts/"

  try {
    // Fetch the index.json file listing article filenames
    const response = await fetch(`${contentPath}index.json`);
    const files = await response.json(); // array of filenames

    const articles = [];

    // Fetch each article file
    for (const file of files) {
      const res = await fetch(contentPath + file);
      const text = await res.text();

      // Parse HTML string into a DOM element
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const article = doc.querySelector('article');
      if (!article) continue;

      // Extract metadata from data-* attributes
      articles.push({
        title: article.dataset.title,
        date: article.dataset.date,
        url: contentPath + file
      });
    }

    // Sort articles by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render a simple list of links
    articles.forEach(item => {
      const el = document.createElement('div');
      el.className = 'archive-item';
      el.innerHTML = `
        <h3><a href="${item.url}">${item.title}</a></h3>
        <p class="meta">${new Date(item.date).toDateString()}</p>
      `;
      container.appendChild(el);
    });

  } catch (err) {
    console.error('Content loader error:', err);
  }

})();