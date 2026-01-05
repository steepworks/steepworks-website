document.addEventListener('DOMContentLoaded', function() {
    let navbarInitialized = false;

    function initNavbar() {
        if (navbarInitialized) return true;
        const navbar = document.querySelector('.navbar');
        if (!navbar) return false;

        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                navbar.classList.remove('scroll-down');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                // Scrolling down
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                // Scrolling up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });

        // Ensure active link highlighting (fallback if header loader already did it)
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = 
            window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        navbarInitialized = true;
        return true;
    }

    // Try immediately; if header not yet injected, wait for headerLoaded event
    if (!initNavbar()) {
        document.addEventListener('headerLoaded', initNavbar, { once: true });
    }

    const animatedItems = document.querySelectorAll('.card, .project-card');

    animatedItems.forEach(item => {
        item.classList.add('scroll-animate');
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    animatedItems.forEach(item => observer.observe(item));
});
