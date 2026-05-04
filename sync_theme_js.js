const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const standardThemeJs = `
    <!-- UNIVERSAL THEME TOGGLE SCRIPT -->
    <script>
        function initThemeToggle() {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');

            function updateIcons(isLight) {
                const iconDesktop = document.getElementById('themeIconDesktop');
                const iconMobile = document.getElementById('themeIconMobile');
                if (iconDesktop) iconDesktop.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                if (iconMobile) {
                    const iTag = iconMobile.tagName.toLowerCase() === 'i' ? iconMobile : iconMobile.querySelector('i');
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

            // Sync initial state
            const savedTheme = localStorage.getItem('rf-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateIcons(savedTheme === 'light');

            if(toggleDesktop) {
                // Remove old listeners just in case
                toggleDesktop.replaceWith(toggleDesktop.cloneNode(true));
                document.getElementById('themeToggleDesktop').addEventListener('click', toggleTheme);
            }
            if(toggleMobile) {
                toggleMobile.replaceWith(toggleMobile.cloneNode(true));
                document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
            }
        }
        
        // Use both DOMContentLoaded and immediate execution fallback
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initThemeToggle);
        } else {
            initThemeToggle();
        }
    </script>
`;

files.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // 1. Remove ANY existing initThemeToggle function blocks
    const initRegex = /function initThemeToggle\(\)\s*\{[\s\S]*?document\.addEventListener\("DOMContentLoaded", initThemeToggle\);\s*<\/script>/g;
    html = html.replace(initRegex, '');

    // 2. Remove the one we injected previously
    html = html.replace(/<script>[\s\S]*?function initThemeToggle\(\) \{[\s\S]*?<\/script>/g, '');
    html = html.replace(/<!-- UNIVERSAL THEME TOGGLE SCRIPT -->[\s\S]*?<\/script>/g, '');

    // 3. Inject the Universal script right before </body>
    if (!html.includes('UNIVERSAL THEME TOGGLE SCRIPT')) {
        html = html.replace(/<\/body>/, standardThemeJs + '\\n</body>');
    }

    fs.writeFileSync(filepath, html);
    console.log('Synchronized JS for ' + file);
});
