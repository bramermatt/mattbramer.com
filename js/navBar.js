document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const basePath = (currentPath.includes("/posts/") ||
        currentPath.includes("/img/") ||
        currentPath.includes("/pages/") ||
        currentPath.includes("/writing/") ||
        currentPath.includes("/articles/"))
        ? "../" : "";

    const navbarHTML = `
    <nav id="navbar">
            <!-- Profile Section -->
        <div class="nav-profile">
            <div class="profile-content">
            <a href="${basePath}index.html">
                <img src="${basePath}img/matts/matt-profile.jpg" alt="Matt Bramer"></a>
                <h1>Matthew Bramer</h1>
            </div>
        </div>

        <!-- Desktop Navigation Links -->
        <ul class="page-links desktop-menu">
            <li><a href="${basePath}index.html"><i class="fa-solid fa-house"></i> <h2>home</h2></a></li>
            <li><a href="${basePath}pages/aboutMe.html"><i class="fa-solid fa-circle-user"></i> <h2>about</h2></a></li>
            <li><a href="${basePath}pages/thoughts.html"><i class="fa-solid fa-comment"></i> <h2>thoughts</h2></a></li>
            <li><a href="${basePath}pages/projects.html"><i class="fa-solid fa-code"></i> <h2>projects</h2></a></li>
            <li><a href="${basePath}pages/work.html"><i class="fa-solid fa-folder-open"></i> <h2>work</h2></a></li>
            <li><a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank"><i class="fa-solid fa-video"></i> <h2>video</h2></a></li>
            <li><a href="mailto:m.bramer1096@gmail.com"><i class="fa-solid fa-envelope"></i> <h2>contact</h2></a></li>
        </ul>

        <!-- Mobile Menu (Hidden on Desktop) -->
        <button class="hamburger" id="hamburger">
            <i class="fa-solid fa-bars"></i>
        </button>

        <div class="mobile-menu" id="mobile-menu">
            <button class="close-menu" id="close-menu">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <!-- Mobile Navigation Links (Same as Desktop) -->
            <ul class="page-links">
                <li><a href="${basePath}index.html"><i class="fa-solid fa-house"></i> <h2>home</h2></a></li>
                <li><a href="${basePath}pages/aboutMe.html"><i class="fa-solid fa-circle-user"></i> <h2>about</h2></a></li>
                <li><a href="${basePath}pages/thoughts.html"><i class="fa-solid fa-comment"></i> <h2>thoughts</h2></a></li>
                <li><a href="${basePath}pages/projects.html"><i class="fa-solid fa-code"></i> <h2>projects</h2></a></li>
                <li><a href="${basePath}pages/work.html"><i class="fa-solid fa-folder-open"></i> <h2>work</h2></a></li>
                <li><a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank"><i class="fa-solid fa-video"></i> <h2>video</h2></a></li>
                <li><a href="mailto:m.bramer1096@gmail.com"><i class="fa-solid fa-envelope"></i> <h2>contact</h2></a></li>
            </ul>
        </div>
    </nav>`;

    const thumbNavHTML = `
    <div id="thumbNav" style="display: none;">
        <button id="scrollToTopBtn"><i class="fa-regular fa-circle-up"></i></button>
    </div>`;

    // Insert the elements separately
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', thumbNavHTML);

    // Mobile menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.add("active"); // Open menu
        });

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("active"); // Close menu
        });

        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                mobileMenu.classList.remove("active"); // Close when clicking outside
            }
        });
    }

    // Scroll to top button logic
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const thumbNav = document.getElementById("thumbNav");

    // Hide #thumbNav initially
    thumbNav.style.display = "none";

    // Show #thumbNav when scrolled down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            thumbNav.style.display = "flex";
        } else {
            thumbNav.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Page title logic
    const pageTitleElement = document.querySelector(".page-content h1"); // Select the h1 inside .page-content
    const headTitleElement = document.querySelector("head title"); // Select the <title> tag in the <head>

    // Default title
    let newTitle = "Matthew Bramer";

    if (currentPath.includes("/pages/")) {
        newTitle = pageTitleElement ? pageTitleElement.textContent : newTitle;
    } else if (currentPath.includes("/reviews/")) {
        const bookTitle = decodeURIComponent(currentPath.split("/").pop().replace(/-/g, " ")).replace(".html", "");
        newTitle = bookTitle;
    } else if (currentPath.includes("/articles/")) {
        const articleTitle = decodeURIComponent(currentPath.split("/").pop().replace(/-/g, " ")).replace(".html", "");
        newTitle = articleTitle;
    }

    if (headTitleElement) {
        headTitleElement.textContent = newTitle;
    }

    if (pageTitleElement) {
        pageTitleElement.textContent = newTitle;
    }
});
