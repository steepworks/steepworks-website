document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectItems = document.querySelectorAll('.project-item');

    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter').toLowerCase();

            projectItems.forEach(item => {
                const categories = (item.getAttribute('data-category') || '')
                    .toLowerCase()
                    .split(',')
                    .map(t => t.trim())
                    .filter(Boolean);
                const matches = filterValue === 'all' || categories.includes(filterValue);
                item.style.display = matches ? '' : 'none';
            });

            // Immediately reveal any newly shown items without requiring scroll
            animateOnScroll();
        });
    });

    // Set initial styles for animation
    document.querySelectorAll('.project-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Apply initial filter state on load (respects any preset active button) and reveal immediately
    const initialFilter = document.querySelector('[data-filter].active') || filterButtons[0];
    if (initialFilter) initialFilter.click();
    animateOnScroll();

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
