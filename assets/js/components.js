/**
 * Component Loader for HTML Includes
 * This script can dynamically load header and footer components
 * Usage: Add data-include="includes/header.html" to any element
 */

document.addEventListener('DOMContentLoaded', function() {
    const includeElements = 
        document.querySelectorAll('[data-include]');
    
    includeElements.forEach(async (element) => {
        const file = element.getAttribute('data-include');
        
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                element.innerHTML = content;
                
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = 
                        document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });
            } else {
                console.error(
                    `Failed to load ${file}: ${response.status}`
                );
            }
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
        }
    });
});

function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

updateCurrentYear();
