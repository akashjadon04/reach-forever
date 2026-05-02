const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Mobile Overlap Fixes
const mobileCssFixes = `
            /* Fix AI Fab & Mobile Nav */
            .main-wrapper { padding-bottom: 120px !important; border-bottom-left-radius: 30px !important; border-bottom-right-radius: 30px !important; }
            .ai-fab-wrap { bottom: 100px !important; right: 20px !important; }
            .mobile-nav { background: rgba(15, 8, 25, 0.8) !important; backdrop-filter: blur(20px) !important; border-top: 1px solid rgba(255,255,255,0.08) !important; z-index: 10000 !important; }
            .hero-grid { grid-template-columns: 1fr !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
            .hero { padding-top: 100px !important; }
`;
html = html.replace(/\.main-wrapper \{ border-bottom-left-radius: 30px !important; border-bottom-right-radius: 30px !important; \}/, mobileCssFixes);

// 2. Logo Bug Fix
const oldLogo = /<img src="https:\/\/agency-resources\.zyrova\.com\/reachforever\/ReachForever_Illustrative_Logo_8K\.png"[^>]+data-cms="header_logo"[^>]+>/;
const newLogo = `<span data-cms="header_logo" style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; color: #FFF; letter-spacing: 1px; text-shadow: 0 0 10px rgba(144, 71, 255, 0.5);">ReachForever.</span>`;
html = html.replace(oldLogo, newLogo);

// 3. Hologram Glow Fix & Hero Shift Fix
// Remove old injected glow div
const oldGlowDiv = /<div style="position: absolute; top: 50%; left: 50%; transform: translate\(-50%, -50%\); width: 140%; height: 140%; background: radial-gradient\(circle, rgba\(144,71,255,0\.4\) 0%, transparent 60%\); filter: blur\(40px\); z-index: 1; pointer-events: none; mix-blend-mode: screen;"><\/div>/;
html = html.replace(oldGlowDiv, '');

// Apply background to hero-visuals
const heroVisualsRegex = /<div class="hero-visuals reveal-up" style="(.*?)">/;
html = html.replace(heroVisualsRegex, (match, styles) => {
    // Add radial gradient background to hero-visuals
    return `<div class="hero-visuals reveal-up" style="${styles}; background: radial-gradient(circle at center, rgba(144, 71, 255, 0.5) 0%, transparent 70%); border-radius: 50%;">`;
});

// Remove width: 280px constraint from iphone mockup on mobile via style block if needed, but flex-shrink is 0. 
// Just ensure hero-text aligns properly.
const heroTextRegex = /<div class="hero-text" id="hero-text-module" style="(.*?)">/;
html = html.replace(heroTextRegex, (match, styles) => {
    return `<div class="hero-text" id="hero-text-module" style="${styles}; width: 100%;">`;
});

// 4. Footer Layout
const footerRegex = /<footer class="footer-fixed" id="contact" style="(.*?)height: 85vh;(.*?)padding: 0 5%;(.*?)">/;
html = html.replace(footerRegex, (match, p1, p2, p3) => {
    return `<footer class="footer-fixed" id="contact" style="${p1}min-height: 85vh; height: auto;${p2}padding: 60px 5%;${p3}">`;
});

// 5. Button Shadows Fix (Replacing any remaining gold shadows with purple)
html = html.replace(/rgba\(212, 175, 55, 0\.4\)/g, 'rgba(144, 71, 255, 0.4)');
html = html.replace(/rgba\(212,175,55,0\.4\)/g, 'rgba(144,71,255,0.4)');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Layout fixes applied successfully.');
