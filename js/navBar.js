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
                <span class="separator">|</span>
                <div class="nav-item" onclick="window.location.href='${basePath}index.html#projects'">Projects</div>
                <div class="nav-item" onclick="window.location.href='${basePath}index.html#articles'">Articles</div>
            </div>

            <div class="nav-right">
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
            </div>
        </div>
    </nav>
    `;

    const searchModal = `
    <div id="searchModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <input type="text" id="searchInput" placeholder="Search..." autofocus>
            <button id="searchButton"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button id="clearButton"><i class="fa-solid fa-trash-can"></i></button> <!-- Clear Button -->
            <div id="searchResults"></div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', searchModal);

    const searchIcon = document.getElementById("searchIcon");
    const modal = document.getElementById("searchModal");
    const closeModal = document.querySelector(".close");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");  // Clear Button
    const searchResults = document.getElementById("searchResults");

    searchIcon.addEventListener("click", function () {
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
                // Perform the search on the current page if already on index.html
                performSearch(query);
            } else {
                // If not on index.html, navigate to index.html with the search query
                window.location.href = `${basePath}index.html?search=${encodeURIComponent(query)}`;
            }
        }
    }

    searchButton.addEventListener("click", triggerSearch);
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            triggerSearch();
        }
    });

    // Function to perform the search and display results dynamically
    function performSearch(query) {
        console.log("Search triggered with query:", query); // Log the search query
        const elements = document.querySelectorAll("h1, h2, h3, h4, p, li"); // Elements to search in
        let matchFound = false;

        // Clear previous results and highlights
        document.querySelectorAll('.highlight').forEach(function(el) {
            el.classList.remove('highlight');
        });
        searchResults.innerHTML = ''; // Clear previous search results

        // Iterate over elements and find matches
        for (let el of elements) {
            if (el.textContent.toLowerCase().includes(query.toLowerCase())) {
                console.log("Match found:", el.textContent); // Log the matching element
                matchFound = true;

                // Create a clickable result for each match
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result');
                resultItem.textContent = el.textContent.trim();
                
                resultItem.addEventListener('click', function () {
                    // Close the modal when a result is clicked
                    modal.style.display = "none";

                    // Scroll to the element if it has an ID (anchor link)
                    if (el.id) {
                        document.getElementById(el.id).scrollIntoView({ behavior: "smooth", block: "center" });
                    } else if (el.closest("section") && el.closest("section").id) {
                        // If it's in a section with an ID, scroll to that section
                        document.getElementById(el.closest("section").id).scrollIntoView({ behavior: "smooth", block: "center" });
                    } else {
                        // Scroll to the specific element
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    el.classList.add('highlight'); // Add highlight class to the matched element
                });

                searchResults.appendChild(resultItem); // Add the result item to the search results
            }
        }

        if (!matchFound) {
            console.log("No matches found.");
            searchResults.innerHTML = 'No results found.';
        }
    }

    // Clear the input field and search results when the "Clear" button is clicked
    clearButton.addEventListener("click", function() {
        searchInput.value = ''; // Clear the input field
        searchResults.innerHTML = ''; // Clear the search results
        document.querySelectorAll('.highlight').forEach(function(el) {
            el.classList.remove('highlight'); // Remove highlights
        });
    });

    // Check for the search query in the URL when on index.html
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    if (searchQuery) {
        console.log("Search query from URL:", searchQuery);
        searchInput.value = searchQuery;
        modal.style.display = "flex"; // Open the modal
        performSearch(searchQuery);
    }
});
