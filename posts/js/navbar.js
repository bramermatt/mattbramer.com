document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("page-title").innerText;
    
    const navbarHTML = `
        <div class="nav">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#writing">Writing</a>
            <div class="nav-title">${title}</div>
        </div>
    `;
    
    document.getElementById("navbar").innerHTML = navbarHTML;
});
