// Navigation HTML template
const navHTML = `
    <nav class="nav-container">
        <div class="navbar">
        <div class="nav-content">
            <a href="#" class="logo"><img src="../mLogo.png"></a>
        </div>
        <div class="nav-links">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Articles</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Reviews</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Before the Throne Series</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Portfolio</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Contact</a>
                </li>
            </ul>
        
            <div class="hamburger" aria-label="Open menu" tabindex="0">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>
`;

// Footer HTML template
const footerHTML = `
    <footer class="footer-container">
        <div class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About Matt</h3>
                    <p>Book reviewer, critical thinker, pastor, husband, father, worship leader, and aspiring software engineer—Matt brings faith, family, and code together with every post.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#"><i class="fas fa-home"></i> Home</a></li>
                        <li><a href="#"><i class="fas fa-user"></i> About</a></li>
                        <li><a href="#"><i class="fas fa-file-alt"></i> Articles</a></li>
                        <li><a href="#"><i class="fas fa-star"></i> Reviews</a></li>
                        <li><a href="#"><i class="fas fa-briefcase"></i> Portfolio</a></li>
                        <li><a href="#"><i class="fas fa-envelope"></i> Contact</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Series</h3>
                    <ul class="footer-links">
                        <li><a href="#"><i class="fas fa-book"></i> Before the Throne</a></li>
                        <li><a href="#"><i class="fas fa-microphone"></i> MATTtalks</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Social Links</h3>
                    <ul class="footer-links">
                        <li><a href="#"><i class="fab fa-youtube"></i> YouTube</a></li>
                        <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
                        <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                        <li><a href="#"><i class="fab fa-threads"></i> Threads</a></li>
                        <li><a href="#"><i class="fab fa-goodreads"></i> GoodReads</a></li>
                        <li><a href="#"><i class="fab fa-github"></i> GitHub</a></li>
                        <li><a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
                        <li><a href="#"><i class="fas fa-newspaper"></i> Substack</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Services</h3>
                    <ul class="footer-links">
                        <li><a href="#"><i class="fas fa-code"></i> Web Development</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
`;

// Function to inject navigation
function injectNavigation() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.insertAdjacentHTML('beforebegin', navHTML);
        
        // Add mobile menu functionality
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
}

// Function to inject footer
function injectFooter() {
    const footerTarget = document.querySelector('#footer-target');
    if (footerTarget) {
        footerTarget.insertAdjacentHTML('beforebegin', footerHTML);
    } else {
        // Fallback: inject before body closing tag
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}

// Enhanced injection function that can target any element
function injectComponent(targetSelector, htmlContent, position = 'beforebegin') {
    const target = document.querySelector(targetSelector);
    if (target) {
        target.insertAdjacentHTML(position, htmlContent);
        return true;
    }
    return false;
}

// Alternative method: inject before specific elements by class or ID
function injectBeforeElement(elementSelector, htmlContent) {
    const elements = document.querySelectorAll(elementSelector);
    elements.forEach(element => {
        element.insertAdjacentHTML('beforebegin', htmlContent);
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    injectFooter();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Export functions for external use
window.NavigationSystem = {
    injectNavigation,
    injectFooter,
    injectComponent,
    injectBeforeElement,
    navHTML,
    footerHTML
};
