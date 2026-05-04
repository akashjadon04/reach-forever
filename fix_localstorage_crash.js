const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

// 1. FIX THE LOCALSTORAGE CRASH (FOR FILE:/// USERS)
const newHeadScript = `
    <!-- CRITICAL THEME SYNC SCRIPT (Must run before CSS loads) -->
    <script>
        (function() {
            let savedTheme = 'dark';
            try { savedTheme = localStorage.getItem('rf-theme') || 'dark'; } catch(e) {}
            document.documentElement.setAttribute('data-theme', savedTheme);
        })();
    </script>
`;

const newUniversalScript = `
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
                    const iTag = iconMobile.tagName && iconMobile.tagName.toLowerCase() === 'i' ? iconMobile : iconMobile.querySelector('i');
                    if(iTag) iTag.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                }
            }

            function toggleTheme() {
                const html = document.documentElement;
                const isCurrentlyLight = html.getAttribute('data-theme') === 'light';
                const nextTheme = isCurrentlyLight ? 'dark' : 'light';
                
                html.setAttribute('data-theme', nextTheme);
                try { localStorage.setItem('rf-theme', nextTheme); } catch(e) {}
                updateIcons(!isCurrentlyLight);
            }

            // Sync initial state safely
            let savedTheme = 'dark';
            try { savedTheme = localStorage.getItem('rf-theme') || 'dark'; } catch(e) {}
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateIcons(savedTheme === 'light');

            if(toggleDesktop) {
                toggleDesktop.replaceWith(toggleDesktop.cloneNode(true));
                document.getElementById('themeToggleDesktop').addEventListener('click', toggleTheme);
            }
            if(toggleMobile) {
                toggleMobile.replaceWith(toggleMobile.cloneNode(true));
                document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
            }
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initThemeToggle);
        } else {
            initThemeToggle();
        }
    </script>
`;

htmlFiles.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // Replace Head Script
    html = html.replace(/<!-- CRITICAL THEME SYNC SCRIPT[\s\S]*?<\/script>/, newHeadScript.trim());
    
    // Replace Universal Script
    html = html.replace(/<!-- UNIVERSAL THEME TOGGLE SCRIPT -->[\s\S]*?<\/script>/, newUniversalScript.trim());

    fs.writeFileSync(filepath, html);
    console.log('Patched localStorage safety in ' + file);
});

// 2. CHANGE "DARK PURPLE" TO "TRUE BLACK"
const cssFile = path.join(publicDir, 'css', 'dark-overhaul.css');
let css = fs.readFileSync(cssFile, 'utf8');

css = css.replace(/--rf-bg:\s*#05020A;/g, '--rf-bg: #000000;');
css = css.replace(/--rf-surface:\s*#0C0B14;/g, '--rf-surface: #0A0A0A;');
css = css.replace(/background-color:\s*#05020A\s*!important;/g, 'background-color: #000000 !important;');
css = css.replace(/background:\s*#05020A\s*!important;/g, 'background: #000000 !important;');
css = css.replace(/--bg-main:\s*#0A0A0F\s*!important;/g, '--bg-main: #000000 !important;');
css = css.replace(/--bg-surface:\s*#14141F\s*!important;/g, '--bg-surface: #0A0A0A !important;');

fs.writeFileSync(cssFile, css);
console.log('Upgraded theme to True Pitch Black');
