document.addEventListener("DOMContentLoaded", function () {
    const head = document.head;
    // if (!document.querySelector("#tailwind-cdn")) {
    //     const tailwind = document.createElement("script");
    //     tailwind.src = "https://cdn.tailwindcss.com";
    //     tailwind.id = "tailwind-cdn";
    //     head.appendChild(tailwind);
    // }
    if (!document.querySelector("#fontawesome-cdn")) {
        const fa = document.createElement("link");
        fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
        fa.rel = "stylesheet";
        fa.id = "fontawesome-cdn";
        head.appendChild(fa);
    }

    const currentPath = window.location.pathname;
    const basePath = (currentPath.includes("/posts/") ||
        currentPath.includes("/img/") ||
        currentPath.includes("/pages/") ||
        currentPath.includes("/writing/") ||
        currentPath.includes("/articles/"))
        ? "../" : "";

    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const navItems = [
        {
            href: `${basePath}index.html`,
            icon: "fa-solid fa-house",
            label: "Home",
            match: /^\/?(index\.html)?$/
        },
        {
            href: `${basePath}pages/aboutMe.html`,
            icon: "fa-solid fa-circle-user",
            label: "About",
            match: /aboutMe\.html$/
        },
        {
            href: `${basePath}pages/thoughts.html`,
            icon: "fa-solid fa-comment",
            label: "Thoughts",
            match: /thoughts\.html$/
        },
        {
            href: `${basePath}pages/projects.html`,
            icon: "fa-solid fa-code",
            label: "Projects",
            match: /projects\.html$/
        },
        {
            href: `${basePath}pages/work.html`,
            icon: "fa-solid fa-folder-open",
            label: "Work",
            match: /work\.html$/
        }
    ];

    const current = window.location.pathname.split('/').pop() || "index.html";

    const bgColor = isDark ? "#18181b" : "#fff";
    const borderColor = isDark ? "#333" : "#ccc";
    const shadowColor = isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.1)";
    const activeColor = isDark ? "#fff" : "#222";
    const inactiveColor = isDark ? "#bbb" : "#666";

    const style = document.createElement('style');
    style.textContent = `
        @keyframes greenPulse {
            0% {
                box-shadow: 0 0 0 0 #22c55e;
                text-shadow: 0 0 0 0 #16a34a;
            }
            70% {
                box-shadow: 0 0 12px 8px #22c55e;
            }
            100% {
                box-shadow: 0 0 0 0 #22c55e;
            }
        }
        #thumbNav a.active {
            color: #22c55e !important; /* Tailwind green-500 */
            text-decoration: underline;
            font-weight: 600;
        }
        #thumbNav a.active i {
            animation: greenPulse 1.2s infinite;
            border-radius: 8px;
        }
    `;
    document.head.appendChild(style);

        const thumbNavHTML = `
        <nav id="thumbNav" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);width:90%;background:${bgColor};border:1px solid ${borderColor};box-shadow:0 2px 8px ${shadowColor};border-radius:16px;display:flex;justify-content:space-around;align-items:center;padding:12px 8px;font-size:14px;z-index:50;max-width:500px;">
            ${navItems.map(item => {
                const isActive = item.match.test(current);
                return `
                <a href="${item.href}" class="tab-btn flex flex-col items-center justify-center gap-1 ${isActive ? 'active' : ''}" style="color:${isActive ? activeColor : inactiveColor};text-decoration:none;justify-content: center; display: flex; flex-direction: column;flex-wrap: wrap; align-items: center; gap: 4px;">
                    <i class="${item.icon}" style="font-size:18px;${isActive ? 'animation: yellowPulse 1.2s infinite;' : ''}"></i>
                    ${item.label}
                </a>`;
            }).join('')}
        </nav>`;

    const imgModalHTML = `
        <div id="myModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="img01">
        <div id="caption"></div>
    </div>`;

    

    // Insert the elements separately
    // document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('afterbegin', thumbNavHTML + imgModalHTML); // Fixed insertion of imgModalHTML

        // Image Modal Logic
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    // Get all images on the page, excluding the profile image
    const images = document.querySelectorAll('img:not(.profile-img)');
    images.forEach(function (image) {
        image.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.textContent = this.alt || ''; // Display alt text as caption

            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden'; // Disable scrolling
        });
    });

    // Close modal when user clicks on the close button (X)
    const close = document.getElementsByClassName("close")[0];
    close.addEventListener('click', function () {
        modal.style.display = "none";
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === "block" && (e.key === "Escape" || e.key === "Esc")) {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    });


if (currentPath.includes("/posts/")) {
    const imageDiv = document.getElementById("image");

    // If there's no #toc already inside #image, create it
    if (imageDiv && !document.getElementById("toc")) {
        const tocDetails = document.createElement("details");
        tocDetails.id = "toc";
        tocDetails.style.marginTop = "2em";

        const summary = document.createElement("summary");
        summary.innerHTML = "<strong>Table of Contents</strong>";

        const ul = document.createElement("ul");
        ul.id = "toc-list";

        tocDetails.appendChild(summary);
        tocDetails.appendChild(ul);

        imageDiv.appendChild(tocDetails);
    }

    const tocList = document.getElementById("toc-list");
    if (tocList) {
        const headings = [...document.querySelectorAll("h2, h3")];

        // Always insert "Introduction" as the first item
        const introId = "post";
        let introAnchor = document.getElementById(introId);
        if (!introAnchor) {
            introAnchor = document.createElement("div");
            introAnchor.id = introId;
            document.body.insertBefore(introAnchor, document.body.firstChild);
        }

        const introLi = document.createElement("li");
        introLi.innerHTML = `<a href="#${introId}" class="toc-link">Introduction</a>`;
        tocList.appendChild(introLi);

        // Generate TOC from h2/h3
        headings.forEach((heading, idx) => {
            if (!heading.id) {
                heading.id = heading.textContent
                    .toLowerCase()
                    .replace(/[^\w]+/g, "-")
                    .replace(/^-+|-+$/g, "") + "-" + idx;
            }

            const li = document.createElement("li");
            li.style.marginLeft = heading.tagName === "H3" ? "1em" : "0";
            li.innerHTML = `<a href="#${heading.id}" class="toc-link">${heading.textContent}</a>`;
            tocList.appendChild(li);
        });

        // Style and scroll spy
        const tocStyle = document.createElement("style");
        tocStyle.textContent = `
            #toc ul li.active > a {
                background: #ffe082;
                border-radius: 4px;
                font-weight: bold;
                color: #222;
            }
            #toc ul li a:hover {
                text-decoration: none;
            }
        `;
        document.head.appendChild(tocStyle);

        const tocLinks = document.querySelectorAll(".toc-link");
        const sections = [
            { id: introId, el: introAnchor },
            ...headings.map(h => ({ id: h.id, el: h }))
        ];

        function onScroll() {
            let activeIdx = 0;
            for (let i = 0; i < sections.length; i++) {
                const s = sections[i];
                if (s.el) {
                    const rect = s.el.getBoundingClientRect();
                    if (rect.top <= 80) activeIdx = i;
                }
            }
            tocLinks.forEach((link, idx) => {
                link.parentElement.classList.toggle("active", idx === activeIdx);
            });
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }
}





});
