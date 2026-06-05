(function() {
    // 1. Invalidate all original body content immediately
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#050507';
    document.body.style.fontFamily = "'Outfit', sans-serif";

    // 2. Load Fonts (Cormorant Garamond + Outfit + Remix Icons for the diamond)
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    const iconLink = document.createElement('link');
    iconLink.href = 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';
    iconLink.rel = 'stylesheet';
    document.head.appendChild(iconLink);

    // 3. Inject Premium CSS
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --gold: #D4AF37; --bg: #050507; }
        * { box-sizing: border-box; }
        .maint-wrap { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 50%, #0d0f14 0%, #050507 80%); z-index: 999999999; }
        
        #maintCanvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; opacity: 0.6; }
        
        .maint-content { position: relative; z-index: 10; text-align: center; display: flex; flex-direction: column; align-items: center; max-width: 900px; padding: 0 5%; width: 100%; }
        
        .maint-icon-wrap { position: relative; width: 80px; height: 80px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; background: rgba(212,175,55,0.05); border-radius: 50%; border: 1px solid rgba(212,175,55,0.2); box-shadow: 0 0 40px rgba(212,175,55,0.1); }
        .maint-icon-wrap i { font-size: 2.5rem; color: var(--gold); }
        
        .maint-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 7vw, 6rem); font-weight: 500; color: #FFF; line-height: 1; margin-bottom: 25px; letter-spacing: -1px; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .maint-sub { font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.6; max-width: 600px; margin-bottom: 60px; letter-spacing: 0.5px; }
        
        /* Stunning Evolnex Branding */
        .evolnex-card { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 25px 50px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; text-decoration: none; position: relative; overflow: hidden; backdrop-filter: blur(20px); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .evolnex-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1), transparent 60%); opacity: 0; transition: opacity 0.5s; pointer-events: none; }
        .evolnex-card:hover { transform: translateY(-5px) scale(1.02); background: rgba(255,255,255,0.04); border-color: rgba(212,175,55,0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.15); }
        .evolnex-card:hover::before { opacity: 1; }
        
        .em-text { font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 400; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 3px; }
        .em-brand { display: flex; align-items: center; gap: 10px; font-family: 'Outfit', sans-serif; font-size: 1.8rem; font-weight: 800; color: #FFF; letter-spacing: 2px; }
        .em-brand i { color: var(--gold); font-size: 1.5rem; text-shadow: 0 0 15px rgba(212,175,55,0.5); transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .evolnex-card:hover .em-brand i { transform: rotate(180deg) scale(1.2); color: #FFF; text-shadow: 0 0 20px rgba(255,255,255,0.8); }
        
        .maint-foot { position: absolute; bottom: 30px; left: 0; width: 100%; text-align: center; font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 400; color: rgba(255,255,255,0.2); letter-spacing: 1px; text-transform: uppercase; }
        
        /* A subtle sweeping light over the card */
        .card-sweep { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); transform: skewX(-20deg); transition: 0s; }
        .evolnex-card:hover .card-sweep { left: 200%; transition: 0.8s ease; }
    `;
    document.head.appendChild(style);

    // 4. Inject HTML Structure
    const wrap = document.createElement('div');
    wrap.className = 'maint-wrap';
    wrap.innerHTML = `
        <canvas id="maintCanvas"></canvas>

        <div class="maint-content">
            <div class="maint-icon-wrap" id="gsIcon">
                <i class="ri-tools-fill"></i>
            </div>
            
            <h1 class="maint-h1" id="gsH1">Website Under Maintenance</h1>
            <p class="maint-sub" id="gsSub">We are currently making improvements to our website. Please check back soon to see the new and improved experience.</p>
            
            <div id="gsBadge">
                <a href="https://evolnex.digital" target="_blank" class="evolnex-card">
                    <div class="card-sweep"></div>
                    <span class="em-text">Powered By</span>
                    <div class="em-brand">
                        <span>EVOLNEX</span>
                        <i class="ri-vip-diamond-fill"></i>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="maint-foot" id="gsFoot">© 2025 Reach Forever. All rights reserved.</div>
    `;
    document.body.appendChild(wrap);

    // 5. Canvas Golden Constellation Particle Effect
    const canvas = document.getElementById('maintCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        const particleCount = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    function animateCanvas() {
        requestAnimationFrame(animateCanvas);
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
            ctx.fill();
            
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = \`rgba(212, 175, 55, \${0.15 - dist/1000})\`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();

    // 6. Load GSAP safely
    function loadGSAP(callback) {
        if (window.gsap) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadGSAP(() => {
        document.documentElement.style.display = '';

        gsap.set(['#gsIcon', '#gsH1', '#gsSub', '#gsBadge', '#gsFoot'], { opacity: 0, y: 40 });
        
        // Gentle float for icon
        gsap.to('#gsIcon', { y: '-=10', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

        const tl = gsap.timeline({ delay: 0.2 });
        tl.to('#gsIcon', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' })
          .to('#gsH1', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, "-=0.8")
          .to('#gsSub', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.9")
          .to('#gsBadge', { opacity: 1, y: 0, duration: 1.5, ease: 'back.out(1.2)' }, "-=0.6")
          .to('#gsFoot', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=1");
    });

})();
