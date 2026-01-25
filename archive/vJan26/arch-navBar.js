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
            <div class="nav-left">
                <div class="nav-item" onclick="window.location.href='${basePath}index.html'">Home</div>
                <div class="nav-item" onclick="window.location.href='${basePath}index.html#projects'">Projects</div>
                <div class="nav-item" onclick="window.location.href='${basePath}index.html#articles'">Articles</div>
            </div>

            <!-- <div class="nav-right">
                <span class="separator">|</span>
                <div class="nav-item">
                    <div class="search-icon" id="searchIcon">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <span class="separator">|</span>
                <div class="nav-item social-links">
                    <a href="https://www.goodreads.com/user/show/145996417-matthew-bramer" target="_blank" class="social-icon" title="GoodReads">
                        <i class="fab fa-goodreads"></i>
                    </a>
                </div>
                <div class="nav-item">
                    <a href="https://www.youtube.com/@MattBramer" target="_blank" class="social-icon" title="YouTube">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div> -->
        </div>
    </nav>`;

    const searchModal = `
    <div id="searchModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <input type="text" id="searchInput" placeholder="Search..." autofocus>
            <button id="searchButton"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button id="clearButton"><i class="fa-solid fa-trash-can"></i></button>
            <div id="searchResults"></div>
        </div>
    </div>`;

    const thumbNavHTML = `
    <div id="thumbNav" style="display: none;">
        <button id="homeBtn" onclick="window.location.href='${basePath}index.html'"><i class="fa-solid fa-house"></i></button>
        <button id="searchBtn"><i class="fas fa-search"></i></button>
        <button id="scrollToTopBtn"><i class="fa-regular fa-circle-up"></i></button>
    </div>`;

    // Insert the elements separately
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', searchModal);
    document.body.insertAdjacentHTML('beforeend', thumbNavHTML);

    // Select elements
    const searchIcon = document.getElementById("searchIcon");
    const modal = document.getElementById("searchModal");
    const closeModal = document.querySelector(".close");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const searchResults = document.getElementById("searchResults");
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

    // Scroll to top button logic
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Search Modal Logic
    searchIcon.addEventListener("click", function () {
        modal.style.display = "flex";
        searchInput.focus();
    });

    searchBtn.addEventListener("click", function () {
        modal.style.display = "flex";
        searchInput.focus();
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function triggerSearch() {
        const query = searchInput.value.trim();
        if (query) {
            if (window.location.pathname === "index.html" || window.location.pathname === "/") {
                performSearch(query);
            } else {
                window.location.href = `${basePath}index.html?search=${encodeURIComponent(query)}`;
            }
        }
    }

    searchBtn.addEventListener("click", triggerSearch);
    searchButton.addEventListener("click", triggerSearch);
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            triggerSearch();
        }
    });

    function performSearch(query) {
        console.log("Search triggered with query:", query);
        const elements = document.querySelectorAll("h1, h2, h3, h4, p, li");
        let matchFound = false;

        document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
        searchResults.innerHTML = '';

        for (let el of elements) {
            if (el.textContent.toLowerCase().includes(query.toLowerCase())) {
                console.log("Match found:", el.textContent);
                matchFound = true;

                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result');
                resultItem.textContent = el.textContent.trim();

                resultItem.addEventListener('click', function () {
                    modal.style.display = "none";

                    if (el.id) {
                        document.getElementById(el.id).scrollIntoView({ behavior: "smooth", block: "center" });
                    } else if (el.closest("section") && el.closest("section").id) {
                        document.getElementById(el.closest("section").id).scrollIntoView({ behavior: "smooth", block: "center" });
                    } else {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    el.classList.add('highlight');
                });

                searchResults.appendChild(resultItem);
            }
        }

        if (!matchFound) {
            console.log("No matches found.");
            searchResults.innerHTML = 'No results found.';
        }
    }

    clearButton.addEventListener("click", function () {
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    });

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    if (searchQuery) {
        console.log("Search query from URL:", searchQuery);
        searchInput.value = searchQuery;
        modal.style.display = "flex";
        performSearch(searchQuery);
    }
});
