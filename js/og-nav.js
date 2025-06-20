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
                    <img class="profile-img" src="${basePath}img/matts/matt-profile.jpg" alt="Matt Bramer"></a>
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
    <nav id="thumbNav" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);width:90%;background:#fff;border:1px solid #ccc;box-shadow:0 2px 8px rgba(0,0,0,0.1);border-radius:16px;display:flex;justify-content:space-around;align-items:center;padding:12px 8px;font-size:14px;z-index:50;max-width:500px;">
        <a href="${basePath}index.html" style="display:flex;flex-direction:column;align-items:center;color:#222;;text-decoration:none;">
            <i class="fa-solid fa-house" style="font-size:18px;"></i>
            Home
        </a>
        <a href="${basePath}pages/aboutMe.html" style="display:flex;flex-direction:column;align-items:center;color:#666;text-decoration:none;">
            <i class="fa-solid fa-circle-user" style="font-size:18px;"></i>
            About
        </a>
        <a href="${basePath}pages/thoughts.html" style="display:flex;flex-direction:column;align-items:center;color:#666;text-decoration:none;">
            <i class="fa-solid fa-comment" style="font-size:18px;"></i>
            Thoughts
        </a>
        <a href="${basePath}pages/projects.html" style="display:flex;flex-direction:column;align-items:center;color:#666;text-decoration:none;">
            <i class="fa-solid fa-code" style="font-size:18px;"></i>
            Projects
        </a>
        <a href="${basePath}pages/work.html" style="display:flex;flex-direction:column;align-items:center;color:#666;text-decoration:none;">
            <i class="fa-solid fa-folder-open" style="font-size:18px;"></i>
            Work
        </a>
    </nav>`;

    const imgModalHTML = `
        <div id="myModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="img01">
        <div id="caption"></div>
    </div>`;

    // Insert the elements separately
    // document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', thumbNavHTML + imgModalHTML); // Fixed insertion of imgModalHTML

    // Mobile menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.add("active"); // Open menu
            document.body.classList.add("menu-open"); // Change background
        });

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("active"); // Close menu
            document.body.classList.remove("menu-open"); // Reset background
        });

        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                mobileMenu.classList.remove("active"); // Close when clicking outside
                document.body.classList.remove("menu-open"); // Reset background
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

    // Image Modal Logic
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    // Get all images on the page, excluding the profile image
    const images = document.querySelectorAll('img:not(.profile-img)');
    images.forEach(function (image) {
        image.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.textContent = this.alt || ''; // Display alt text as caption

            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden'; // Disable scrolling
        });
    });

    // Close modal when user clicks on the close button (X)
    const close = document.getElementsByClassName("close")[0];
    close.addEventListener('click', function () {
        modal.style.display = "none";

        // Enable scrolling when modal is closed
        document.body.style.overflow = ''; // Re-enable scrolling
    });
});
