# Includes Directory

This directory contains reusable HTML components and configuration
files for the Steep Works website.

## Files

### HTML Components

- **header.html** - Navigation header component
- **footer.html** - Site footer component

### Configuration

- **config.json** - Site configuration in JSON format
  - Site name, email, address
  - Social media links
  - Services list

### Legacy PHP Files (Not Used in Static HTML Version)

- **config.php** - PHP configuration (legacy)
- **header.php** - PHP header include (legacy)
- **footer.php** - PHP footer include (legacy)

## Usage Options

### Option 1: Static HTML (Current Implementation)

The header and footer are directly embedded in each HTML page
(index.html, about.html, projects.html, contact.html). This is the
current approach and works best for static hosting on GitHub Pages.

**Advantages:**

- No JavaScript required
- Works without a web server
- Faster initial page load
- No CORS issues

### Option 2: Dynamic Loading (Optional)

You can use the `components.js` script to dynamically load header
and footer components.

**HTML Usage:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- head content -->
    <script src="assets/js/components.js"></script>
  </head>
  <body>
    <!-- Header will be loaded here -->
    <div data-include="includes/header.html"></div>

    <!-- Main content -->
    <main>
      <!-- Your content -->
    </main>

    <!-- Footer will be loaded here -->
    <div data-include="includes/footer.html"></div>
  </body>
</html>
```

**Requirements:**

- Must be served via HTTP/HTTPS (not file://)
- JavaScript must be enabled
- May have slight delay in loading components

**Advantages:**

- Single source of truth for header/footer
- Easy to update across all pages
- Maintains DRY principle

### Option 3: Build Process (Advanced)

Use a static site generator or build tool:

- **11ty (Eleventy)**
- **Hugo**
- **Jekyll**
- **Gulp/Webpack** with HTML plugins

## Updating Components

### To update header/footer across all pages:

**If using static HTML (current approach):**

1. Edit header/footer in all HTML files
2. Or use find/replace across all files

**If using dynamic loading:**

1. Edit `includes/header.html` or `includes/footer.html`
2. Changes automatically apply to all pages

**If using build process:**

1. Edit component templates
2. Rebuild the site

## Configuration Usage

### JavaScript

```javascript
fetch("includes/config.json")
  .then((response) => response.json())
  .then((config) => {
    console.log(config.siteName);
    console.log(config.siteEmail);
  });
```

### Dynamic Content

The config.json can be used to populate dynamic content in your
pages using JavaScript.

## Recommendations

For GitHub Pages static hosting (current setup):

- **Keep the current embedded approach** - Most reliable
- Use header.html and footer.html as reference/documentation
- Update config.json for any site-wide settings

For development with local server:

- Consider using dynamic loading for easier maintenance
- Serve with `python -m http.server` or similar

For large-scale projects:

- Implement a proper build process
- Use a static site generator
