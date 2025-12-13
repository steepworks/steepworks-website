# Steep Works Website

A professional static website for Steep Works, a specialist civil
engineering company based in Christchurch, Canterbury, specializing in
spider digger technology for challenging terrain excavation.

## GitHub Pages Deployment

This website is configured to deploy automatically to GitHub Pages from
the `html` branch.

### Setup Instructions

1. **Enable GitHub Pages:**

   - Go to your repository Settings
   - Navigate to "Pages" section
   - Under "Build and deployment":
     - Source: GitHub Actions
   - The workflow will deploy automatically

2. **Custom Domain Configuration:**

   - The CNAME file is already configured with `steepworks.co.nz`
   - In your domain registrar (e.g., Namecheap, GoDaddy):
     - Add an A record pointing to GitHub Pages IPs:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
     - Add a CNAME record for www pointing to
       `<your-username>.github.io`
   - Wait for DNS propagation (can take up to 48 hours)

3. **Push to Deploy:**
   ```bash
   git add .
   git commit -m "Initial HTML conversion for GitHub Pages"
   git push origin html
   ```

The GitHub Actions workflow will automatically build and deploy your
site.

## Local Development

To view the site locally:

1. Open any HTML file in a web browser, or
2. Use a local web server:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

## Contact Form

The contact form uses a mailto: link to open the user's default email
client. For production, consider integrating a service like:

- **Formspree** (https://formspree.io) - Free tier available
- **Netlify Forms** - If hosting on Netlify
- **EmailJS** (https://www.emailjs.com) - Client-side email service

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5.3.0
- JavaScript (ES6+)
- Font Awesome 6.0.0 (icons)
- Lightbox2 2.11.3 (image gallery)
- jQuery 3.6.0 (for Lightbox2)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Directory Structure

```
steepworks-website/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── CNAME
├── LICENSE
├── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── projects.js
│       ├── main.js
│       └── components.js (optional dynamic loader)
├── static/
│   └── img/
│       └── [project images]
└── includes/
    ├── header.html (reusable header component)
    ├── footer.html (reusable footer component)
    ├── config.json (site configuration)
    ├── README.md (includes documentation)
    └── [legacy PHP files - not used in HTML version]
```

## Components & Includes

The `includes/` directory contains reusable HTML components:

- **header.html** - Navigation header (reference copy)
- **footer.html** - Site footer (reference copy)
- **config.json** - Site configuration in JSON format

**Note:** The current implementation has header/footer embedded
directly in each HTML page for optimal GitHub Pages compatibility.
The includes/ files serve as reference and can be used with dynamic
loading if serving from a web server.

For more information, see `includes/README.md`.

## License

See LICENSE file for details.

---

Built with ❤️ for Steep Works
