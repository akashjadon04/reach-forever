const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// 1. FIX THE LOGO GOLD FILTER
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace the bad logo filter with the mathematical pure gold one
cssContent = cssContent.replace(
    /filter: invert\(72%\).*?!important;/g, 
    'filter: brightness(0) saturate(100%) invert(73%) sepia(19%) saturate(1210%) hue-rotate(3deg) brightness(98%) contrast(85%) !important;'
);

fs.writeFileSync(cssPath, cssContent);
console.log('Fixed Gold Logo Filter in CSS');


// 2. INJECT THEME TOGGLE INTO SUB-PAGES
const subPages = ['services.html', 'reviews.html', 'form.html'];

const desktopToggleHTML = `
                <div class="magnetic-wrap nav-btn-wrap" style="display: flex; align-items: center;">
                    <a href="form.html" class="btn-olive magnetic-inner" data-cms="nav_btn" style="background: linear-gradient(135deg, #C8A96E, #A67C00); color: #FFF; padding: 12px 28px; border-radius: 100px; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; box-shadow: 0 10px 25px rgba(200, 169, 110, 0.35);">Initiate Project</a>
                </div>
                <div class="theme-toggle-btn" id="themeToggleDesktop" title="Toggle Theme" style="width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(200,169,110,0.3); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; flex-shrink: 0; margin-right: 10px;">
                    <i class="ri-sun-fill" id="themeIconDesktop" style="font-size: 1.2rem; color: #C8A96E;"></i>
                </div>
`;

const mobileToggleHTML = `
            <a href="form.html" class="m-nav-item"><i class="ri-calendar-event-fill"></i>Book</a>
            <div class="m-nav-item" id="themeToggleMobile" style="cursor: pointer;"><i class="ri-sun-fill" id="themeIconMobile" style="color: #D4AF37;"></i>Theme</div>
`;

const themeJS = `
    <!-- THEME TOGGLE LOGIC -->
    <script>
        function initThemeToggle() {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const iconDesktop = document.getElementById('themeIconDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');
            const iconMobile = document.getElementById('themeIconMobile');

            function updateIcons(isLight) {
                if (iconDesktop) iconDesktop.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                if (iconMobile) iconMobile.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
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
</body>`;

for (const file of subPages) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Inject Desktop Toggle if not exists
    if (!content.includes('themeToggleDesktop')) {
        content = content.replace(
            /<div class="magnetic-wrap nav-btn-wrap" style="display: flex; align-items: center;">.*?<\/div>/s, 
            desktopToggleHTML
        );
    }

    // Inject Mobile Toggle if not exists
    if (!content.includes('themeToggleMobile')) {
        content = content.replace(
            /<a href="form\.html" class="m-nav-item"><i class="ri-calendar-event-fill"><\/i>Book<\/a>/, 
            mobileToggleHTML
        );
    }

    // Inject JS if not exists
    if (!content.includes('initThemeToggle()')) {
        content = content.replace(/<\/body>/i, themeJS);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Injected Theme Toggle into ${file}`);
}

console.log('Final 1% Fixes Complete!');
