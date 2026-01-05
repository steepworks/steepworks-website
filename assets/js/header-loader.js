// Load header from includes/header.html
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    fetch('includes/header.html')
      .then((response) => response.text())
      .then((html) => {
        headerContainer.innerHTML = html;

        // Highlight the active nav link based on current page
        const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        headerContainer.querySelectorAll('.nav-link').forEach((link) => {
          const href = (link.getAttribute('href') || '').toLowerCase();
          if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Notify listeners that the header/nav is ready
        document.dispatchEvent(new Event('headerLoaded'));
      })
      .catch((error) => console.error('Error loading header:', error));
  });
})();
