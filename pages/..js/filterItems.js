// Universal filtering function
function filterItems(containerSelector, filterType, filterValue) {
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll('.book-item');
    let visibleItemsCount = 0;

    items.forEach(item => {
        const itemValue = item.getAttribute(`data-${filterType}`);

        if (filterValue === 'all' || itemValue === filterValue) {
            item.style.display = 'block'; // Show the item
            visibleItemsCount++;
        } else {
            item.style.display = 'none';  // Hide the item
        }
    });

    // Check if there are any visible items
    const noResultsMessage = document.getElementById('no-results-message');
    if (visibleItemsCount === 0) {
        noResultsMessage.style.display = 'block'; // Show "no results" message
    } else {
        noResultsMessage.style.display = 'none'; // Hide "no results" message
    }
}

// Add event listeners for filter links
document.querySelectorAll('aside a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const filterType = this.getAttribute('data-filter');  // e.g., 'year', 'category', 'in-review'
        const filterValue = this.getAttribute('data-value');  // e.g., '2024', 'stephen-king', 'all'

        // Assuming we're filtering the `.bookshelf`
        filterItems('.bookshelf', filterType, filterValue);
    });
});

// Show all items by default on page load
window.addEventListener('DOMContentLoaded', (event) => {
    filterItems('.bookshelf', 'year', 'all');
});

// aside navigation
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-nav');
    const filterLinks = document.getElementById('aside-filter-links');
    const filterLinkElements = document.querySelectorAll('.filter-links-content ul li a'); // Get all filter links
    const selectedFilterDisplay = document.getElementById('selected-filter'); // Get the selected filter display
    const bookItems = document.querySelectorAll('.book-item'); // Get all book items

    // Default open state based on screen width
    if (window.innerWidth <= 900) {
        filterLinks.classList.remove('open'); // Collapsed on mobile
    } else {
        filterLinks.classList.add('open'); // Open on larger screens
    }

    // Function to update filter counts
    function updateFilterCounts() {
        // Reset all counts to zero
        filterLinkElements.forEach(link => {
            const countElement = link.querySelector('.filter-count');
            if (countElement) {
                countElement.textContent = '(0)'; // Set initial count
            }
        });

        // Count matching book items for each filter
        bookItems.forEach(item => {
            const year = item.getAttribute('data-year');
            const category = item.getAttribute('data-category');
            const genre = item.getAttribute('data-genre');
            const inReview = item.getAttribute('data-in-review'); // In-review attribute

            // Increment "All" filter count
            const allLink = document.querySelector('a[data-filter="year"][data-value="all"]');
            if (allLink) {
                const allCountElement = allLink.querySelector('.filter-count');
                const currentAllCount = parseInt(allCountElement.textContent.match(/\d+/)[0]); // Get the current count
                allCountElement.textContent = `(${currentAllCount + 1})`; // Increment count
            }

            // Update year counts
            const yearLink = document.querySelector(`a[data-filter="year"][data-value="${year}"]`);
            if (yearLink) {
                const countElement = yearLink.querySelector('.filter-count');
                const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]); // Get the current count
                countElement.textContent = `(${currentCount + 1})`; // Increment count
            }

            // Update in review counts (for example, 'stephen-king')
            const inReviewLink = document.querySelector(`a[data-filter="in-review"][data-value="${inReview}"]`);
            if (inReviewLink) {
                const countElement = inReviewLink.querySelector('.filter-count');
                const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]); // Get the current count
                countElement.textContent = `(${currentCount + 1})`; // Increment count
            }

            // Update category counts
            const categoryLink = document.querySelector(`a[data-filter="category"][data-value="${category}"]`);
            if (categoryLink) {
                const countElement = categoryLink.querySelector('.filter-count');
                const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]); // Get the current count
                countElement.textContent = `(${currentCount + 1})`; // Increment count
            }

            // Update genre counts
            const genreLink = document.querySelector(`a[data-filter="genre"][data-value="${genre}"]`);
            if (genreLink) {
                const countElement = genreLink.querySelector('.filter-count');
                const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]); // Get the current count
                countElement.textContent = `(${currentCount + 1})`; // Increment count
            }
        });
    }

    // Initial count update
    updateFilterCounts();

    // Toggle the filter links when the button is clicked
    toggleButton.addEventListener('click', function() {
        filterLinks.classList.toggle('open');
        toggleButton.querySelector('i').classList.toggle('rotate'); // Rotate the icon
    });

    // Adjust the display if the screen is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 900) {
            filterLinks.classList.remove('open'); // Collapse on mobile
            toggleButton.querySelector('i').classList.remove('rotate'); // Reset rotation
        } else {
            filterLinks.classList.add('open'); // Open on larger screens
            toggleButton.querySelector('i').classList.add('rotate'); // Ensure rotation is applied
        }
    });

    // Add click event to filter links
    filterLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            filterLinkElements.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            this.classList.add('active');

            // Extract the filter text and count from the clicked link
            const filterText = this.textContent.split('(')[0].trim(); // Filter name
            const filterCount = this.querySelector('.filter-count').textContent; // Extract the count in parentheses

            // Update the selected filter text
            selectedFilterDisplay.textContent = `${filterText} ${filterCount}`;

            // Close the filter links only on mobile
            if (window.innerWidth <= 900) {
                filterLinks.classList.remove('open'); // Close the dropdown
                toggleButton.querySelector('i').classList.remove('rotate'); // Reset rotation
            }
        });
    });
});
