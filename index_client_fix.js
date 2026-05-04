const fs = require('fs');
const path = require('path');

const file = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Particle System Loop Override (Pause in Light Mode)
const oldLoopRegex = /function animateParticles\(\)\s*\{[\s\S]*?requestAnimationFrame\(animateParticles\);\s*\}/;
const newLoop = `let animId;
                function animateParticles() {
                    animId = requestAnimationFrame(animateParticles);
                    if (document.documentElement.getAttribute('data-theme') === 'light') {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        return; // Completely pause and render nothing in Light Mode
                    }
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
                        ctx.fillStyle = \`rgba(212, 175, 55, \${p.alpha})\`; 
                        ctx.fill();
                        p.x += p.dx;
                        p.y += p.dy;
                        if(p.y < 0) p.y = canvas.height;
                        if(p.x < 0) p.x = canvas.width;
                        if(p.x > canvas.width) p.x = 0;
                    });
                }`;
content = content.replace(oldLoopRegex, newLoop);

// 2. iPhone Mockup Video Fast Loading
content = content.replace(
    /id="heroVideoAd"\s*data-cms="home_iphone_reel"\s*onplay="this\.muted=true"/,
    `id="heroVideoAd" data-cms="home_iphone_reel" onplay="this.muted=true" poster="https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" preload="metadata"`
);

// 3. Jitter/Lag Fixes & 7. Mobile Layout Padding (Append to <style>)
const lagFixCss = `
        /* ==========================================================================
           ULTRA-SMOOTH MOBILE PERFORMANCE PATCH
           ========================================================================== */
        @media (max-width: 1024px) {
            .cursor-dot, .cursor-ring { display: none !important; } /* Kill heavy custom cursor on mobile */
            .ars-card, .ge-visual, .ba-handle-btn, .s2-right, .tag-pill {
                backdrop-filter: blur(5px) !important;
                -webkit-backdrop-filter: blur(5px) !important;
            }
            .section-pad, .growth-engine-section, .story-section, .radar-section, .xray-section, .reels-section, .rush-section { 
                padding: 4rem 5% !important; /* Fixed breathing room */
            }
            .ars-container { grid-template-columns: 1fr !important; } /* 1-column layout so it's not shrunk */
        }
`;
content = content.replace(/<\/style>/, lagFixCss + '\n    </style>');

// 4. "₹85 Lakh+" Parallax Update
content = content.replace(
    /<h2 data-cms="px_val"[^>]*>₹,185 Lakhs\+<\/h2>/,
    `<h2 data-cms="px_val" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 8vw, 7.5rem); color: var(--rf-text); line-height: 1; margin-bottom: 10px; text-shadow: 0 20px 40px rgba(0,0,0,0.9); font-weight: 700;">₹85 Lakh+</h2>`
);

// 5. Growth Engine Light Theme Overrides
content = content.replace(/\.ge-text h2 \{[^}]*\}/, ".ge-text h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5.5rem); color: var(--rf-text); line-height: 1.1; margin-bottom: 20px; transition: color 0.3s;}");
content = content.replace(/\.ge-text p \{[^}]*\}/, ".ge-text p { font-family: 'Outfit', sans-serif; font-size: 1.15rem; color: var(--rf-muted); line-height: 1.6; margin-bottom: 30px; transition: color 0.3s;}");
content = content.replace(/\.ge-feat \{[^}]*\}/, ".ge-feat { display: flex; align-items: center; gap: 12px; font-family: 'Outfit', sans-serif; font-size: 1.1rem; color: var(--rf-text); font-weight: 500; transition: color 0.3s;}");

// 6. Before/After Slider Drag Fix
content = content.replace(
    /class="ba-container reveal-up" id="baContainer" style="/,
    `class="ba-container reveal-up" id="baContainer" style="user-select: none; -webkit-user-select: none; `
);
// Add draggable="false" to the two slider images
content = content.replace(
    /class="ba-img-after"([^>]+)>/,
    `class="ba-img-after"$1 draggable="false">`
);
content = content.replace(
    /class="ba-img-before"([^>]+)>/,
    `class="ba-img-before"$1 draggable="false">`
);

fs.writeFileSync(file, content);
console.log('index.html fully patched and ready.');
