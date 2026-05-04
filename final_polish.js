const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const indexHtmlPath = path.join(publicDir, 'index.html');
const cssPath = path.join(publicDir, 'css', 'dark-overhaul.css');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// --- 1. LIGHT MODE PARTICLES ---
// Update JS to pause drawing if data-theme is light
html = html.replace(
    /ctx\.clearRect\(0,0,canvas\.width, canvas\.height\);([\s\S]*?)ctx\.fillStyle = document\.documentElement\.getAttribute\('data-theme'\) === 'light' \? `rgba\(0,0,0,\$\{p\.alpha\}\)` : `rgba\(212, 175, 55, \$\{p\.alpha\}\)`;/g,
    `if(document.documentElement.getAttribute('data-theme') === 'light') { requestAnimationFrame(animateParticles); return; }
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                    $1ctx.fillStyle = \`rgba(200, 169, 110, \${p.alpha})\`;`
);
// We no longer need to check theme in fillStyle since it skips entirely on light mode.

// --- 2. IPHONE VIDEO OPTIMIZATION ---
html = html.replace(/4100018-uhd_1440_2560_25fps\.mp4/g, '4100018-sd_506_960_25fps.mp4'); // Lower resolution for fast loading
html = html.replace(/preload="metadata"/g, 'preload="auto"');

// --- 3. SMOOTHNESS / JITTER (CSS) ---
if (!css.includes('.gpu-accel')) {
    css += `\n\n/* GPU ACCELERATION & PERFORMANCE */\n.gpu-accel { will-change: transform; transform: translateZ(0); }`;
}
// Add gpu-accel to specific classes in HTML
html = html.replace(/class="city-card (.*?)"/g, 'class="city-card gpu-accel $1"');
html = html.replace(/class="ars-card (.*?)"/g, 'class="ars-card gpu-accel $1"');
html = html.replace(/class="ge-floating-ui"/g, 'class="ge-floating-ui gpu-accel"');

// --- 4. TYPOGRAPHY FOR 85 LAKH+ ---
html = html.replace(
    /,185 Lakhs\+/g,
    '₹85 Lakhs+'
);
html = html.replace(
    /<h2 data-cms="px_val" style="font-family: 'Cormorant Garamond', serif; font-size: clamp\(3\.5rem, 7vw, 7rem\); color: var\(--rf-text\); line-height: 1; margin-bottom: 10px; text-shadow: 0 20px 40px rgba\(0,0,0,0\.8\);">/g,
    `<h2 data-cms="px_val" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 7vw, 7rem); line-height: 1; margin-bottom: 10px; background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));">`
);

// --- 5. GROWTH ENGINE LIGHT THEME VISIBILITY ---
if (!css.includes('/* Growth Engine Light Fix */')) {
    css += `
/* Growth Engine Light Fix */
[data-theme="light"] .growth-engine-section h2,
[data-theme="light"] .growth-engine-section p,
[data-theme="light"] .growth-engine-section span,
[data-theme="light"] .growth-engine-section .ge-feat,
[data-theme="light"] .ge-ui-text h4,
[data-theme="light"] .ge-ui-text span {
    color: #1A1C20 !important;
}
[data-theme="light"] .ge-floating-ui {
    background: rgba(255, 255, 255, 0.95) !important;
    border-color: rgba(0,0,0,0.1) !important;
}
[data-theme="light"] #particle-canvas {
    display: none !important;
}
`;
}

// --- 6. BEFORE/AFTER SLIDER BUG ---
html = html.replace(
    /class="ba-img-after" alt="Modern Converting Design" data-cms="ba_img_after" style="position: absolute;/g,
    'class="ba-img-after" alt="Modern Converting Design" data-cms="ba_img_after" style="user-select: none; pointer-events: none; -webkit-user-drag: none; position: absolute;'
);
html = html.replace(
    /class="ba-img-before" id="baBefore" alt="Old Messy Design" data-cms="ba_img_before" style="position: absolute;/g,
    'class="ba-img-before" id="baBefore" alt="Old Messy Design" data-cms="ba_img_before" style="user-select: none; pointer-events: none; -webkit-user-drag: none; position: absolute;'
);

// --- 7. MOBILE VIEW ADJUSTMENTS ---
// Find the media query and modify it
html = html.replace(
    /padding: 3rem 4% !important;/g,
    'padding: 1.5rem 4% !important;'
);
// We will add specific CSS for mobile growth engine
if (!css.includes('/* Custom Mobile Adjustments */')) {
    css += `
/* Custom Mobile Adjustments */
@media (max-width: 768px) {
    .growth-engine-section {
        margin: 20px 0 !important;
        border-radius: 20px !important;
        padding: 3rem 5% !important;
    }
    .parallax-break {
        width: 100% !important;
        max-width: 100% !important;
        margin: 20px 0 !important;
        border-radius: 20px !important;
    }
    .container {
        padding: 0 15px !important;
    }
}
`;
}

fs.writeFileSync(indexHtmlPath, html);
fs.writeFileSync(cssPath, css);

console.log('Executed Final Polish Script');
