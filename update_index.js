const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Theme colors and globals
html = html.replace(/<meta name="theme-color" content="#0A0B0E">/, '<meta name="theme-color" content="#05020A">');
html = html.replace(/background-color: #FDFDFB;/g, 'background-color: #05020A;');
html = html.replace(/background: #F4F4F0;/g, 'background: #05020A;');
html = html.replace(/background: #FDFDFB;/g, 'background: #05020A;');
html = html.replace(/background: var\(--bg-dark\);/g, 'background: #05020A; border: 1px solid rgba(255,255,255,0.08);');
html = html.replace(/background: #0A0B0E;/g, 'background: #05020A;');

// 2. Glassmorphism
const glassCSS = 'background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08);';

// Navbar
html = html.replace(/background: rgba\(253, 253, 251, 0.85\); backdrop-filter: blur\(35px\); border-radius: 100px; border: 1px solid #D4AF37; box-shadow: 0 0 20px rgba\(212, 175, 55, 0.4\), inset 0 0 15px rgba\(212, 175, 55, 0.1\);/, `${glassCSS} border-radius: 100px; box-shadow: 0 0 20px rgba(144, 71, 255, 0.4);`);

// Nav links color
html = html.replace(/color: #1A1C20; font-family: 'Outfit'/g, "color: #FFF; font-family: 'Outfit'");

// Hero tags & text
html = html.replace(/background: #FFF; border: 1px solid rgba\(212,175,55,0.4\);(.*?)color: #556B2F;/g, `${glassCSS}$1color: #00D1FF;`);
html = html.replace(/color: #1A1C20;/g, "color: #FFF;");
html = html.replace(/color: #6B7280;/g, "color: #E5E7EB;");
html = html.replace(/border-left: 3px solid #D4AF37;/g, "border-left: 3px solid #9047FF;");

// Buttons (Olive -> Neon)
html = html.replace(/background: #556B2F; color: #FFF;(.*?)box-shadow: 0 10px 25px rgba\(85, 107, 47, 0.25\);/g, `background: linear-gradient(135deg, #9047FF, #00D1FF); color: #FFF;$1box-shadow: 0 10px 25px rgba(144, 71, 255, 0.4);`);
// Catch other buttons
html = html.replace(/background: #556B2F; color: #FFF;/g, `background: linear-gradient(135deg, #9047FF, #00D1FF); color: #FFF; border: none;`);

// Social Floats
html = html.replace(/background: rgba\(255,255,255,0.95\); backdrop-filter: blur\(20px\); border: 1px solid rgba\(212,175,55,0.4\);/g, glassCSS);

// Review indicator
html = html.replace(/background: rgba\(255,255,255,0.95\); backdrop-filter: blur\(10px\);(.*?)border: 1px solid rgba\(212, 175, 55, 0.4\);/, `${glassCSS}$1`);

// Cards
html = html.replace(/background: #FFF; border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba\(0,0,0,0.05\); border: 1px solid rgba\(0,0,0,0.05\);/g, `${glassCSS} border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);`);
html = html.replace(/background: #FFF; border-radius: 24px; padding: 25px; display: flex; align-items: center; gap: 15px; box-shadow: 0 10px 30px rgba\(0,0,0,0.04\);/g, `${glassCSS} border-radius: 24px; padding: 25px; display: flex; align-items: center; gap: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);`);

// 3. Neon Accents & Chatbot & Scroll
html = html.replace(/linear-gradient\(90deg, #556B2F, #D4AF37\)/g, "linear-gradient(90deg, #9047FF, #00D1FF)");
html = html.replace(/linear-gradient\(135deg, #556B2F 0%, #435525 100%\)/g, "linear-gradient(135deg, #9047FF 0%, #00D1FF 100%)");
html = html.replace(/linear-gradient\(135deg, #556B2F 0%, #D4AF37 100%\)/g, "linear-gradient(135deg, #9047FF 0%, #00D1FF 100%)");
html = html.replace(/rgba\(85, 107, 47,/g, "rgba(144, 71, 255,");
html = html.replace(/#556B2F/g, "#9047FF");

// 4. Logo Bug Fix
html = html.replace(/<img src="https:\/\/agency-resources\.zyrova\.com\/reachforever\/ReachForever_Illustrative_Logo_8K\.png" alt="Reach Forever Logo" data-cms="header_logo" style="/, `<img src="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png" alt="Reach Forever Logo" data-cms="header_logo" style="filter: brightness(0) invert(1); `);

// 5. Mobile Max-width: 768px fixes
html = html.replace(/grid-template-columns: repeat\(2, 1fr\) !important;/g, "grid-template-columns: 1fr !important;");
html = html.replace(/grid-template-columns: repeat\(4, 1fr\) !important;/g, "grid-template-columns: 1fr !important;");
html = html.replace(/\.ars-container \{\s*grid-template-columns: 1fr !important;\s*gap: 10px !important;\s*\}/, ".ars-container { grid-template-columns: 1fr !important; gap: 30px !important; }");
html = html.replace(/\.s2-social-grid \{ grid-template-columns: 1fr !important; gap: 5px !important; \}/, ".s2-social-grid { grid-template-columns: 1fr !important; gap: 15px !important; }");
html = html.replace(/\.s2-social-card \{ padding: 8px !important; flex-direction: column !important; justify-content: center !important; gap: 5px !important;\}/, ".s2-social-card { padding: 15px !important; flex-direction: row !important; justify-content: flex-start !important; gap: 15px !important;}");
html = html.replace(/\.s2-social-card span \{ display: none !important; \}/, ".s2-social-card span { display: inline-block !important; }");

// 6. Omnipresent Hologram Glow
const hologramGlow = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 140%; height: 140%; background: radial-gradient(circle, rgba(144,71,255,0.4) 0%, transparent 60%); filter: blur(40px); z-index: 1; pointer-events: none; mix-blend-mode: screen;"></div>`;
html = html.replace(/<div class="iphone-mockup hover-video" id="heroIphoneScroll"/, hologramGlow + '\n<div class="iphone-mockup hover-video" id="heroIphoneScroll"');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Update complete');
