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


    
// Video control functions
function toggleVideo(element) {
    const container = element.closest('.player-container');
    const video = container.querySelector('.html-video');
    const playBtn = container.querySelector('.play-button');
    const ppBtn = container.querySelector('.play-pause i');
    
    if (video.paused) {
        video.play();
        playBtn.style.display = 'none';
        if (ppBtn) ppBtn.classList.replace('fa-play', 'fa-pause');
    } else {
        video.pause();
        playBtn.style.display = 'flex';
        if (ppBtn) ppBtn.classList.replace('fa-pause', 'fa-play');
    }
}

function toggleMute(btn) {
    const video = btn.closest('.player-container').querySelector('.html-video');
    const icon = btn.querySelector('i');
    video.muted = !video.muted;
    icon.classList.toggle('fa-volume-up', !video.muted);
    icon.classList.toggle('fa-volume-mute', video.muted);
}

function toggleFullscreen(container) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        container.requestFullscreen();
    }
}

// Initialize video players
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.html-video').forEach(video => {
        const container = video.closest('.player-container');
        const seekBar = container.querySelector('.seek-bar');
        const timeDisplay = container.querySelector('.time-display');
        const ppBtn = container.querySelector('.play-pause i');
        
        // Update seek bar and time display
        video.addEventListener('timeupdate', function() {
            const percent = (video.currentTime / video.duration) * 100;
            seekBar.value = percent;
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        });
        
        // Seek functionality
        seekBar.addEventListener('input', function() {
            const time = video.duration * (seekBar.value / 100);
            video.currentTime = time;
        });
        
        // Play/pause button
        video.addEventListener('play', function() {
            if (ppBtn) ppBtn.classList.replace('fa-play', 'fa-pause');
            container.querySelector('.play-button').style.display = 'none';
        });
        
        video.addEventListener('pause', function() {
            if (ppBtn) ppBtn.classList.replace('fa-pause', 'fa-play');
        });
        
        // Set video duration when metadata loads
        video.addEventListener('loadedmetadata', function() {
            timeDisplay.textContent = `00:00 / ${formatTime(video.duration)}`;
        });
    });
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

