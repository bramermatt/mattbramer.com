if (!document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    faLink.crossOrigin = 'anonymous';
    faLink.referrerPolicy = 'no-referrer';
    document.head.appendChild(faLink);
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const basePath = (currentPath.includes("/posts/") ||
        currentPath.includes("/img/") ||
        currentPath.includes("/pages/") ||
        currentPath.includes("/writing/") ||
        currentPath.includes("/articles/"))
        ? "../" : "";

// Navbar HTML
const navbarHTML = `
<nav class="navbar primary-nav">
  <a href="${basePath}/index.html"><img src="${basePath}/mLogo.png" alt="Matt Bramer Logo" class="nav-logo"></a>
  <ul class="navbar-links">
    <li><a href="${basePath}/index.html">Home</a></li>
    <!-- <li><a href="#">About</a></li> -->
    <li><a href="${basePath}pages/thoughts.html">Articles</a></li>
    <li><a href="${basePath}pages/projects.html">Portfolio</a></li>
    <li><a href="https://matthewbramer.substack.com/subscribe" target="_blank">Newsletter <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
    <li>
      <a href="#" class="openSupportModal" aria-label="Support Me">
        Support Me <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </li>

  </ul>

   <button class="menu-toggle" id="menuToggle" aria-label="Open menu">
    <i class="fa-solid fa-bars" id="menuIcon"></i>
  </button>
</nav>

<nav class="navbar second-nav">
  <ul class="navbar-links topics-nav">
    <li><a href="/before-the-throne.html">Before the Throne</a></li>
    <li><a href="/altared.html">Altared Reality</a></li>
    <li><a href="/reading-well.html">Reading Well</a></li>
    <li><a href="/purpose-built.html">Purpose Built</a></li>
    <li><a href="/blog.html">Blog</a></li>
    <li><a href="/videos.html" target="_blank">Videos <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
  </ul>
</nav>



<nav class="mobile-nav" id="mobileNav">
<div class="mobile-links-container">
 <button class="close-menu" id="closeMenu" aria-label="Close Menu">
    <i class="fa-solid fa-xmark" id="closeIcon"></i>
  </button>


  <ul class="mobile-links">
    <h2>Links</h2>
    <li><a href="${basePath}/index.html">Home</a></li>
    <li><a href="${basePath}pages/thoughts.html">Articles</a></li>
    <li><a href="${basePath}pages/projects.html">Portfolio</a></li>
    <li><a href="https://matthewbramer.substack.com/subscribe" target="_blank">Newsletter</a></li>
    <!-- <li><a href="/support.html">Support Me</a></li> -->
</ul>

    <!-- Content Series -->
<ul class="mobile-links">
<h2>Content Series</h2>
    <li><a href="/before-the-throne.html">Before the Throne</a></li>
    <li><a href="/altared.html">Altared Reality</a></li>
    <li><a href="/reading-well.html">Reading Well</a></li>
    <li><a href="/purpose-built.html">Purpose Built</a></li>
</ul>

    <!-- Media -->
<ul class="mobile-links">
    <h2>Media</h2>
    <li><a href="/blog.html">Blog</a></li>
    <li><a href="/blog.html">Book Reviews</a></li>
    <li><a href="https://matthewbramer.substack.com/subscribe" target="_blank">Substack <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
    <li><a href="/videos.html" target="_blank" rel="noopener">Videos <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
    </ul>

    <!-- Support -->
<ul class="mobile-links">
    <h2>Support</h2>
    <li><a href="https://ko-fi.com/bramermatt" target="_blank" rel="noopener">Ko-fi</a></li>
    <li><a href="https://www.patreon.com/MatthewBramer" target="_blank" rel="noopener"><i class="fa-brands fa-patreon"></i> Patreon</a></li>
    </ul>

    <!-- Services -->
<ul class="mobile-links">
<h2>Services</h2>
    <li><a href="#">Web Development</a></li>
</ul>

    <!-- Social -->
<ul class="mobile-links">
<h2>Follow</h2>
    <li><a href="https://www.youtube.com/@mattbramer" target="_blank" rel="noopener">YouTube</a></li>
    <li><a href="https://twitter.com/bramermatt" target="_blank" rel="noopener">X (Twitter)</a></li>
    <li><a href="https://www.instagram.com/bramermatt" target="_blank" rel="noopener">Instagram</a></li>
    <li><a href="https://www.facebook.com/bramermatt/" target="_blank" rel="noopener">Facebook</a></li>
    <!-- <li><a href="https://www.linkedin.com/in/mattbramer" target="_blank" rel="noopener">LinkedIn</a></li> -->
  </ul>

  </div>

  <!-- About Section -->
  <div class="mobile-about" style="margin-top: 2rem;">
    <h2 style="color: white; font-size: 1rem; text-transform: uppercase;">About Me</h2>
    <p style="color: #ccc; font-size: 0.9rem; line-height: 1.5;">
      Hi, I’m Matt Bramer — a Christian content creator, software developer, and lifelong learner. My journey into software engineering started with curiosity and a desire to build tools that serve others. While I’m passionate about writing and sharing ideas, I’m also committed to developing websites and apps for churches and individuals, helping them reach their goals through technology. Whether it’s through code or words, I love creating resources that make a difference.
    </p>

    <h2 style="color: white; font-size: 1rem; margin-top: 1.5rem; text-transform: uppercase;">Services I Provide</h2>
    <p style="color: #ccc; font-size: 0.9rem; line-height: 1.5;">
      I offer website and app development for churches, ministries, and individuals, focusing on solutions that are both practical and meaningful. If you need a custom site, a new feature, or just want to bring your vision to life online, I’d love to help. Let’s build something together that serves your community and furthers your mission.
    </p>

    <div style="margin-top: 1rem;">
      <img src="${basePath}/img/matts/matt-profile.jpg" alt="Matt Bramer" style="max-width: 80px; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,.3);" />
      <blockquote style="color: #aaa; font-size: 0.85rem; margin-top: 0.5rem;">Matt Bramer</blockquote>
    </div>
  </div>

</nav>
`;


// Footer HTML
const footerHTML = `
    <footer class="footer">

    <div class="footer-top">

        <ul class="footer-links">
        <h2>Links</h2>
            <li><a href="${basePath}/index.html">Home</a></li>
            <li><a href="${basePath}pages/aboutMe.html">About</a></li>
            <li><a href="${basePath}pages/thoughts.html">Articles</a></li>
            <li><a href="${basePath}pages/projects.html">Portfolio</a></li>
        </ul>

        <ul class="footer-links">
        <h2>Content</h2>
            <li><a href="/before-the-throne.html">Before the Throne</a></li>
            <li><a href="/altared.html">Altared Reality</a></li>
            <li><a href="/reading-well.html">Reading Well</a></li>
            <li><a href="/purpose-built.html">Purpose Built</a></li>
        </ul>

        <ul class="footer-links">
        <h2>Media</h2>
            <li><a href="/blog.html">Blog</a></li>
            <li><a href="/blog.html">Book Reviews</a></li>
            <li><a href="https://matthewbramer.substack.com/subscribe" target="_blank">Substack <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <li><a href="/videos.html" target="_blank">Videos <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
        </ul>

        <ul class="footer-links">
        <h2>Support</h2>
            <li><a href="https://ko-fi.com/mattbramer" target="_blank" rel="noopener">Ko-fi <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <li><a href="https://www.patreon.com/MatthewBramer" target="_blank" rel="noopener"><i class="fa-brands fa-patreon"></i> Patreon <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <li><a href="https://matthewbramer.substack.com/subscribe" target="_blank">Newsletter <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
        </ul>

        <ul class="footer-links">
        <h2>Services</h2>
            <li><a href="#">Web Development <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
        </ul>

        <ul class="footer-links">
        <h2>Follow</h2>
            <li><a href="https://www.youtube.com/@mattbramer" target="_blank" rel="noopener">youtube <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <li><a href="https://twitter.com/bramermatt" target="_blank" rel="noopener">X (Twitter) <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <li><a href="https://www.instagram.com/bramermatt" target="_blank" rel="noopener">Instagram <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <li><a href="https://www.facebook.com/bramermatt/" target="_blank" rel="noopener">Facebook <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
            <!-- <li><a href="https://www.linkedin.com/in/mattbramer" target="_blank" rel="noopener">LinkedIn <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li> -->
        </ul>

        </div>

        <div class="footer-bottom">

        <article class="footer-content">
          <h2>About Me</h2>
          <p>Hi, I’m Matt Bramer — a Christian content creator, software developer, and lifelong learner. My journey into software engineering started with curiosity and a desire to build tools that serve others. While I’m passionate about writing and sharing ideas, I’m also committed to developing websites and apps for churches and individuals, helping them reach their goals through technology. Whether it’s through code or words, I love creating resources that make a difference.</p>
        </article>

        <article class="footer-content">
          <h2>Services I Provide</h2>
          <p>I offer website and app development for churches, ministries, and individuals, focusing on solutions that are both practical and meaningful. If you need a custom site, a new feature, or just want to bring your vision to life online, I’d love to help. Let’s build something together that serves your community and furthers your mission.</p>
        </article>

        <article class="footer-content">
          <img src="${basePath}/img/matts/matt-profile.jpg" alt="Matt Bramer" class="footer-profile-img">
          <blockquote>Matt Bramer</blockquote>
        </article>
        </div>

    </footer>
`;

const thumbNavHTML = `
<!-- Bottom Navigation -->
<nav class="bottom-nav">
  <a href="${basePath}/index.html" class="nav-item">
    <i class="fas fa-home nav-icon"></i>
    <span class="nav-label">Home</span>
  </a>
  <a href="${basePath}pages/thoughts.html" class="nav-item">
    <i class="fas fa-book-open nav-icon"></i>
    <span class="nav-label">Read</span>
  </a>
  <a href="${basePath}pages/projects.html" class="nav-item">
    <i class="fa-solid fa-code"></i>
    <span class="nav-label">Portfolio</span>
  </a>
  <a href="https://www.youtube.com/@mattbramer" target="_blank" class="nav-item">
    <i class="fas fa-play-circle nav-icon"></i>
    <span class="nav-label">Watch</span>
  </a>
<a href="#" class="openSupportModal nav-item" aria-label="Support">
  <i class="fas fa-handshake nav-icon"></i>
  <span class="nav-label">Support</span>
</a>



</nav>


`

const supportModalHTML = `
<div id="supportModal" class="modal-overlay" aria-hidden="true">
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button id="closeSupportModal" class="modal-close" aria-label="Close">&times;</button>
    <h2 id="modalTitle">Support My Work</h2>
    <p>You can partner with me by supporting through any of these platforms:</p>
    <ul class="support-links">
      <li><a href="https://ko-fi.com/bramermatt" target="_blank" rel="noopener"><i class="fas fa-mug-hot"></i>Ko-fi</a></li>
      <li><a href="https://www.patreon.com/MatthewBramer" target="_blank" rel="noopener"><i class="fab fa-patreon"></i>Patreon</a></li>
      <li><a href="https://matthewbramer.substack.com/subscribe" target="_blank" rel="noopener"><i class="fas fa-envelope-open-text"></i>Substack</a></li>
    </ul>
  </div>
</div>
`


document.body.insertAdjacentHTML('afterbegin', navbarHTML);
document.body.insertAdjacentHTML('beforeend', thumbNavHTML);
document.body.insertAdjacentHTML('beforeend', supportModalHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);


    const toggleBtn = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const icon = document.getElementById('menuIcon');

    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });

    // Optional: close when clicking a link
    document.querySelectorAll('.mobile-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      });
    });

