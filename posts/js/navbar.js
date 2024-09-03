document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("page-title").innerText;
    
    const navbarHTML = `
        <div class="nav">
            <div class="nav-title">${title}</div>
        </div>
    `;
    
    document.getElementById("navbar").innerHTML = navbarHTML;
});
