#!/usr/bin/env bash
set -e

echo "== Creating archive directories =="

mkdir -p archive/old-css
mkdir -p css
mkdir -p projects
mkdir -p assets

echo "== Archiving old CSS =="

find css -maxdepth 1 -name "*.css" -exec mv {} archive/old-css/ \; || true

echo "== Creating new minimalist stylesheet =="

cat > css/style.css <<'EOF2'
:root {
  --bg: #f7f5f2;
  --text: #1c1c1c;
  --muted: #666;
  --link: #111;
  --border: #ddd;
  --max-width: 760px;
}

* {
  box-sizing: border-box;
}

html {
  font-size: 18px;
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);

  font-family:
    Georgia,
    Cambria,
    "Times New Roman",
    serif;

  line-height: 1.75;
}

main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

header {
  margin-bottom: 4rem;
}

.site-title {
  font-size: 2.5rem;
  font-weight: normal;
  margin: 0;
}

.site-subtitle {
  color: var(--muted);
  margin-top: 0.5rem;
}

nav {
  margin-top: 2rem;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: var(--link);
}

nav a:hover {
  text-decoration: underline;
}

.archive-section {
  margin-top: 4rem;
}

.archive-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.archive-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.archive-item {
  padding: 1rem 0;
  border-top: 1px solid var(--border);
}

.archive-item:first-child {
  border-top: none;
}

.archive-link {
  text-decoration: none;
  color: var(--text);
  font-size: 1.2rem;
}

.archive-link:hover {
  text-decoration: underline;
}

.archive-meta {
  color: var(--muted);
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

footer {
  margin-top: 5rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.social-links a {
  margin-right: 1rem;
}
EOF2

echo "== Creating projects archive page =="

cat > projects/index.html <<'EOF2'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Projects — Matthew Bramer</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>

<body>
<main>

<header>
  <h1 class="site-title">Matthew Bramer</h1>

  <p class="site-subtitle">
    Teaching science, Scripture, and wonder.
  </p>

  <nav>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/writings">Writings</a>
    <a href="/teachings">Teachings</a>
  </nav>
</header>

<section class="archive-section">
  <div class="archive-title">Projects</div>

  <ul class="archive-list">

    <li class="archive-item">
      <a class="archive-link" href="#">
        Midnight Service — Acts 20 Sermon
      </a>

      <div class="archive-meta">
        Sermon / Theology / Church
      </div>
    </li>

    <li class="archive-item">
      <a class="archive-link" href="#">
        Liquid Hydrogen and Rocket Cooling Notes
      </a>

      <div class="archive-meta">
        Physics / Space / Engineering
      </div>
    </li>

    <li class="archive-item">
      <a class="archive-link" href="#">
        Gospel Introductions Series
      </a>

      <div class="archive-meta">
        Bible Teaching / Writing
      </div>
    </li>

  </ul>
</section>

<footer>

  <div class="social-links">
    <a href="https://youtube.com/">YouTube</a>
    <a href="https://github.com/">GitHub</a>
    <a href="https://x.com/">X</a>
  </div>

</footer>

</main>
</body>
</html>
EOF2

echo "== Done =="
