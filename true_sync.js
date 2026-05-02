const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// ---------------------------------------------------------
// 1. UPDATE CSS TO HIDE MOBILE NAV ON PC
// ---------------------------------------------------------
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');

    const hideMobileNavCSS = `
/* HIDE MOBILE NAVIGATOR ON DESKTOP */
@media (min-width: 1025px) {
    .mobile-nav { display: none !important; }
}
`;
    if (!cssContent.includes('HIDE MOBILE NAVIGATOR ON DESKTOP')) {
        cssContent += hideMobileNavCSS;
    }
    
    fs.writeFileSync(cssPath, cssContent);
    console.log('Fixed CSS: Hidden mobile nav on PC.');
}


// ---------------------------------------------------------
// 2. INJECT TRUE THEME JS & REMOVE BAD LOGO CSS
// ---------------------------------------------------------
const subPages = ['services.html', 'reviews.html', 'form.html'];

const trueThemeJS = `
    <!-- TRUE THEME LOGIC INJECTION -->
    <script>
        function initThemeToggle() {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const iconDesktop = document.getElementById('themeIconDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');
            const iconMobile = document.getElementById('themeIconMobile');

            function updateIcons(isLight) {
                if (iconDesktop) iconDesktop.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                if (iconMobile) {
                    const iTag = iconMobile.querySelector('i');
                    if(iTag) iTag.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                }
            }

            function toggleTheme() {
                const html = document.documentElement;
                const isCurrentlyLight = html.getAttribute('data-theme') === 'light';
                
                if (isCurrentlyLight) {
                    html.removeAttribute('data-theme');
                    localStorage.setItem('rf-theme', 'dark');
                    updateIcons(false);
                } else {
                    html.setAttribute('data-theme', 'light');
                    localStorage.setItem('rf-theme', 'light');
                    updateIcons(true);
                }
                
                // Trigger an event so particle engine can catch it if needed
                window.dispatchEvent(new Event('themeChanged'));
            }

            if (toggleDesktop) toggleDesktop.addEventListener('click', toggleTheme);
            if (toggleMobile) toggleMobile.addEventListener('click', toggleTheme);

            const savedTheme = localStorage.getItem('rf-theme');
            if (savedTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            updateIcons(savedTheme === 'light');
        }
        document.addEventListener("DOMContentLoaded", initThemeToggle);
    </script>
`;

for (const file of subPages) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the hardcoded brightness(0.1) rule causing black logo
    content = content.replace(/\.nav-brand\s*img\s*\{\s*filter:\s*brightness\(0\.1\);\s*\}/gi, '');
    
    // Also remove any other hardcoded inline bg rules just to be safe
    content = content.replace(/background:\s*rgba\(253,\s*253,\s*251,\s*0\.85\);/gi, '');

    // Inject the TRUE theme JS if not already there
    if (!content.includes('TRUE THEME LOGIC INJECTION')) {
        content = content.replace(/<\/body>/i, trueThemeJS + '\n</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Synchronized ${file}: Removed bad logo CSS & Injected true theme JS.`);
}

console.log('TRUE SYNC COMPLETE');
