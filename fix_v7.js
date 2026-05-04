const fs = require('fs');

// 1. SERVICES.HTML
let srv = fs.readFileSync('public/services.html', 'utf8');

// A. Fix Ansh Khatri Photo CMS tag
srv = srv.replace(/<img src="https:\/\/images\.pexels\.com\/photos\/8372620\/pexels-photo-8372620\.jpeg\?auto=compress&cs=tinysrgb&w=1200&q=100" alt="Ansh Khatri CEO" style="width: 100%; height: 100%; object-fit: cover; filter: contrast\(1\.1\) brightness\(0\.9\);">/, 
                  '<img src="https://images.pexels.com/photos/8372620/pexels-photo-8372620.jpeg?auto=compress&cs=tinysrgb&w=1200&q=100" alt="Ansh Khatri CEO" data-cms="mkt_ansh_img" style="width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.9);">');

// B. Remove the cheap "wipe out" circular theme transition
srv = srv.replace(/<!-- SHOCKING 90FPS CIRCULAR THEME TRANSITION -->[\s\S]*?<\/script>/, '');

// C. Add global smooth color transition and a cartoonish bouncy button animation
const smoothThemeCss = `
    <!-- SMOOTH & BOUNCY THEME TRANSITION -->
    <style>
        /* Smoothly transition colors across the entire DOM without wiping anything out */
        body, .main-wrapper, section, div, h1, h2, h3, p, span, a, i, .bento-card, .process-3d-card, .founder-section, .navbar {
            transition-property: background-color, background, color, border-color, box-shadow;
            transition-duration: 0.6s;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Disable transition on elements that need instant transforms for 3D physics */
        .tilt-card, .tilt-card * {
            transition-property: background-color, color, border-color, transform, box-shadow;
        }

        /* Cartoonish bouncy animation for the sun/moon icon */
        @keyframes themeIconBounce {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.5) rotate(180deg); }
            100% { transform: scale(1) rotate(360deg); }
        }
        .theme-icon-animating {
            animation: themeIconBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');
            
            function animateIcon(e) {
                let icon = null;
                if(this.id === 'themeToggleDesktop') icon = document.getElementById('themeIconDesktop');
                if(this.id === 'themeToggleMobile') icon = document.getElementById('themeIconMobile');
                
                if(icon) {
                    icon.classList.remove('theme-icon-animating');
                    void icon.offsetWidth; // trigger reflow
                    icon.classList.add('theme-icon-animating');
                }
            }
            
            if(toggleDesktop) toggleDesktop.addEventListener('click', animateIcon);
            if(toggleMobile) toggleMobile.addEventListener('click', animateIcon);
        });
    </script>
`;
if(!srv.includes('SMOOTH & BOUNCY THEME TRANSITION')) {
    srv = srv.replace(/<\/body>/, smoothThemeCss + '\n</body>');
}
fs.writeFileSync('public/services.html', srv);


// 2. INDEX.HTML
let idx = fs.readFileSync('public/index.html', 'utf8');

// Remove the cheap "wipe out" circular theme transition
idx = idx.replace(/<!-- SHOCKING 90FPS CIRCULAR THEME TRANSITION -->[\s\S]*?<\/script>/, '');

if(!idx.includes('SMOOTH & BOUNCY THEME TRANSITION')) {
    idx = idx.replace(/<\/body>/, smoothThemeCss + '\n</body>');
}
fs.writeFileSync('public/index.html', idx);

console.log('Ansh Khatri CMS tag fixed. Cheap wave transition removed. Smooth color blending and bouncy cartoon icon animation added.');
