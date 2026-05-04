const fs = require('fs');

const waterCss = `
    <!-- WATER FILL TANK THEME TRANSITION -->
    <style>
        .water-tank-transition {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 0vh;
            z-index: 9999999;
            pointer-events: none;
            overflow: hidden;
            animation: waterFillAnim 2.5s ease-in-out forwards;
            will-change: height;
        }

        .water-tank-transition::after {
            content: '';
            position: absolute;
            top: 0;
            left: -50vw;
            width: 200vw;
            height: 30px;
            background: inherit;
            filter: brightness(1.1);
            border-radius: 40%;
            animation: waterWaveAnim 1.5s infinite linear;
        }

        @keyframes waterWaveAnim {
            0% { transform: translateX(0); }
            50% { transform: translateX(-25vw); }
            100% { transform: translateX(-50vw); }
        }

        @keyframes waterFillAnim {
            0% { height: 0vh; }
            20% { height: 33vh; }
            40% { height: 33vh; }  /* Stop 1 */
            60% { height: 66vh; }
            80% { height: 66vh; }  /* Stop 2 */
            100% { height: 105vh; } /* Full cover */
        }
    </style>
`;

const waterJs = `
    <script>
        function initThemeToggle() {
            const toggleDesktop = document.getElementById('themeToggleDesktop');
            const toggleMobile = document.getElementById('themeToggleMobile');
            let isAnimating = false;

            function updateIcons(isLight) {
                const iconDesktop = document.getElementById('themeIconDesktop');
                const iconMobile = document.getElementById('themeIconMobile');
                if (iconDesktop) iconDesktop.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                if (iconMobile) {
                    const iTag = iconMobile.querySelector('i');
                    if(iTag) iTag.className = isLight ? 'ri-moon-fill' : 'ri-sun-fill';
                }
            }

            function toggleThemeWithWater(e) {
                if(e) e.preventDefault();
                if (isAnimating) return;
                isAnimating = true;

                const html = document.documentElement;
                const isCurrentlyLight = html.getAttribute('data-theme') === 'light';
                const nextTheme = isCurrentlyLight ? 'dark' : 'light';
                const waterColor = isCurrentlyLight ? '#050507' : '#FFFFFF'; 

                // Create the water tank element
                const tank = document.createElement('div');
                tank.className = 'water-tank-transition';
                tank.style.backgroundColor = waterColor;
                document.body.appendChild(tank);

                // At 2.5s (when water hits 100%), swap DOM and instantly remove tank
                setTimeout(() => {
                    html.setAttribute('data-theme', nextTheme);
                    localStorage.setItem('rf-theme', nextTheme);
                    updateIcons(!isCurrentlyLight);
                    tank.remove();
                    isAnimating = false;
                }, 2500);
            }

            // Set initial icons
            const current = document.documentElement.getAttribute('data-theme') === 'light';
            updateIcons(current);

            if(toggleDesktop) toggleDesktop.addEventListener('click', toggleThemeWithWater);
            if(toggleMobile) toggleMobile.addEventListener('click', toggleThemeWithWater);
        }
        document.addEventListener("DOMContentLoaded", initThemeToggle);
    </script>
`;


function processFile(filename) {
    let html = fs.readFileSync(filename, 'utf8');

    // 1. Remove previous "SMOOTH & BOUNCY THEME TRANSITION" block
    html = html.replace(/<!-- SMOOTH & BOUNCY THEME TRANSITION -->[\s\S]*?<\/script>/, '');

    // 2. Remove the old initThemeToggle function completely
    const initRegex = /function initThemeToggle\(\)\s*\{[\s\S]*?document\.addEventListener\("DOMContentLoaded", initThemeToggle\);\s*<\/script>/;
    html = html.replace(initRegex, '');

    // 3. Inject the new CSS and JS right before </body>
    if(!html.includes('WATER FILL TANK THEME TRANSITION')) {
        html = html.replace(/<\/body>/, waterCss + '\\n' + waterJs + '\\n</body>');
    }

    fs.writeFileSync(filename, html);
    console.log('Processed ' + filename);
}

processFile('public/index.html');
processFile('public/services.html');
processFile('public/reviews.html'); // Ensure reviews gets it too as he said "implement this in whole website"

