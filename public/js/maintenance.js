(function() {
    // 1. Reset Body
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#030407';
    document.body.style.cursor = 'none'; // Custom cursor

    // 2. Load Premium Fonts & Icons
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Outfit:wght@200;300;400;600;800&family=Space+Grotesk:wght@300;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    const iconLink = document.createElement('link');
    iconLink.href = 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';
    iconLink.rel = 'stylesheet';
    document.head.appendChild(iconLink);

    // 3. Inject Ultra-Complex CSS (400+ lines of logic logic & styling)
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --gold: #E5C158; --gold-dark: #A67B27; --bg: #030407; }
        * { box-sizing: border-box; }
        
        /* Noise Overlay for cinematic feel */
        .noise-overlay { position: fixed; inset: 0; z-index: 999999; pointer-events: none; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        
        .maint-wrap { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 99999; background: radial-gradient(circle at 50% 50%, #0a0d14 0%, var(--bg) 100%); overflow: hidden; }
        
        /* Background Marquee Text */
        .marquee-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-15deg); width: 200vw; overflow: hidden; z-index: 0; opacity: 0.03; pointer-events: none; }
        .marquee-track { display: flex; width: max-content; animation: scrollText 40s linear infinite; }
        .marquee-text { font-family: 'Space Grotesk', sans-serif; font-size: 15vw; font-weight: 700; color: transparent; -webkit-text-stroke: 2px #FFF; white-space: nowrap; padding: 0 2vw; letter-spacing: -2px; }
        @keyframes scrollText { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* Massive Glowing Eclipse */
        .eclipse-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80vw; height: 80vw; max-width: 800px; max-height: 800px; z-index: 1; pointer-events: none; }
        .eclipse-glow { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, rgba(229,193,88,0.15) 0%, rgba(229,193,88,0) 70%); filter: blur(40px); animation: breathe 8s ease-in-out infinite alternate; }
        .eclipse-ring { position: absolute; inset: 10%; border-radius: 50%; border: 1px solid rgba(229,193,88,0.3); border-top-color: transparent; border-bottom-color: transparent; animation: spin 20s linear infinite; }
        .eclipse-ring-2 { position: absolute; inset: 15%; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.1); animation: spinReverse 30s linear infinite; }
        @keyframes breathe { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.1); opacity: 1; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }

        /* Interactive Canvas */
        #maintCanvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; opacity: 0.8; }

        /* Foreground Content */
        .maint-content { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; padding: 0 5%; text-align: center; }
        
        .eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 500; color: var(--gold); letter-spacing: 10px; text-transform: uppercase; margin-bottom: 2vh; display: flex; align-items: center; gap: 15px; }
        .eyebrow::before, .eyebrow::after { content: ''; width: 40px; height: 1px; background: var(--gold); opacity: 0.5; }
        
        .h1-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; }
        .maint-h1 { font-family: 'Cinzel', serif; font-size: clamp(4rem, 9vw, 10rem); font-weight: 700; color: #FFF; line-height: 0.9; margin: 0; letter-spacing: 2px; text-shadow: 0 20px 40px rgba(0,0,0,0.8); }
        .char { display: inline-block; opacity: 0; transform: translateY(50px) rotateX(-40deg); } /* For GSAP split text */
        
        .maint-h1.gold-text { color: transparent; background: linear-gradient(180deg, #FFFFFF 0%, #E5C158 100%); -webkit-background-clip: text; background-clip: text; font-style: italic; font-weight: 600; padding-right: 1vw; }

        .maint-sub { font-family: 'Outfit', sans-serif; font-size: clamp(1.1rem, 1.5vw, 1.5rem); font-weight: 300; color: rgba(255,255,255,0.7); line-height: 1.6; max-width: 800px; margin-top: 4vh; margin-bottom: 6vh; letter-spacing: 1px; }

        /* The Ultimate Evolnex Card */
        .evolnex-card-wrap { position: relative; perspective: 1000px; z-index: 20; }
        .evolnex-card { display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 30px; padding: 25px 40px; background: rgba(20,22,28,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; text-decoration: none; position: relative; overflow: hidden; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(229,193,88,0); transform-style: preserve-3d; }
        
        .card-bg-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(229,193,88,0.15), transparent 70%); opacity: 0; transition: opacity 0.6s ease; pointer-events: none; }
        .evolnex-card:hover .card-bg-glow { opacity: 1; }
        
        .evolnex-card:hover { transform: translateY(-10px) rotateX(5deg) rotateY(-5deg); background: rgba(25,28,35,0.6); box-shadow: 0 40px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(229,193,88,0.4); }
        
        .ec-left { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
        .ec-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.5); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 5px; }
        .ec-brand { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 800; color: #FFF; letter-spacing: 3px; line-height: 1; }
        
        .ec-right { position: relative; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; background: rgba(229,193,88,0.1); border: 1px solid rgba(229,193,88,0.3); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .ec-right i { font-size: 1.8rem; color: var(--gold); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .evolnex-card:hover .ec-right { background: var(--gold); border-color: #FFF; transform: scale(1.1); box-shadow: 0 0 30px rgba(229,193,88,0.5); }
        .evolnex-card:hover .ec-right i { color: #000; transform: rotate(180deg); }

        .ec-sweep { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: skewX(-20deg); transition: 0s; z-index: 5; pointer-events: none; }
        .evolnex-card:hover .ec-sweep { left: 200%; transition: 1s ease-in-out; }

        /* Custom Cursor */
        .cursor-dot { position: fixed; top: 0; left: 0; width: 8px; height: 8px; background: #FFF; border-radius: 50%; z-index: 9999999; pointer-events: none; transform: translate(-50%, -50%); transition: width 0.3s, height 0.3s; }
        .cursor-ring { position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 1px solid rgba(229,193,88,0.5); border-radius: 50%; z-index: 9999998; pointer-events: none; transform: translate(-50%, -50%); transition: width 0.3s, height 0.3s, border-color 0.3s; }
        
        /* Interactive element hover state for cursor */
        a:hover ~ .cursor-dot { width: 0; height: 0; }
        a:hover ~ .cursor-ring { width: 80px; height: 80px; border-color: #FFF; background: rgba(255,255,255,0.05); backdrop-filter: blur(2px); }

        @media(max-width: 768px) {
            .evolnex-card { flex-direction: column; text-align: center; gap: 20px; padding: 30px; }
            .ec-left { align-items: center; text-align: center; }
            .eyebrow::before, .eyebrow::after { width: 20px; }
            .cursor-dot, .cursor-ring { display: none; }
            body { cursor: auto !important; }
        }
    `;
    document.head.appendChild(style);

    // 4. Inject Complex DOM Structure
    const wrap = document.createElement('div');
    wrap.className = 'maint-wrap';
    
    // We will split the text manually so we don't need GSAP SplitText plugin
    function createSplitText(text, className) {
        let html = '';
        for(let i=0; i<text.length; i++) {
            if(text[i] === ' ') html += '<span class="char" style="width: 2vw;">&nbsp;</span>';
            else html += \`<span class="char">\${text[i]}</span>\`;
        }
        return \`<div class="\${className}">\${html}</div>\`;
    }

    wrap.innerHTML = `
        <div class="noise-overlay"></div>
        
        <div class="marquee-container">
            <div class="marquee-track">
                <div class="marquee-text">EVOLNEX DIGITAL INFRASTRUCTURE • EVOLNEX DIGITAL INFRASTRUCTURE • EVOLNEX DIGITAL INFRASTRUCTURE • </div>
                <div class="marquee-text">EVOLNEX DIGITAL INFRASTRUCTURE • EVOLNEX DIGITAL INFRASTRUCTURE • EVOLNEX DIGITAL INFRASTRUCTURE • </div>
            </div>
        </div>

        <div class="eclipse-container">
            <div class="eclipse-glow"></div>
            <div class="eclipse-ring"></div>
            <div class="eclipse-ring-2"></div>
        </div>

        <canvas id="maintCanvas"></canvas>

        <div class="maint-content">
            <div class="eyebrow" id="gsEyebrow">SYSTEM OFFLINE</div>
            
            <div class="h1-wrap" id="gsTitleWrap">
                \${createSplitText('WEBSITE', 'maint-h1')}
                \${createSplitText('UNDER', 'maint-h1')}
                \${createSplitText('MAINTENANCE', 'maint-h1 gold-text')}
            </div>
            
            <p class="maint-sub" id="gsSub">We are actively engineering a superior digital experience. Visual and structural upgrades are currently being deployed. Access will be restored shortly.</p>
            
            <div class="evolnex-card-wrap" id="gsBadge">
                <a href="https://evolnex.digital" target="_blank" class="evolnex-card">
                    <div class="card-bg-glow"></div>
                    <div class="ec-sweep"></div>
                    <div class="ec-left">
                        <span class="ec-title">Engineered & Designed By</span>
                        <span class="ec-brand">EVOLNEX</span>
                    </div>
                    <div class="ec-right">
                        <i class="ri-vip-diamond-fill"></i>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="cursor-dot"></div>
        <div class="cursor-ring"></div>
    `;
    document.body.appendChild(wrap);

    // 5. Advanced WebGL-like Interactive Canvas Particles
    const canvas = document.getElementById('maintCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    
    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        const count = window.innerWidth < 768 ? 60 : 120;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                baseRadius: Math.random() * 2 + 0.5,
                radius: 0
            });
            particles[i].radius = particles[i].baseRadius;
        }
    }
    
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });
    
    function animateCanvas() {
        requestAnimationFrame(animateCanvas);
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Mouse repulsion physics
            const dxMouse = mouse.x - p.x;
            const dyMouse = mouse.y - p.y;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distMouse < 150) {
                const force = (150 - distMouse) / 150;
                p.vx -= (dxMouse / distMouse) * force * 0.5;
                p.vy -= (dyMouse / distMouse) * force * 0.5;
                p.radius = p.baseRadius * 2;
            } else {
                p.radius = p.baseRadius;
            }
            
            // Friction and limits
            p.vx *= 0.98;
            p.vy *= 0.98;
            
            // Base movement
            p.x += p.vx + (Math.sin(Date.now() / 1000 + i) * 0.2);
            p.y += p.vy + (Math.cos(Date.now() / 1000 + i) * 0.2);
            
            // Bounce bounds
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = distMouse < 150 ? '#FFF' : 'rgba(229, 193, 88, 0.4)';
            ctx.fill();
            
            // Connect close particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = \`rgba(229, 193, 88, \${0.2 - dist/500})\`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();

    // 6. Custom Cursor Logic (Spring physics trailing)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    
    function animateCursor() {
        if(window.innerWidth > 768) {
            // Instant dot
            cursorDot.style.left = mouse.x + 'px';
            cursorDot.style.top = mouse.y + 'px';
            
            // Spring physics for ring
            ringX += (mouse.x - ringX) * 0.15;
            ringY += (mouse.y - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 7. Load GSAP safely and Trigger Massive Animations
    function loadGSAP(callback) {
        if (window.gsap) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadGSAP(() => {
        document.documentElement.style.display = '';

        gsap.set(['#gsEyebrow', '#gsSub', '#gsBadge'], { opacity: 0, y: 50 });
        
        // 3D Hover Tilt Effect for Card
        const card = document.querySelector('.evolnex-card');
        const wrapCard = document.querySelector('.evolnex-card-wrap');
        
        if(window.innerWidth > 768) {
            wrapCard.addEventListener('mousemove', (e) => {
                const rect = wrapCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                gsap.to(card, { rotateX: rotateX, rotateY: rotateY, duration: 0.5, ease: 'power2.out' });
            });
            wrapCard.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power2.out' });
            });
        }

        // Master Timeline Entrance
        const tl = gsap.timeline({ delay: 0.3 });
        
        // Stagger the massive letters (3D flip up)
        const chars = document.querySelectorAll('.char');
        tl.to(chars, { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            duration: 1.2, 
            stagger: 0.04, 
            ease: 'back.out(1.2)' 
        })
        .to('#gsEyebrow', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=1.5")
        .to('#gsSub', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=1")
        .to('#gsBadge', { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }, "-=0.8");
    });

})();
