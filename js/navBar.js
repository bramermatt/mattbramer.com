document.addEventListener("DOMContentLoaded", function () {
    // Determine the basePath based on the current path
    const currentPath = window.location.pathname;

    // Check for multiple directories where you need to adjust the base path
    const basePath = (currentPath.includes("/posts/") || 
                      currentPath.includes("/img/") || 
                      currentPath.includes("/pages/") || 
                      currentPath.includes("/articles/")) 
                     ? "../" : "";

    // Retrieve the article title from the <title> tag
    const articleTitleText = document.title || "Default Title";
  
    const navbarHTML = `
<nav id="nav-bar">
<div class="navbar" >

            <i class="fa-solid fa-bars" id="menu-toggle"></i>

    <div class="logo">
        <a href="${basePath}index.html"><img src="${basePath}img/icons/mLogo.png" alt=""></a>
        /
        <div id="article-in-title">${articleTitleText}</div>
    </div>

   
        <ul class="nav-links">
          <li><a href="${basePath}index.html">Home</a></li>
          <!-- <li><a href="${basePath}index.html#about">About</a></li> -->

          <li><a href="${basePath}index.html#projects">Projects</a></li>
          <li><a href="${basePath}index.html#experience">Experience</a></li>

          <li><a href="${basePath}index.html#writting-log">Articles</a></li>

          <!-- <li><a href="${basePath}pages/writings.html">Writing</a></li> -->
          
          <!-- <li><a href="${basePath}pages/blogs.html">Blogs</a></li>

          <li><a href="${basePath}pages/book-reviews.html">Book Reviews</a></li>
          <li><a href="${basePath}pages/movie-reviews.html">Movie Reviews</a></li>

           -->

          <!-- <li><a href="#"><i class="fa-solid fa-magnifying-glass" id="search-icon"></i></a></li> -->
        </ul>



        


        <!-- <i class="fa-solid fa-magnifying-glass" id="search-icon"></i> -->
</div>

<!-- <div class="navbar">
        <ul>
        <li><a href="">testing</a></li>
        </ul>
</div> -->


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

    `

     const thumbNav =  `
    <ul class="thumbNav">
        <li onclick="toTopFunction()" id="toTop" title="Go to top">
        <a href="#">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
            <!-- Top -->
        </a>
        </li>
    </ul>
    `
  
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    // document.body.insertAdjacentHTML('beforeend', thumbNav);
  
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = navLinks.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
  
        // Toggle between bars and X icon
        if (menuToggle.classList.contains("fa-bars")) {
            menuToggle.classList.remove("fa-bars");
            menuToggle.classList.add("fa-xmark");
        } else {
            menuToggle.classList.remove("fa-xmark");
            menuToggle.classList.add("fa-bars");
        }
    });

    // Close the navbar when a link is clicked
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("fa-xmark");
            menuToggle.classList.add("fa-bars");
        });
    });
});
  

// Toggle functionality for mobile menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = navLinks.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("fa-xmark", menuToggle.classList.contains("fa-bars"));
  menuToggle.classList.toggle("fa-bars", !menuToggle.classList.contains("fa-xmark"));
});

links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("fa-xmark");
    menuToggle.classList.add("fa-bars");
  });
});

// Scroll-to-top button
const toTopButton = document.createElement('div');
toTopButton.innerHTML = `<a href="#" onclick="toTopFunction()"><i class="fa fa-arrow-up"></i></a>`;
toTopButton.classList.add("thumbNav");
document.body.appendChild(toTopButton);

window.onscroll = function () {
  toTopButton.style.display = (window.scrollY > 40) ? "block" : "none";
};

// Smooth scroll-to-top function
window.toTopFunction = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  // Navbar hide on scroll down, show on scroll up
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      navbar.classList.add('hidden'); // Hide navbar when scrolling down
    } else {
      navbar.classList.remove('hidden'); // Show navbar when scrolling up
    }
    lastScrollY = window.scrollY;
  });

