const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Upgrade `.reveal-on-scroll` to Apple-tier 3D unpack
const oldRevealCSS = /\.reveal-on-scroll\{opacity:0;transform:translateY\(40px\);transition:opacity \.9s cubic-bezier\(\.16,1,\.3,1\),transform \.9s cubic-bezier\(\.16,1,\.3,1\); will-change: transform, opacity;\}/;
const newRevealCSS = `.reveal-on-scroll { 
    opacity: 0; 
    transform: perspective(1000px) scale(0.95) rotateX(15deg) translateY(60px); 
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); 
    will-change: transform, opacity; 
    transform-style: preserve-3d;
}
.reveal-on-scroll.revealed {
    opacity: 1;
    transform: perspective(1000px) scale(1) rotateX(0deg) translateY(0);
}`;
html = html.replace(oldRevealCSS, newRevealCSS);

// If the old one was not found (maybe different whitespace), let's just forcefully append the new one to the end of the <style> block.
if (html === fs.readFileSync('public/index.html', 'utf8')) {
    html = html.replace(/<\/style>/, newRevealCSS + '\n</style>');
}

// 2. Define the Core Orb CSS
const orbCSS = `
/* THE SCROLL CORE GRAPHIC */
.scroll-core-container {
    position: absolute; top: 0; left: 0; width: 100%; pointer-events: none; z-index: 9000;
}
.scroll-core {
    position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,1) 0%, rgba(212,175,55,0.9) 20%, rgba(24,119,242,0.8) 60%, rgba(0,0,0,0.8) 100%);
    box-shadow: 0 0 60px rgba(212,175,55,0.6), inset -20px -20px 50px rgba(0,0,0,0.5), inset 20px 20px 40px rgba(255,255,255,0.5);
    display: flex; align-items: center; justify-content: center;
    will-change: transform, top, left, width, height; 
    opacity: 0; transition: opacity 1s ease;
}
.scroll-core::after {
    content: ''; position: absolute; inset: -10px; border-radius: 50%;
    border: 2px dashed rgba(255,255,255,0.3); animation: spinCore 20s linear infinite;
}
@keyframes spinCore { 100% { transform: rotate(360deg); } }
.scroll-core.active { opacity: 1; }
.scroll-core svg { width: 60%; height: 60%; animation: pulseCore 4s ease-in-out infinite alternate; }
@keyframes pulseCore { 0% { transform: scale(0.9); filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); } 100% { transform: scale(1.1); filter: drop-shadow(0 0 30px rgba(255,255,255,1)); } }
`;
html = html.replace(/<\/style>/, orbCSS + '\n</style>');

// 3. Inject the Orb HTML into the body (right after <body> tag)
const orbHTML = `
    <!-- The Scroll Graphic Animation -->
    <div class="scroll-core-container">
        <div class="scroll-core" id="scrollCore">
            <svg viewBox="0 0 100 100" fill="none" stroke="#FFF" stroke-width="2">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="rgba(255,255,255,0.8)"/>
                <polygon points="50,20 80,38 80,62 50,80 20,62 20,38" stroke="rgba(212,175,55,1)"/>
                <circle cx="50" cy="50" r="10" fill="#FFF" />
            </svg>
        </div>
    </div>
`;
html = html.replace(/<body[^>]*>/, (match) => match + '\n' + orbHTML);

// 4. Inject the Scroll Physics JS for the Orb
const orbJS = `
    /* CORE ORB SCROLL ENGINE */
    document.addEventListener('DOMContentLoaded', () => {
        const orb = document.getElementById('scrollCore');
        const hero = document.querySelector('.hero-section');
        const arsenal = document.getElementById('arsenal');
        
        if(!orb || !hero || !arsenal) return;
        
        let ticking = false;
        orb.classList.add('active');

        function updateOrb() {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const arsenalTop = arsenal.offsetTop;
            const arsenalHeight = arsenal.offsetHeight;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            
            // Phase 1: In Hero
            if (scrollY < heroHeight * 0.5) {
                // Starts top right of hero
                orb.style.position = 'absolute';
                orb.style.top = (hero.offsetTop + 150) + 'px';
                orb.style.left = '85%';
                orb.style.transform = 'translate(-50%, -50%) scale(1)';
            }
            // Phase 2: Scrolling down (Fixed)
            else if (scrollY >= heroHeight * 0.5 && scrollY < (arsenalTop - winHeight/2)) {
                orb.style.position = 'fixed';
                orb.style.top = '50%';
                orb.style.left = '90%';
                // Calculate rotation based on scroll
                const rot = scrollY * 0.1;
                orb.style.transform = \`translate(-50%, -50%) rotate(\${rot}deg) scale(0.8)\`;
            }
            // Phase 3: Settling into Arsenal
            else if (scrollY >= (arsenalTop - winHeight/2) && scrollY < (arsenalTop + arsenalHeight)) {
                // Calculate progress into Arsenal (0 to 1)
                const p = Math.min(1, (scrollY - (arsenalTop - winHeight/2)) / (winHeight/2));
                
                orb.style.position = 'absolute';
                
                // Start position when it transitioned to absolute
                const startY = arsenalTop - (winHeight/2) + (winHeight/2);
                // End position (centered in Arsenal header)
                const endY = arsenalTop + 100;
                
                // Interpolate Y
                const currentY = startY + ((endY - startY) * p);
                
                // Interpolate X (from 90% to 50%)
                const startX = window.innerWidth * 0.9;
                const endX = window.innerWidth * 0.5;
                const currentX = startX + ((endX - startX) * p);
                
                orb.style.top = currentY + 'px';
                orb.style.left = currentX + 'px';
                
                // Scale up as it settles
                const currentScale = 0.8 + (p * 0.4); // goes to 1.2
                const rot = scrollY * 0.1;
                
                orb.style.transform = \`translate(-50%, -50%) rotate(\${rot}deg) scale(\${currentScale})\`;
                
                // Fade out slightly when settled to act as background graphic
                orb.style.opacity = 1 - (p * 0.5); 
            } else {
                // Beyond Arsenal
                orb.style.position = 'absolute';
                orb.style.top = (arsenalTop + 100) + 'px';
                orb.style.left = '50%';
                orb.style.transform = 'translate(-50%, -50%) scale(1.2)';
                orb.style.opacity = 0.5;
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateOrb);
                ticking = true;
            }
        }, {passive: true});
        
        // Initial call
        updateOrb();
    });
`;
html = html.replace(/<\/body>/, '<script>\n' + orbJS + '\n</script>\n</body>');

fs.writeFileSync('public/index.html', html);
console.log('Scroll graphic and animations injected securely.');
