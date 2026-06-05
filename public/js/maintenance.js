(function() {
    // 1. Invalidate all original body content immediately
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#050608';

    // 2. Load Fonts (Cormorant Garamond + Outfit)
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;600;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // 3. Inject Premium CSS
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --gold: #D4AF37; --bg: #050608; }
        * { box-sizing: border-box; }
        .maint-wrap { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, #050608 70%); z-index: 999999999; }
        
        .maint-bg-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; opacity: 0.3; }
        
        .maint-content { position: relative; z-index: 10; text-align: center; display: flex; flex-direction: column; align-items: center; max-width: 800px; padding: 0 5%; }
        
        .maint-icon-wrap { position: relative; width: 160px; height: 160px; margin-bottom: 40px; display: flex; align-items: center; justify-content: center; }
        .maint-svg-core { width: 100%; height: 100%; filter: drop-shadow(0 0 20px rgba(212,175,55,0.3)); }
        
        .maint-eyebrow { font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; color: var(--gold); margin-bottom: 20px; }
        .maint-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5rem); font-weight: 400; color: #FFF; line-height: 1.1; margin-bottom: 30px; letter-spacing: -1px; }
        .maint-h1 i { font-style: italic; color: rgba(255,255,255,0.7); }
        .maint-sub { font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.6; max-width: 500px; margin-bottom: 50px; }
        
        .evolnex-maint-badge { display: inline-flex; align-items: center; gap: 10px; padding: 12px 28px; border-radius: 100px; background: rgba(212,175,55,0.03); border: 1px solid rgba(212,175,55,0.15); text-decoration: none; position: relative; overflow: hidden; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); backdrop-filter: blur(10px); }
        .evolnex-maint-badge::before { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent); transform: skewX(-20deg); transition: all 0.7s ease; }
        .evolnex-maint-badge:hover { background: rgba(212,175,55,0.1); border-color: rgba(212,175,55,0.4); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.15); }
        .evolnex-maint-badge:hover::before { left: 200%; }
        
        .em-text { font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 400; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 2px; }
        .em-brand { font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 800; color: #FFF; letter-spacing: 1px; }
        .em-icon { width: 20px; height: 20px; fill: var(--gold); transition: transform 0.5s ease; }
        .evolnex-maint-badge:hover .em-icon { transform: scale(1.15) rotate(15deg); fill: #FFF; }
        
        .maint-foot { position: absolute; bottom: 40px; left: 0; width: 100%; text-align: center; font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 400; color: rgba(255,255,255,0.3); letter-spacing: 1px; text-transform: uppercase; }
        
        .particle { position: absolute; border-radius: 50%; background: #D4AF37; box-shadow: 0 0 10px #D4AF37; pointer-events: none; }
    `;
    document.head.appendChild(style);

    // 4. Inject HTML Structure
    const wrap = document.createElement('div');
    wrap.className = 'maint-wrap';
    wrap.innerHTML = `
        <!-- Background Ambient SVG -->
        <svg class="maint-bg-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
                <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.08" />
                    <stop offset="100%" stop-color="#050608" stop-opacity="0" />
                </radialGradient>
            </defs>
            <circle cx="50%" cy="50%" r="800" fill="url(#bgGlow)" />
            <g id="bgLines" stroke="rgba(212,175,55,0.03)" stroke-width="1" fill="none"></g>
        </svg>

        <div class="maint-content">
            <div class="maint-icon-wrap" id="svgWrap">
                <svg class="maint-svg-core" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="80" stroke="rgba(212,175,55,0.1)" stroke-width="1" />
                    <circle cx="100" cy="100" r="60" stroke="rgba(212,175,55,0.3)" stroke-width="1" stroke-dasharray="4 4" id="spinRing1" />
                    <circle cx="100" cy="100" r="40" stroke="rgba(212,175,55,0.5)" stroke-width="2" id="spinRing2" />
                    <path d="M100 20 L100 180 M20 100 L180 100" stroke="rgba(212,175,55,0.15)" stroke-width="1" />
                    <path d="M43 43 L157 157 M43 157 L157 43" stroke="rgba(212,175,55,0.15)" stroke-width="1" />
                    <polygon points="100,70 126,115 74,115" fill="none" stroke="#D4AF37" stroke-width="2" id="spinTri" />
                    <circle cx="100" cy="100" r="4" fill="#D4AF37" />
                </svg>
            </div>
            
            <div class="maint-eyebrow" id="gsEyebrow">System Architecture</div>
            <h1 class="maint-h1" id="gsH1">Elevating the <i>Standard</i></h1>
            <p class="maint-sub" id="gsSub">reachforever.com is currently undergoing a deep infrastructural upgrade. We are engineering a new digital experience.</p>
            
            <div id="gsBadge">
                <a href="https://evolnex.digital" target="_blank" class="evolnex-maint-badge">
                    <span class="em-text">Engineered By</span>
                    <span class="em-brand">EVOLNEX</span>
                    <svg class="em-icon" viewBox="0 0 24 24">
                        <path d="M12 2L2 12L12 22L22 12L12 2ZM12 4.8L19.2 12L12 19.2L4.8 12L12 4.8ZM12 9L9 12L12 15L15 12L12 9Z" />
                    </svg>
                </a>
            </div>
        </div>
        
        <div class="maint-foot" id="gsFoot">© 2025 Reach Forever. All rights reserved.</div>
    `;
    document.body.appendChild(wrap);

    // Generate BG Lines
    const bgLines = document.getElementById('bgLines');
    for(let i=0; i<20; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        line.setAttribute("cx", "500");
        line.setAttribute("cy", "500");
        line.setAttribute("r", (i * 45).toString());
        bgLines.appendChild(line);
    }

    // 5. Load GSAP safely
    function loadGSAP(callback) {
        if (window.gsap) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadGSAP(() => {
        // Reveal the document display (which was hidden by index.html script)
        document.documentElement.style.display = '';

        // Initial setup
        gsap.set(['#gsEyebrow', '#gsH1', '#gsSub', '#gsBadge', '#gsFoot', '#svgWrap'], { opacity: 0, y: 30 });
        
        // Continuous SVG animations
        gsap.to('#spinRing1', { rotation: 360, duration: 20, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
        gsap.to('#spinRing2', { rotation: -360, duration: 15, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
        gsap.to('#spinTri', { rotation: 360, duration: 10, repeat: -1, ease: 'none', transformOrigin: '50% 60%' });
        
        // Background pulse
        gsap.to('.maint-bg-svg', { scale: 1.05, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

        // Timeline Entrance
        const tl = gsap.timeline({ delay: 0.2 });
        tl.to('#svgWrap', { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' })
          .to('#gsEyebrow', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=1")
          .to('#gsH1', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, "-=0.8")
          .to('#gsSub', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.9")
          .to('#gsBadge', { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)' }, "-=0.7")
          .to('#gsFoot', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5");

        // Generate Ambient Particles
        for(let i=0; i<30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 3 + 1;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.opacity = Math.random() * 0.5 + 0.1;
            wrap.appendChild(p);

            // Random positioning and movement
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            gsap.set(p, { x: startX, y: startY });
            
            gsap.to(p, {
                x: startX + (Math.random() * 200 - 100),
                y: startY - (Math.random() * 300 + 100),
                duration: Math.random() * 10 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    });

})();
