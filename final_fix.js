const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix Hero Shift (Force Left Alignment on Desktop)
// Find the hero-text-module
html = html.replace(/<div class="hero-text" id="hero-text-module" style="([^"]+)">/, (match, styles) => {
    // Remove conflicting display/align properties if any, then force left alignment
    let cleanStyles = styles.replace(/width: 100%;/g, '').replace(/text-align:[^;]+;/g, '').replace(/display:[^;]+;/g, '').replace(/flex-direction:[^;]+;/g, '').replace(/align-items:[^;]+;/g, '');
    return `<div class="hero-text" id="hero-text-module" style="${cleanStyles} width: 100%; text-align: left; display: flex; flex-direction: column; align-items: flex-start;">`;
});

// Remove centering from mobile media queries that might be affecting desktop if breakpoints are weird
html = html.replace(/\.hero-text \{ margin: 0 auto; display: flex; flex-direction: column; align-items: center; \}/g, '.hero-text { margin: 0 auto; display: flex; flex-direction: column; align-items: flex-start; }');
html = html.replace(/\.hero-actions \{ justify-content: center; \}/g, '.hero-actions { justify-content: flex-start; }');

// 2. Fix Mobile Navigation & AI Fab Overlap
// We will change the inline styles directly to avoid !important conflicts
html = html.replace(/<div class="ai-fab-wrap magnetic-wrap" style="position: fixed; bottom: 40px; right: 40px;/g, '<div class="ai-fab-wrap magnetic-wrap" style="position: fixed; bottom: 100px; right: 20px;');
html = html.replace(/<div class="chat-panel" id="auraPanel" aria-hidden="true" style="position: fixed; bottom: 130px; right: 40px;/g, '<div class="chat-panel" id="auraPanel" aria-hidden="true" style="position: fixed; bottom: 180px; right: 20px;');

// Hide mobile nav on desktop cleanly
html = html.replace(/<div class="mobile-nav">/g, '<div class="mobile-nav" style="z-index: 10000; position: fixed; bottom: 0; width: 100%; background: rgba(15, 8, 25, 0.85); backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.08);">');

// 3. Fix Logo Fallback (Restore img tag with error handler)
const brokenLogoText = /<span data-cms="header_logo"[^>]+>ReachForever\.<\/span>/;
const fallbackLogo = `<img src="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png" alt="Reach Forever Logo" data-cms="header_logo" style="filter: brightness(0) invert(1); max-height: 45px; width: auto; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
                        <span style="display: none; font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; color: #FFF; letter-spacing: 1px; text-shadow: 0 0 10px rgba(144, 71, 255, 0.5);">ReachForever.</span>`;
html = html.replace(brokenLogoText, fallbackLogo);

// 4. Ensure Hero Grid is strictly single column on mobile
html = html.replace(/\.hero-grid \{ grid-template-columns: 1fr !important; text-align: center; gap: 50px !important; \}/g, '.hero-grid { grid-template-columns: 1fr !important; text-align: left; gap: 30px !important; }');

// 5. Enhance Hologram Effect in Hero Visuals
html = html.replace(/<div class="hero-visuals reveal-up" style="display: flex; justify-content: center; align-items: center; width: 100%; position: relative; perspective: 1500px; z-index: 10;(.*?)">/, `<div class="hero-visuals reveal-up" style="display: flex; justify-content: center; align-items: center; width: 100%; position: relative; perspective: 1500px; z-index: 10; background: radial-gradient(circle at center, rgba(144, 71, 255, 0.6) 0%, transparent 60%); border-radius: 50%;">`);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Final fixes applied successfully.');
