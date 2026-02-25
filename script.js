document.addEventListener('DOMContentLoaded', () => {
    // --- 1 & 2. Mobile Navbar Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.social li a');

    // Toggle menu open/close when clicking the hamburger
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Morph the hamburger icon into an 'X'
            if(navMenu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    // Automatically close the menu when a link is clicked
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // --- 3. Mobile Reels Auto-Carousel (Conflict Fix) ---
    const sliderContainer = document.querySelector('.reels-slider-container');
    const reelCards = document.querySelectorAll('.reel-card');

    if (sliderContainer && reelCards.length > 0) {
        let autoScrollTimer;
        // Track the current screen state
        let isMobile = window.innerWidth <= 850; 

        const startAutoScroll = () => {
            clearInterval(autoScrollTimer); // Prevent multiple timers from stacking
            
            autoScrollTimer = setInterval(() => {
                if (window.innerWidth > 850) return; // Failsafe
                
                const cardWidth = reelCards[0].offsetWidth;
                const scrollAmount = (cardWidth * 2) + 15; 

                if (sliderContainer.scrollLeft + sliderContainer.clientWidth >= sliderContainer.scrollWidth - 10) {
                    sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    sliderContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000); 
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollTimer);
        };

        // Start loop ONLY if page originally loads on mobile
        if (isMobile) {
            startAutoScroll();
        }

        // Pause on manual swipe
        sliderContainer.addEventListener('touchstart', stopAutoScroll, { passive: true });
        
        // Resume auto-scrolling 4 seconds after swiping
        sliderContainer.addEventListener('touchend', () => {
            if (window.innerWidth <= 850) {
                setTimeout(startAutoScroll, 4000);
            }
        }, { passive: true });

        // THE MAGIC FIX: Listen for window resize to swap between CSS and JS cleanly
        window.addEventListener('resize', () => {
            const currentlyMobile = window.innerWidth <= 850;
            
            // If we just resized from Desktop down to Mobile
            if (currentlyMobile && !isMobile) {
                isMobile = true;
                startAutoScroll(); // Turn on JS animation
            } 
            // If we just resized from Mobile up to Desktop
            else if (!currentlyMobile && isMobile) {
                isMobile = false;
                stopAutoScroll(); // Kill the JS timer
                sliderContainer.scrollLeft = 0; // Reset scroll so CSS transform works perfectly
            }
        });
    }
});
