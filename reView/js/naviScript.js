// Navigation HTML template
const navHTML = `
    <nav class="nav-container">
        <div class="navbar">
            <a href="#" class="logo">YourLogo</a>
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <div class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About Us</h3>
                    <p>We are a dynamic company focused on creating innovative solutions for modern web development. Our team is passionate about delivering high-quality experiences.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Articles</a></li>
                        <li><a href="#">Reviews</a></li>
                        <li><a href="#">Before the Throne Series</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Services</h3>
                    <ul class="footer-links">
                        <li><a href="#">Web Development</a></li>
                        <li><a href="#">Mobile Apps</a></li>
                        <li><a href="#">UI/UX Design</a></li>
                        <li><a href="#">Digital Marketing</a></li>
                        <li><a href="#">Consulting</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Follow Us</h3>
                    <div class="social-links">
                        <a href="#" class="social-link" title="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link" title="Threads"><i class="fa-brands fa-threads"></i></a>
                    </div>
                    <p style="margin-top: 1rem;">Stay connected with me on social media for updates and news.</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Matt Bramer. All rights reserved.</p>
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
