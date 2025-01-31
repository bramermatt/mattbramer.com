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
        <div class="navbar">
            <div class="nav-item" onclick="window.location.href='${basePath}index.html'">
                <i class="fas fa-home"></i> Home
            </div>
            <span class="separator">|</span>
            <div class="nav-item" onclick="window.location.href='${basePath}pages/articles.html'">
                <i class="fas fa-file-alt"></i> Articles
            </div>

            <!-- <span class="separator">|</span>
            <div class="nav-item">
            <div class="search-icon" id="searchIcon">
                <i class="fas fa-search"></i> Search
            </div>
            </div> -->

            <!-- <span class="separator">|</span>
            <div class="theme-toggle" id="themeToggle">
                <i class="fas fa-moon"></i>
            </div> -->
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    const themeToggle = document.getElementById("themeToggle");

    // Check for user preference or system dark mode
    function applyTheme() {
        const userPref = localStorage.getItem("theme");
        if (userPref) {
            document.body.classList.toggle("dark-mode", userPref === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.classList.toggle("dark-mode", prefersDark);
        }
    }

    // Toggle dark mode and save preference
    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }

    themeToggle.addEventListener("click", toggleTheme);

    applyTheme();
});

