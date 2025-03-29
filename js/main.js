document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.setAttribute('aria-label', 'Toggle navigation');
    menuToggle.innerHTML = '☰';
    document.querySelector('header .container').appendChild(menuToggle);

    const nav = document.querySelector('nav');
    const body = document.body;
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
        menuToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        menuToggle.style.position = nav.classList.contains('active') ? 'fixed' : 'relative';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.innerHTML = '☰';
                menuToggle.style.position = 'relative';
            }
        });
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '☰';
            menuToggle.style.position = 'relative';
        }
    });


    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });

    // Rest of your existing JavaScript (slider, etc.)
    // ...
});
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Header scroll effect (optional)
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    
        // Rest of your existing menu toggle code...
    });


    // Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");

    function showNextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    // Auto-slide every 4 seconds
    if (slides.length > 0) {
        setInterval(showNextSlide, 4000);
    }


