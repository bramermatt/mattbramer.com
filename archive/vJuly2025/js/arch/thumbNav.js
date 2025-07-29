document.addEventListener("DOMContentLoaded", function() {
    // Determine the basePath based on the current path
    const currentPath = window.location.pathname;

    // Check for multiple directories where you need to adjust the base path
    const basePath = (currentPath.includes("/posts/") || 
                      currentPath.includes("/img/") || 
                      currentPath.includes("/pages/") || 
                      currentPath.includes("/articles/")) 
                     ? "../" : "";

    const navbarHTML = `
            <div class="thumbnav">
            <ul>
                <li>
                <a href="${basePath}index.html">
                <i class="fa-solid fa-house"></i>
                Home
                </a>
                </li>



                <li onclick="toTopFunction()" id="toTop" title="Go to top">
                    <a href="#">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    Top
                    </a>
                </li>


            </ul>
            </div>`

                // <li>
                //     <a href="${basePath}index.html#about">
                //     <i class="fa-solid fa-user"></i>
                //     About
                //     </a>
                // </li>
                // <li>
                //     <a href="${basePath}index.html#experience">
                //     <i class="fa-solid fa-clock-rotate-left"></i>
                //     Experience
                //     </a>
                // </li>
                // <li>
                //     <a href="${basePath}index.html#projects">
                //     <i class="fa-solid fa-code"></i>
                //     Projects
                //     </a>
                // </li>
                // <li>
                //     <a href="${basePath}index.html#writing">
                //     <i class="fa-solid fa-pen-to-square"></i>
                //     Writing
                //     </a>
                // </li>

                

                // Append navbar and footer safely
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
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
