document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader Removal
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5s delay to see animation
    });

    // 2. Custom Scroll Progress Bar
    window.onscroll = function() { updateScrollProgress() };

    function updateScrollProgress() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }

    // 3. Reveal Animation on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-card').forEach(el => observer.observe(el));

    // 4. Stats Counter Animation
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

    // 5. Skill Bars Animation
    const skillsSection = document.getElementById('skills');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressLines = document.querySelectorAll('.progress-line span');
                progressLines.forEach(line => {
                    // Get width from parent data attribute or CSS variable logic
                    const width = line.parentElement.getAttribute('data-width');
                    line.style.width = width;
                });
            }
        });
    }, observerOptions);

    if(skillsSection) skillsObserver.observe(skillsSection);

});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon from bars to X
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});
