document.addEventListener("DOMContentLoaded", function () {
    // Determine the basePath based on the current path
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes("/posts/") ? "../" : "";
  
    const navbarHTML = `
<nav class="navbar">
    <div class="logo">
        <img src="img/icons/mLogo.png" alt="">
    </div>
        <ul class="nav-links">
          <li><a href="${basePath}index.html">Home</a></li>
          <li><a href="${basePath}index.html#about">About</a></li>
          <li><a href="${basePath}index.html#experience">Experience</a></li>
          <li><a href="${basePath}index.html#projects">Projects</a></li>
          <!-- <li><a href="#">Writing</a></li>  -->

          <!--<li><a href="#"><i class="fa-solid fa-magnifying-glass" id="search-icon"></i></a></li>-->
        </ul>
    <i class="fa-solid fa-bars" id="menu-toggle"></i>


</nav>
    `;

    const footerHTML = `
<footer>
        <div class="social">
            <a href="https://github.com/bramermatt" target="_blank"><i class="fa-brands fa-github"></i></a>
            <a href="https://www.threads.net/@bramermatt" target="_blank"><i class="fa-brands fa-square-threads"></i></a>
            <a href="https://www.instagram.com/bramermatt/" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
            <a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://www.goodreads.com/user/show/145996417-matthew-bramer" target="_blank"><i class="fa-brands fa-goodreads"></i></a>
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
    document.body.insertAdjacentHTML('beforeend', thumbNav);
  
    // Now select the menuToggle and navLinks elements after they've been inserted into the DOM
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
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
  });
  

//Get the button:
mybutton = document.getElementById("toTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
} else {
    mybutton.style.display = "none";
}
}

// When the user clicks on the button, scroll to the top of the document
function toTopFunction() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}