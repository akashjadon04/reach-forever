const fs = require('fs');

const waterCss = `
    <!-- ADVANCED BACKGROUND WATER THEME TRANSITION -->
    <style>
        /* 
           When animating, we make the base wrappers transparent so the water 
           rising at z-index: -1 becomes the actual background, while cards/text float on top! 
        */
        body.theme-animating {
            background: transparent !important;
        }
        body.theme-animating .main-wrapper, 
        body.theme-animating section, 
        body.theme-animating header {
            background: transparent !important;
            transition: background 0.1s ease !important;
        }

        .water-transition-container {
            position: fixed;
            top: 100vh;
            left: -50vw;
            width: 200vw;
            height: 250vh;
            z-index: -1; /* In the background! */
            pointer-events: none;
            will-change: transform;
            animation: waterRiseAnim 1.8s ease-in-out forwards;
        }

        /* The actual liquid body */
        .water-liquid {
            position: absolute;
            top: 100px; /* Leave room for waves */
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--next-bg-color, #FFF);
        }

        /* The animated fluid waves */
        .water-wave {
            position: absolute;
            top: -100px;
            left: 0;
            width: 200vw;
            height: 200px;
            background: var(--next-bg-color, #FFF);
            border-radius: 40%;
            animation: waveSpin 3s infinite linear;
            opacity: 0.8;
        }
        .water-wave-2 {
            position: absolute;
            top: -80px;
            left: -10vw;
            width: 210vw;
            height: 190px;
            background: var(--next-bg-color, #FFF);
            border-radius: 45%;
            animation: waveSpin 4s infinite linear reverse;
            opacity: 0.5;
        }

        @keyframes waveSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* The rise animation with 0.5s stops */
        @keyframes waterRiseAnim {
            0% { transform: translateY(0); }
            25% { transform: translateY(-40vh); }
            45% { transform: translateY(-40vh); } /* Stop 1 */
            65% { transform: translateY(-75vh); }
            80% { transform: translateY(-75vh); } /* Stop 2 */
            100% { transform: translateY(-130vh); } /* Fully cover the 100vh screen */
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

            function triggerWaterTheme(e) {
                if(e) e.preventDefault();
                if (isAnimating) return;
                isAnimating = true;

                const html = document.documentElement;
                const isCurrentlyLight = html.getAttribute('data-theme') === 'light';
                const nextTheme = isCurrentlyLight ? 'dark' : 'light';
                const nextBgColor = isCurrentlyLight ? '#050507' : '#FFFFFF'; 

                // 1. Make the body sections transparent so water is visible behind them
                document.body.classList.add('theme-animating');

                // 2. Create the fluid water container
                const container = document.createElement('div');
                container.className = 'water-transition-container';
                container.style.setProperty('--next-bg-color', nextBgColor);

                container.innerHTML = \`
                    <div class="water-wave"></div>
                    <div class="water-wave-2"></div>
                    <div class="water-liquid"></div>
                \`;

                document.body.appendChild(container);

                // 3. At 1.8s, the water completely covers the background. Swap the real theme.
                setTimeout(() => {
                    html.setAttribute('data-theme', nextTheme);
                    localStorage.setItem('rf-theme', nextTheme);
                    updateIcons(!isCurrentlyLight);
                    
                    // Remove transparency classes and the water tank instantly (Zero flicker)
                    document.body.classList.remove('theme-animating');
                    container.remove();
                    isAnimating = false;
                }, 1800);
            }

            const current = document.documentElement.getAttribute('data-theme') === 'light';
            updateIcons(current);

            if(toggleDesktop) toggleDesktop.addEventListener('click', triggerWaterTheme);
            if(toggleMobile) toggleMobile.addEventListener('click', triggerWaterTheme);
        }
        document.addEventListener("DOMContentLoaded", initThemeToggle);
    </script>
`;

function processFile(filename) {
    let html = fs.readFileSync(filename, 'utf8');

    // Remove old WATER FILL script
    html = html.replace(/<!-- WATER FILL TANK THEME TRANSITION -->[\s\S]*?<\/script>/, '');

    // Ensure the old initThemeToggle is wiped if present
    const initRegex = /function initThemeToggle\(\)\s*\{[\s\S]*?document\.addEventListener\("DOMContentLoaded", initThemeToggle\);\s*<\/script>/;
    html = html.replace(initRegex, '');

    // Inject the new fluid background water transition
    if(!html.includes('ADVANCED BACKGROUND WATER THEME TRANSITION')) {
        html = html.replace(/<\/body>/, waterCss + '\\n' + waterJs + '\\n</body>');
    }

    fs.writeFileSync(filename, html);
    console.log('Advanced Water physics deployed to ' + filename);
}

processFile('public/index.html');
processFile('public/services.html');
processFile('public/reviews.html');
