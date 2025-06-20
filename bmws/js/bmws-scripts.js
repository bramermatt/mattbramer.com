        document.addEventListener('DOMContentLoaded', function() {
            const toggle = document.querySelector('.navbar-toggle');
            const links = document.querySelector('.navbar-links');
            const barIcon = toggle.querySelector('.fa-bars');
            const xIcon = toggle.querySelector('.fa-xmark');

            // Create overlay
            let overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0,0,0,0.7)';
            overlay.style.zIndex = 9;
            overlay.style.display = 'none';
            overlay.className = 'navbar-overlay';
            document.body.appendChild(overlay);

            toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            const open = links.classList.contains('open');
            barIcon.style.display = open ? 'none' : '';
            xIcon.style.display = open ? '' : 'none';
            overlay.style.display = open ? 'block' : 'none';
            });

            // Close menu when overlay is clicked
            overlay.addEventListener('click', () => {
            links.classList.remove('open');
            barIcon.style.display = '';
            xIcon.style.display = 'none';
            overlay.style.display = 'none';
            });
        });


                        document.addEventListener('DOMContentLoaded', function() {
                    var modal = document.getElementById('services-modal');
                    var link = document.getElementById('services-link');
                    var close = document.getElementById('close-modal');
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        modal.style.display = 'block';
                    });
                    close.addEventListener('click', function() {
                        modal.style.display = 'none';
                    });
                    window.addEventListener('click', function(e) {
                        if (e.target == modal) {
                            modal.style.display = 'none';
                        }
                    });
                });

                servicesSection.classList.toggle('hidden');
                var servicesSection = document.getElementById('services-section');
                if (servicesSection) {
                    servicesSection.addEventListener('click', function() {
                        servicesSection.classList.toggle('hidden');
                    });
                }       
                // Smooth scroll for anchor links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function(e) {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    });
                });


                    document.addEventListener('DOMContentLoaded', function() {
        const servicesLink = document.getElementById('services-link');
        const servicesSection = document.getElementById('services');
        servicesLink.addEventListener('click', function(e) {
            e.preventDefault();
            servicesSection.classList.toggle('hidden');
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        });
    });