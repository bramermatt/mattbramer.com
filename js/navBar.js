document.addEventListener("DOMContentLoaded", function () {
    // Determine the base path
    const currentPath = window.location.pathname;
    const basePath = (currentPath.includes("/posts/") ||
        currentPath.includes("/img/") ||
        currentPath.includes("/pages/") ||
        currentPath.includes("/articles/"))
        ? "../" : "";

    // Define HTML content
    const navbarHTML = `
    <nav id="navbar">
        <div class="navbar">
            <div class="logo">
                <a href="${basePath}index.html"><img src="${basePath}img/icons/mLogo.png" alt="Logo"></a>
            </div>
            <ul class="nav-links">
                <li><a href="${basePath}index.html#projects">Projects</a></li>
                <li><a href="${basePath}index.html#experience">Experience</a></li>
                <li><a href="${basePath}pages/articles.html">Articles</a></li>
            </ul>
        </div>
    </nav>
    `;

    const footerHTML = `
    <footer>
        <div class="foot-links">
            <div class="foot-group">
                <h1>Follow Me</h1>
                <div class="social">
                    <ul>
                        <li><a href="https://github.com/bramermatt" target="_blank"><i class="fa-brands fa-github"></i> </a></li>
                        <li><a href="https://x.com/bramermatt" target="_blank"><i class="fa-brands fa-x-twitter"></i> </a></li>
                        <li><a href="https://www.threads.net/@bramermatt" target="_blank"><i class="fa-brands fa-square-threads"></i> </a></li>
                        <!-- <li><a href="https://www.instagram.com/bramermatt/" target="_blank"><i class="fa-brands fa-square-instagram"></i> </a></li> -->
                        <li><a href="https://www.goodreads.com/user/show/145996417-matthew-bramer" target="_blank"><i class="fa-brands fa-goodreads"></i> </a></li>
                        <li><a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank"><i class="fa-brands fa-youtube"></i> </a></li>
                        <li><a href="https://linktr.ee/Ministryinthemess" target="_blank"><i class="fa-solid fa-podcast"></i> </a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    `;

    const progressBarHTML = `
    <div class="progress-container">
        <div class="progress-bar" id="progress-bar"></div>
    </div>
    `;

    const scrollButtonHTML = `
    <ul class="thumbNav" id="toTopButton" style="display: none;">
        <li onclick="toTopFunction()" title="Go to top">
            <a href="#"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
        </li>
    </ul>
    `;

    const tableOfHTML = `
    <div class="thumbContents dropup" id="tableOfContents">
        <ul class="toc-list" style="display: none;"></ul>
        <button class="toc-toggle"><i class="fa-solid fa-list"></i></button>
    </div>
    `;

    const articleThumbHTML = `
    <div class="articleTitleThumb">

        <img src="" alt="Image" id="thumbImage">

        <div class="titleThumb">
            <h1 id="titleThumb"></h1>
            <p id="dateThumb"></p>
        </div>

        <div class="titleButtons">
        <a href="../index.html">
            <button id="homeButton"><i class="fa-solid fa-house"></i></button>
        </a>
        
        <!-- <button id=""><i class="fa-solid fa-circle-info"></i></button> -->

        <button id="hideButton"><i class="fa-solid fa-eye-slash"></i></button>
        </div>
    </div>
    `;

    // Insert HTML into DOM
    document.body.insertAdjacentHTML('afterbegin', navbarHTML + progressBarHTML + articleThumbHTML);
    // document.body.insertAdjacentHTML('beforeend', scrollButtonHTML + tableOfHTML + footerHTML);

    // TOC functionality
    const tocContainer = document.getElementById('tableOfContents');
    const tocList = tocContainer.querySelector('.toc-list');
    const toggleButton = tocContainer.querySelector('.toc-toggle');
    const headings = document.querySelectorAll('article h1, article h2, article h3');

    headings.forEach((heading, index) => {
        // Skip h2 elements inside <details>
        if (heading.tagName === 'H2' && heading.closest('details')) {
            return; // Skip this heading if it's inside a <details> element
        }

        if (!heading.id) heading.id = `heading-${index}`;
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    toggleButton.addEventListener('click', () => {
        tocList.style.display = tocList.style.display === 'block' ? 'none' : 'block';
    });

    // Intersection Observer for TOC highlighting
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = document.querySelector(`a[href="#${entry.target.id}"]`);
            link.classList.toggle('active', entry.isIntersecting);
        });
    }, { root: null, threshold: 0.6 });

    headings.forEach(heading => observer.observe(heading));

    // Scroll-to-top functionality
    const toTopButton = document.getElementById('toTopButton');
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.onscroll = function () {
        toTopButton.style.display = window.scrollY > 240 ? "block" : "none";
        tocContainer.style.display = window.scrollY > 240 ? "block" : "none";
        updateProgressBar();
        navbar.classList.toggle('hidden', window.scrollY > lastScrollY);
        lastScrollY = window.scrollY;
    };

    window.toTopFunction = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
        progressBar.style.background = scrollPercentage < 33 ? "green" : scrollPercentage < 66 ? "darkyellow" : "green";
    }

    updateProgressBar();

    // Article thumbnail observer
    const articleThumb = document.querySelector('.articleTitleThumb');
    const titleElement = document.querySelector('#article-title');
    const dateElement = document.querySelector('#date');
    const imageElement = document.querySelector('#art img');
    const titleThumb = document.querySelector('#titleThumb');
    const dateThumb = document.querySelector('#dateThumb');
    const thumbImage = document.querySelector('#thumbImage');

    if (titleElement) titleThumb.textContent = titleElement.textContent.trim();
    if (dateElement) dateThumb.textContent = dateElement.textContent.trim();
    if (imageElement) thumbImage.src = imageElement.src;

    if (titleElement) {
        const thumbObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                articleThumb.style.display = entry.isIntersecting ? 'none' : 'flex';
            });
        }, { root: null, threshold: 0.2 });
        thumbObserver.observe(titleElement);
    }

    // Hide content after clicking TOC links
    tocList.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            tocList.style.display = 'none'; // Hide the TOC after clicking a link
        }
    });

    // Add event listener for hide button
    document.getElementById('hideButton').addEventListener('click', function() {
        const articleContainer = document.querySelector('.articleTitleThumb');
        articleContainer.style.display = articleContainer.style.display === 'none' ? 'block' : 'none';
    });




});

const script = document.createElement('script');
script.src = "https://www.biblegateway.com/public/link-to-us/tooltips/bglinks.js";
script.type = "text/javascript";
document.head.appendChild(script);

script.onload = function() {
    if (typeof BGLinks !== "undefined") {
        BGLinks.version = "NASB";
        BGLinks.linkVerses();
    }
};



