const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.social li a');

    // Toggle menu open/close when clicking the hamburger
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Morph the hamburger icon into an 'X'
        if(navMenu.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    // Automatically close the menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    
