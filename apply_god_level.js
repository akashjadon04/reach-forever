const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');
let css = fs.readFileSync('public/css/style.css', 'utf8');
let js = fs.readFileSync('public/js/main.js', 'utf8');

// 1. FIX FETCH LOGIC (No syntax errors)
const fetchString = `const videos = [];
    for(let i=1; i<=20; i++){
        const url = 'assets/video_'+i+'.mp4';
        try {
            const res = await fetch(url, {method:'HEAD'});
            if(res.ok) videos.push(url);
            else break;
        } catch(e){ break; }
    }`;
const hardcodedVideos = `const videos = ['assets/video_1.mp4', 'assets/video_2.mp4', 'assets/video_3.mp4', 'assets/video_4.mp4', 'assets/video_5.mp4'];`;
html = html.replace(fetchString, hardcodedVideos);

// Fix Pexels video 403 Forbidden link (if it exists)
html = html.replace(/https:\/\/videos\.pexels\.com\/[^"']+/g, 'assets/video_1.mp4');

// 2. THEME SWITCH (Light Premium Theme)
css = css.replace(/--bg-main:\s*#05020A;/g, '--bg-main: #F4F4F0;');
css = css.replace(/--bg-panel:\s*rgba\(15,8,25,\.6\);/g, '--bg-panel: rgba(255,255,255,0.7);');
css = css.replace(/--rf-text:\s*#FFFFFF;/g, '--rf-text: #111111;');
css = css.replace(/--rf-muted:\s*#A0A0A0;/g, '--rf-muted: #555555;');
// Footer keep dark
html = html.replace(/<footer class="premium-footer"/, '<footer class="premium-footer" style="background:#05020A; color:#A0A0A0;"');
html = html.replace(/<div class="pf-container"/, '<div class="pf-container" style="color:#A0A0A0;"');
html = html.replace(/<h4>Sitemap<\/h4>/, '<h4 style="color:#FFF;">Sitemap</h4>');
html = html.replace(/<h4>Legal & Contact<\/h4>/, '<h4 style="color:#FFF;">Legal & Contact</h4>');
html = html.replace(/<strong style="color:var\(--rf-text\)">Reach Forever HQ<\/strong>/, '<strong style="color:#FFF;">Reach Forever HQ</strong>');

// 3. INJECT THE SCROLL GRAPHIC (Glowing Orb)
const orbCSS = `
/* THE SCROLL CORE GRAPHIC */
.scroll-core-container { position: absolute; top: 0; left: 0; width: 100%; pointer-events: none; z-index: 9000; }
.scroll-core {
    position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
    width: 250px; height: 250px; border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,1) 0%, rgba(212,175,55,0.8) 30%, rgba(24,119,242,0.6) 70%, rgba(0,0,0,0.8) 100%);
    box-shadow: 0 0 60px rgba(212,175,55,0.4), inset -20px -20px 50px rgba(0,0,0,0.3), inset 20px 20px 40px rgba(255,255,255,0.6);
    display: flex; align-items: center; justify-content: center;
    will-change: transform, top, left, opacity; opacity: 0; transition: opacity 1s ease;
}
.scroll-core::after {
    content: ''; position: absolute; inset: -15px; border-radius: 50%;
    border: 2px dashed rgba(212,175,55,0.5); animation: spinCore 25s linear infinite;
}
@keyframes spinCore { 100% { transform: rotate(360deg); } }
.scroll-core.active { opacity: 1; }
.scroll-core svg { width: 50%; height: 50%; animation: pulseCore 3s ease-in-out infinite alternate; }
@keyframes pulseCore { 0% { transform: scale(0.9); filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); } 100% { transform: scale(1.1); filter: drop-shadow(0 0 30px rgba(255,255,255,1)); } }
`;
html = html.replace(/<\/style>/, orbCSS + '\n</style>');

const orbHTML = `
    <!-- The Scroll Graphic Animation -->
    <div class="scroll-core-container">
        <div class="scroll-core" id="scrollCore">
            <svg viewBox="0 0 100 100" fill="none" stroke="#FFF" stroke-width="2">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="rgba(255,255,255,0.9)"/>
                <polygon points="50,20 80,38 80,62 50,80 20,62 20,38" stroke="rgba(212,175,55,1)"/>
                <circle cx="50" cy="50" r="10" fill="#FFF" />
            </svg>
        </div>
    </div>
`;
html = html.replace(/<body[^>]*>/, (match) => match + '\n' + orbHTML);

const orbJS = `
    /* CORE ORB SCROLL ENGINE */
    document.addEventListener('DOMContentLoaded', () => {
        const orb = document.getElementById('scrollCore');
        const hero = document.getElementById('home');
        const arsenal = document.getElementById('arsenal');
        
        if(!orb || !hero || !arsenal) return;
        let ticking = false; orb.classList.add('active');

        function updateOrb() {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const arsenalTop = arsenal.offsetTop;
            const arsenalHeight = arsenal.offsetHeight;
            const winHeight = window.innerHeight;
            
            if (scrollY < heroHeight * 0.5) {
                orb.style.position = 'absolute';
                orb.style.top = (hero.offsetTop + 200) + 'px';
                orb.style.left = '85%';
                orb.style.transform = 'translate(-50%, -50%) scale(1)';
            } else if (scrollY >= heroHeight * 0.5 && scrollY < (arsenalTop - winHeight/2)) {
                orb.style.position = 'fixed';
                orb.style.top = '50%';
                orb.style.left = '85%';
                const rot = scrollY * 0.1;
                orb.style.transform = \`translate(-50%, -50%) rotate(\${rot}deg) scale(0.8)\`;
            } else if (scrollY >= (arsenalTop - winHeight/2) && scrollY < (arsenalTop + arsenalHeight)) {
                const p = Math.min(1, (scrollY - (arsenalTop - winHeight/2)) / (winHeight/2));
                orb.style.position = 'absolute';
                const startY = arsenalTop - (winHeight/2) + (winHeight/2);
                const endY = arsenalTop + 150;
                const currentY = startY + ((endY - startY) * p);
                const startX = window.innerWidth * 0.85;
                const endX = window.innerWidth * 0.5;
                const currentX = startX + ((endX - startX) * p);
                orb.style.top = currentY + 'px';
                orb.style.left = currentX + 'px';
                const currentScale = 0.8 + (p * 0.5); 
                const rot = scrollY * 0.1;
                orb.style.transform = \`translate(-50%, -50%) rotate(\${rot}deg) scale(\${currentScale})\`;
                orb.style.opacity = 1 - (p * 0.3); 
            } else {
                orb.style.position = 'absolute';
                orb.style.top = (arsenalTop + 150) + 'px';
                orb.style.left = '50%';
                orb.style.transform = 'translate(-50%, -50%) scale(1.3)';
                orb.style.opacity = 0.7;
            }
            ticking = false;
        }
        window.addEventListener('scroll', () => {
            if (!ticking) { window.requestAnimationFrame(updateOrb); ticking = true; }
        }, {passive: true});
        updateOrb();
    });
`;
html = html.replace(/<\/body>/, '<script>\n' + orbJS + '\n</script>\n</body>');

// 4. UPGRADE REVEAL ANIMATIONS TO APPLE-TIER 3D UNPACK
const oldRevealCSS = `.reveal-on-scroll{opacity:0;transform:translateY(40px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}`;
const newRevealCSS = `.reveal-on-scroll { 
    opacity: 0; 
    transform: perspective(1000px) scale(0.92) rotateX(15deg) translateY(60px); 
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); 
    will-change: transform, opacity; 
    transform-style: preserve-3d;
}`;
html = html.replace(oldRevealCSS, newRevealCSS);
// Wait, the original css uses `transform:translateY(40px)`. We need to overwrite `.reveal-on-scroll.revealed`.
const newRevealedCSS = `.reveal-on-scroll.revealed { opacity: 1 !important; transform: perspective(1000px) scale(1) rotateX(0deg) translateY(0) !important; }`;
html = html.replace(/<\/style>/, newRevealedCSS + '\n</style>');

fs.writeFileSync('public/index.html', html);
fs.writeFileSync('public/css/style.css', css);

console.log('Successfully upgraded the original layout with God-Level features.');
