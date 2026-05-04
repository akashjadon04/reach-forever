const fs = require('fs');

let srv = fs.readFileSync('public/services.html', 'utf8');

// 1. FIX THE "WHITE BOX" ON PARAGRAPHS
// Removing background, padding, and border-radius from .bc-desc
srv = srv.replace(/\.bc-desc\s*\{\s*font-size:\s*1\.05rem;\s*color:\s*var\(--rf-text\);\s*line-height:\s*1\.5;\s*font-weight:\s*500;\s*background:\s*rgba\(255,255,255,0\.8\);\s*padding:\s*10px;\s*border-radius:\s*10px;\s*\}/g, 
                  '.bc-desc { font-size: 1.05rem; color: var(--rf-text); line-height: 1.5; font-weight: 500; }');

// Also remove it if it exists in dark-overhaul.css
let overhaul = fs.readFileSync('public/css/dark-overhaul.css', 'utf8');
overhaul = overhaul.replace(/\.bc-desc\s*\{[^}]*background:[^}]*\}/g, '');
fs.writeFileSync('public/css/dark-overhaul.css', overhaul);


// 2. HIDE BACKGROUND IMAGES FETCHED BY CMS
// The CMS is dynamically injecting images because of the data-cms tags. We hide them via CSS so the solid golden/dark cards look clean.
const hideImgCss = `
        /* Hide CMS Images for solid luxury aesthetic */
        .bento-card .bc-bg-img { display: none !important; }
        .bento-card { display: flex; flex-direction: column; justify-content: flex-start !important; }
`;
if(!srv.includes('Hide CMS Images for solid luxury aesthetic')) {
    srv = srv.replace(/<\/style>/, hideImgCss + '\n    </style>');
}


// 3. FIX OVERSIZED TILES
// The user complained some are oversized. We change the grid layout to be fully uniform 2x2.
srv = srv.replace(/span-2x2-alt/g, '');
srv = srv.replace(/span-2x2/g, '');


// 4. CARTOONISH CIRCULAR THEME TRANSITION ANIMATION (90FPS)
// We inject a global theme transition script into the <head> or right before </body>.
const themeTransitionScript = `
    <!-- SHOCKING 90FPS CIRCULAR THEME TRANSITION -->
    <style>
        .theme-transition-circle {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999999;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1);
            will-change: transform;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');
            
            function triggerThemeWave(e) {
                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                const nextColor = isLight ? '#050507' : '#FFFFFF'; // Color of the theme we are switching TO
                
                // Get click coordinates, or center of screen if triggered programmatically
                let x = window.innerWidth / 2;
                let y = window.innerHeight / 2;
                
                if (e && e.clientX && e.clientY) {
                    x = e.clientX;
                    y = e.clientY;
                } else if (e && e.target) {
                    const rect = e.target.getBoundingClientRect();
                    x = rect.left + rect.width / 2;
                    y = rect.top + rect.height / 2;
                }

                // Create the expanding circle
                const circle = document.createElement('div');
                circle.classList.add('theme-transition-circle');
                circle.style.left = x + 'px';
                circle.style.top = y + 'px';
                circle.style.backgroundColor = nextColor;
                
                // Calculate max dimension needed to cover screen
                const maxSize = Math.max(window.innerWidth, window.innerHeight) * 3;
                circle.style.width = '100px';
                circle.style.height = '100px';
                
                document.body.appendChild(circle);
                
                // Trigger animation
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        circle.style.transform = \`translate(-50%, -50%) scale(\${maxSize / 100})\`;
                    });
                });
                
                // Remove circle after animation
                setTimeout(() => {
                    circle.style.opacity = '0';
                    circle.style.transition = 'opacity 0.4s ease';
                    setTimeout(() => circle.remove(), 400);
                }, 800);
            }

            if(toggleDesktop) {
                toggleDesktop.addEventListener('click', triggerThemeWave, true);
            }
            if(toggleMobile) {
                toggleMobile.addEventListener('click', triggerThemeWave, true);
            }
        });
    </script>
`;

if(!srv.includes('SHOCKING 90FPS CIRCULAR THEME TRANSITION')) {
    srv = srv.replace(/<\/body>/, themeTransitionScript + '\n</body>');
}


// Ensure the index.html also gets this transition so the whole site feels premium
let idx = fs.readFileSync('public/index.html', 'utf8');
if(!idx.includes('SHOCKING 90FPS CIRCULAR THEME TRANSITION')) {
    idx = idx.replace(/<\/body>/, themeTransitionScript + '\n</body>');
    fs.writeFileSync('public/index.html', idx);
}

fs.writeFileSync('public/services.html', srv);
console.log('Final fixes applied: White boxes on paragraphs destroyed. Grid sizing normalized. Cartoonish theme wave injected.');
