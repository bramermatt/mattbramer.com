document.addEventListener("DOMContentLoaded", function () {
  // Determine the basePath based on the current path
  const currentPath = window.location.pathname;
  const basePath = (currentPath.includes("/posts/") || 
                    currentPath.includes("/img/") || 
                    currentPath.includes("/pages/") || 
                    currentPath.includes("/articles/")) 
                   ? "../" : "";

  const navbarHTML = `
  <nav id="navbar">
      <div class="navbar">
          <div class="logo">
              <a href="${basePath}index.html"><img src="${basePath}img/icons/mLogo.png" alt="Logo"></a>
          </div>
          <ul class="nav-links">
              <li><a href="${basePath}index.html#projects">Projects</a></li>
              <li><a href="${basePath}index.html#experience">Experience</a></li>
              <li><a href="${basePath}index.html#writting-log">Articles</a></li>
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
                      <li><a href="https://github.com/bramermatt" target="_blank"><i class="fa-brands fa-github"></i> Github</a></li>
                      <li><a href="https://x.com/bramermatt" target="_blank"><i class="fa-brands fa-x-twitter"></i> Twitter</a></li>
                      <li><a href="https://www.threads.net/@bramermatt" target="_blank"><i class="fa-brands fa-square-threads"></i> Threads</a></li>
                      <li><a href="https://www.instagram.com/bramermatt/" target="_blank"><i class="fa-brands fa-square-instagram"></i> Instagram</a></li>
                      <li><a href="https://www.goodreads.com/user/show/145996417-matthew-bramer" target="_blank"><i class="fa-brands fa-goodreads"></i> GoodReads</a></li>
                      <li><a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank"><i class="fa-brands fa-youtube"></i> YouTube</a></li>
                      <li><a href="https://linktr.ee/Ministryinthemess" target="_blank"><i class="fa-solid fa-podcast"></i> Podcast</a></li>
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

  // Insert the navbar, progress bar, footer, and scroll-to-top button
  document.body.insertAdjacentHTML('afterbegin', navbarHTML + progressBarHTML + articleThumbHTML);
  document.body.insertAdjacentHTML('beforeend', scrollButtonHTML);

  // Scroll-to-top functionality
  const toTopButton = document.getElementById('toTopButton');
  let lastScrollY = window.scrollY;

  window.onscroll = function () {
      // Show/hide scroll-to-top button
      toTopButton.style.display = window.scrollY > 40 ? "block" : "none";

      // Update the progress bar as you scroll
      updateProgressBar();

      // Navbar hide on scroll down, show on scroll up
      const navbar = document.getElementById('navbar');
      const currentScrollY = window.scrollY;
      navbar.classList.toggle('hidden', currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
  };

  window.toTopFunction = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update the progress bar based on the scroll position
  function updateProgressBar() {
      const progressBar = document.getElementById('progress-bar');
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      // Update the width of the progress bar based on scroll percentage
      progressBar.style.width = `${scrollPercentage}%`;

      // Update color dynamically based on progress
      progressBar.style.background = scrollPercentage < 33 ? "green" : scrollPercentage < 66 ? "dark yellow" : "green";
  }

  // Initialize progress bar on page load (this will ensure it updates immediately on load)
  updateProgressBar();  // Call to set the initial value
});


// Add the thumbnail template to the body
const articleThumbHTML = `
  <div class="articleTitleThumb">

    <img src="" alt="Article Image" id="thumbImage">

    <div class="titleThumb">
      <h1 id="titleThumb"></h1>
      <p id="dateThumb"></p>
      <br>

      <a href="../index.html"><i class="fa-solid fa-arrow-left"></i> Go Back</a>

    </div>

      <!-- <div id="moreLikeThis">
      <a href="#">More Like This</a>
      </div> -->


  </div>
`;


document.body.insertAdjacentHTML('beforeend', articleThumbHTML);
const articleThumb = document.querySelector('.articleTitleThumb');

// Get elements in the article
const titleElement = document.querySelector('#article-title');
const dateElement = document.querySelector('#date');
const imageElement = document.querySelector('#art img');

// Populate thumbnail with data from the article
const titleThumb = document.querySelector('#titleThumb');
const dateThumb = document.querySelector('#dateThumb');
const thumbImage = document.querySelector('#thumbImage');

if (titleElement) titleThumb.textContent = titleElement.textContent.trim();
if (dateElement) dateThumb.textContent = dateElement.textContent.trim();
if (imageElement) thumbImage.src = imageElement.src;

// Use IntersectionObserver to track visibility of the title
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // Show thumbnail when title is out of view
            articleThumb.style.display = 'flex';
        } else {
            // Hide thumbnail when title is in view
            articleThumb.style.display = 'none';
        }
    });
}, {
    root: null, // Use the viewport as the container
    threshold: 0.2 // Trigger when 10% of the title is visible
});

// Observe the title element
if (titleElement) observer.observe(titleElement);
