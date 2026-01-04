// Load footer from includes/footer.html
document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  fetch('includes/footer.html')
    .then(response => response.text())
    .then(html => {
      footerContainer.innerHTML = html;
      // Execute any scripts in the loaded footer (like currentYear)
      const scripts = footerContainer.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });
    })
    .catch(error => console.error('Error loading footer:', error));
});
