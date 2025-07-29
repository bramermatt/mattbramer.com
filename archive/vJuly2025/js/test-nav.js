document.addEventListener("DOMContentLoaded", function () {
    // Add Tailwind + Font Awesome CDN if not present
    const head = document.head;
    if (!document.querySelector("#tailwind-cdn")) {
        const tailwind = document.createElement("script");
        tailwind.src = "https://cdn.tailwindcss.com";
        tailwind.id = "tailwind-cdn";
        head.appendChild(tailwind);
    }
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

    const navbarHTML = `
    <nav class="hidden md:flex justify-between items-center w-full px-6 py-4 bg-white dark:bg-zinc-900 shadow-md border-b border-zinc-300 dark:border-zinc-700 z-50">
        <a href="${basePath}index.html" class="text-xl font-bold text-zinc-800 dark:text-white">Matthew Bramer</a>
        <ul class="flex space-x-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <li><a href="${basePath}index.html" class="hover:text-black dark:hover:text-white">Home</a></li>
            <li><a href="${basePath}pages/aboutMe.html" class="hover:text-black dark:hover:text-white">About</a></li>
            <li><a href="${basePath}pages/thoughts.html" class="hover:text-black dark:hover:text-white">Thoughts</a></li>
            <li><a href="${basePath}pages/projects.html" class="hover:text-black dark:hover:text-white">Projects</a></li>
            <li><a href="${basePath}pages/work.html" class="hover:text-black dark:hover:text-white">Work</a></li>
            <li><a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank" class="hover:text-black dark:hover:text-white">Video</a></li>
            <li><a href="mailto:m.bramer1096@gmail.com" class="hover:text-black dark:hover:text-white">Contact</a></li>
        </ul>
    </nav>`;

    const thumbNavHTML = `
    <nav class="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-md rounded-xl flex justify-around items-center py-3 px-2 text-sm md:hidden z-50">
        <a href="${basePath}index.html" class="tab-btn flex flex-col items-center text-zinc-900 dark:text-white font-semibold gap-1">
            <i class="fa-solid fa-house text-lg"></i>
            Home
        </a>
        <a href="${basePath}pages/aboutMe.html" class="tab-btn flex flex-col items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white gap-1">
            <i class="fa-solid fa-circle-user text-lg"></i>
            About
        </a>
        <a href="${basePath}pages/thoughts.html" class="tab-btn flex flex-col items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white gap-1">
            <i class="fa-solid fa-comment text-lg"></i>
            Thoughts
        </a>
        <a href="${basePath}pages/projects.html" class="tab-btn flex flex-col items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white gap-1">
            <i class="fa-solid fa-code text-lg"></i>
            Projects
        </a>
        <a href="${basePath}pages/work.html" class="tab-btn flex flex-col items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white gap-1">
            <i class="fa-solid fa-folder-open text-lg"></i>
            Work
        </a>
    </nav>`;

    const mobileMenuHTML = `
    <div class="md:hidden flex justify-between items-center px-4 py-3 bg-white dark:bg-zinc-900 shadow-md border-b border-zinc-300 dark:border-zinc-700">
        <a href="${basePath}index.html" class="text-lg font-bold text-zinc-800 dark:text-white">Matt Bramer</a>
        <button id="hamburger" class="text-xl text-zinc-700 dark:text-white">
            <i class="fa-solid fa-bars"></i>
        </button>
    </div>
    <div id="mobile-menu" class="hidden fixed inset-0 bg-white dark:bg-zinc-900 z-40 flex flex-col items-center justify-center gap-6 text-lg font-medium text-zinc-700 dark:text-white">
        <button id="close-menu" class="absolute top-5 right-5 text-2xl">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <a href="${basePath}index.html">Home</a>
        <a href="${basePath}pages/aboutMe.html">About</a>
        <a href="${basePath}pages/thoughts.html">Thoughts</a>
        <a href="${basePath}pages/projects.html">Projects</a>
        <a href="${basePath}pages/work.html">Work</a>
        <a href="https://www.youtube.com/channel/UC1OsGesye2hEKRl_dSqwhUw" target="_blank">Video</a>
        <a href="mailto:m.bramer1096@gmail.com">Contact</a>
    </div>`;

    document.body.insertAdjacentHTML("afterbegin", navbarHTML + mobileMenuHTML);
    document.body.insertAdjacentHTML("beforeend", thumbNavHTML);

    // Toggle mobile menu
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (hamburger && closeMenu && mobileMenu) {
        hamburger.addEventListener("click", () => mobileMenu.classList.remove("hidden"));
        closeMenu.addEventListener("click", () => mobileMenu.classList.add("hidden"));
        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                mobileMenu.classList.add("hidden");
            }
        });
    }
});
