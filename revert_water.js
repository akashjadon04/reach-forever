const fs = require('fs');

const standardThemeCss = `
    <!-- STANDARD 1S THEME CROSSFADE -->
    <style>
        body, .main-wrapper, section, header, .bento-card, .process-3d-card, div:not(.particle), h1, h2, h3, p, span, i {
            transition: background-color 1s ease, background 1s ease, color 1s ease, border-color 1s ease, box-shadow 1s ease !important;
        }
        .tilt-card { 
            transition: background-color 1s ease, border-color 1s ease, transform 0.4s ease, box-shadow 0.4s ease !important; 
        }
    </style>
`;

const standardThemeJs = `
    <script>
        function initThemeToggle() {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');

            function updateIcons(isLight) {
                const iconDesktop = document.getElementById('themeIconDesktop');
                const iconMobile = document.getElementById('themeIconMobile');
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
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('rf-theme', 'dark');
                    updateIcons(false);
                } else {
                    html.setAttribute('data-theme', 'light');
                    localStorage.setItem('rf-theme', 'light');
                    updateIcons(true);
                }
            }

            const current = document.documentElement.getAttribute('data-theme') === 'light';
            updateIcons(current);

            if(toggleDesktop) toggleDesktop.addEventListener('click', toggleTheme);
            if(toggleMobile) toggleMobile.addEventListener('click', toggleTheme);
        }
        document.addEventListener("DOMContentLoaded", initThemeToggle);
    </script>
`;

function processFile(filename) {
    let html = fs.readFileSync(filename, 'utf8');

    // 1. Remove WATER FILL CSS & JS
    html = html.replace(/<!-- ADVANCED BACKGROUND WATER THEME TRANSITION -->[\s\S]*?<\/script>/, '');

    // 2. Remove the old initThemeToggle function if there's an orphan one
    const initRegex = /function initThemeToggle\(\)\s*\{[\s\S]*?document\.addEventListener\("DOMContentLoaded", initThemeToggle\);\s*<\/script>/;
    html = html.replace(initRegex, '');

    // 3. Reactivate Particle Engine (specifically in services.html where I disabled it)
    html = html.replace(/function animateParticles\(\) \{ return; \/\/ DISABLED FOR 90FPS PERFORMANCE/g, 'function animateParticles() {');

    // 4. Inject the Standard 1S Theme Crossfade
    if(!html.includes('STANDARD 1S THEME CROSSFADE')) {
        html = html.replace(/<\/body>/, standardThemeCss + '\\n' + standardThemeJs + '\\n</body>');
    }

    fs.writeFileSync(filename, html);
    console.log('Reverted to 1s animation and reactivated particles on ' + filename);
}

processFile('public/index.html');
processFile('public/services.html');
processFile('public/reviews.html');
