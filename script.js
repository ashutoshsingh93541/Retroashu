document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader Removal
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000); 
        });
    }

    // 2. Mobile Menu Logic (Moved inside for safety)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
            
            // Prevent scrolling when menu is open on mobile
            body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link (Crucial for mobile UX)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
                body.classList.remove('no-scroll');
            });
        });
    }

    // 3. Custom Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const myBar = document.getElementById("myBar");
        if (myBar) myBar.style.width = scrolled + "%";
    });

    // 4. Reveal & Animations Setup
    const observerOptions = { threshold: 0.1 };

    // Card Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-card, .project-card, .glass-card').forEach(el => observer.observe(el));

    // 5. Stats Counter Animation
    const statsSection = document.getElementById('stats-section');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 50; 
                    
                    const updateCounter = () => {
                        const c = +counter.innerText;
                        if(c < target) {
                            counter.innerText = Math.ceil(c + increment);
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                statsAnimated = true;
            }
        });
    }, observerOptions);

    if(statsSection) statsObserver.observe(statsSection);

    // 6. Skill Bars Animation
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressLines = document.querySelectorAll('.progress-line span');
                progressLines.forEach(line => {
                    const width = line.parentElement.getAttribute('data-width');
                    line.style.width = width;
                });
            }
        });
    }, observerOptions);

    if(skillsSection) skillsObserver.observe(skillsSection);
});