const closeMenuBtn = document.getElementById('closeMenu');

closeMenuBtn.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  icon.classList.add('fa-bars');
  icon.classList.remove('fa-xmark');
});



  let lastScrollY = window.scrollY;
  const primaryNav = document.querySelector('.primary-nav');
  let navHidden = false;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // Scrolling down
      if (!navHidden) {
        primaryNav.style.transform = 'translateY(-100%)';
        navHidden = true;
      }
    } else {
      // Scrolling up
      if (navHidden) {
        primaryNav.style.transform = 'translateY(0)';
        navHidden = false;
      }
    }

    lastScrollY = currentScrollY;
  });




const supportModal = document.getElementById('supportModal');
const closeSupportModal = document.getElementById('closeSupportModal');
const modalTriggers = document.querySelectorAll('.openSupportModal');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    supportModal.style.display = 'flex';
    supportModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  });
});

function closeSupportModalFunction() {
  supportModal.style.display = 'none';
  supportModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

closeSupportModal.addEventListener('click', closeSupportModalFunction);

supportModal.addEventListener('click', (e) => {
  if (e.target === supportModal) {
    closeSupportModalFunction();
  }
});





});



 function filterSelection(category, event) {
    const items = document.getElementsByClassName("filterDiv");

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("show");

      if (category === "all" || items[i].classList.contains(category)) {
        items[i].classList.add("show");
      }
    }

    // Show/hide year blocks based on visible articles
    const yearBlocks = document.getElementsByClassName("year-block");
    for (let i = 0; i < yearBlocks.length; i++) {
      const block = yearBlocks[i];
      const visibleArticles = block.querySelectorAll(".filterDiv.show");
      block.style.display = visibleArticles.length === 0 ? "none" : "block";
    }

    // Update active button
    const btns = document.getElementsByClassName("filter-btn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
    }
    if (event) event.currentTarget.classList.add("active");

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Run 'all' filter on page load
  document.addEventListener("DOMContentLoaded", () => {
    filterSelection("all");
  });


