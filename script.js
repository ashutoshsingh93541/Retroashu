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

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: null, y: null, radius: 150 }; // Interaction radius

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }

    draw() {
        ctx.fillStyle = 'rgba(123, 82, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Movement
        this.x += this.vx;
        this.y += this.vy;

        // Screen Wrap
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Mouse Interaction (Magnetism)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            const moveX = directionX * force * this.density * 0.2;
            const moveY = directionY * force * this.density * 0.2;
            
            this.x += moveX;
            this.y += moveY;
        }
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                let opacity = 1 - (distance / 150);
                ctx.strokeStyle = `rgba(59, 82, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

init();
animate();

