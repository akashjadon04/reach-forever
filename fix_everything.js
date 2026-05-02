const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix Hero Grid and Container on all breakpoints
html = html.replace(/<div class="container hero-grid"[^>]+>/, '<div class="container hero-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; width: 100%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; align-items: center;">');

// 2. Fix Hero Text width and alignment
html = html.replace(/<div class="hero-text" id="hero-text-module" style="[^"]+">/, '<div class="hero-text" id="hero-text-module" style="position: relative; z-index: 5; width: 100%; display: flex; flex-direction: column; align-items: flex-start; text-align: left;">');

// Remove conflicting CSS in media queries
html = html.replace(/\.hero-text \{ margin: 0 auto; display: flex; flex-direction: column; align-items: flex-start; \}/g, '');
html = html.replace(/\.hero-text \{ margin: 0 auto; display: flex; flex-direction: column; align-items: center; \}/g, '');
html = html.replace(/\.hero-grid \{ grid-template-columns: 1fr !important; text-align: left; gap: 30px !important; \}/g, '.hero-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 40px !important; }');
html = html.replace(/\.hero-grid \{ grid-template-columns: 1fr !important; text-align: center; gap: 50px !important; \}/g, '.hero-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 40px !important; }');

// 3. Fix Logo Fallback using SVG data URI within onerror
const currentLogoRegex = /<img src="https:\/\/agency-resources\.zyrova\.com[^>]+>/;
const newLogoHTML = `<img src="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png" alt="Reach Forever Logo" data-cms="header_logo" style="filter: brightness(0) invert(1); max-height: 45px; width: auto; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 250 50\\'><text x=\\'0\\' y=\\'35\\' fill=\\'%23FFF\\' font-family=\\'Cormorant Garamond, serif\\' font-size=\\'34px\\' font-weight=\\'bold\\'>ReachForever.</text></svg>';">`;
// also remove the span we added previously
html = html.replace(/<img src="https:\/\/agency-resources\.zyrova\.com[^>]+>\s*<span style="display: none;[^>]+>ReachForever\.<\/span>/, newLogoHTML);

// 4. Restore the Hologram Glow properly
// First remove any existing background from hero-visuals
html = html.replace(/<div class="hero-visuals reveal-up" style="([^"]+) background: radial-gradient\([^;]+\); border-radius: 50%;">/, '<div class="hero-visuals reveal-up" style="$1">');
// Re-inject the glow div inside hero-visuals before iphone-mockup
const glowDiv = `<div class="hologram-glow" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 180%; height: 120%; background: radial-gradient(circle at center, rgba(144, 71, 255, 0.7) 0%, transparent 60%); filter: blur(60px); z-index: -1; pointer-events: none; mix-blend-mode: screen;"></div>\n`;
html = html.replace(/<div class="iphone-mockup hover-video" id="heroIphoneScroll"/, glowDiv + '<div class="iphone-mockup hover-video" id="heroIphoneScroll"');

// 5. Fix Mobile Nav and AI Fab Overlap robustly
html = html.replace(/<div class="ai-fab-wrap magnetic-wrap" style="position: fixed; bottom: 100px; right: 20px;/g, '<div class="ai-fab-wrap magnetic-wrap" style="position: fixed; bottom: 100px; right: 20px; z-index: 10001;');
html = html.replace(/<div class="chat-panel" id="auraPanel" aria-hidden="true" style="position: fixed; bottom: 180px; right: 20px;/g, '<div class="chat-panel" id="auraPanel" aria-hidden="true" style="position: fixed; bottom: 180px; right: 20px; z-index: 10002;');

// Replace fixed video background in hero with a working fallback if 403 occurs
const videoTagRegex = /<video class="active rm-video" autoplay loop muted playsinline id="heroVideoAd"([^>]+)>/;
html = html.replace(videoTagRegex, `<video class="active rm-video" autoplay loop muted playsinline id="heroVideoAd"$1 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">`);
// Add a fallback image after video
html = html.replace(/<\/video>\s*<div class="iphone-ui"/, `</video>\n<img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&q=80" style="display: none; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; border-radius: 34px;" alt="Fallback">\n<div class="iphone-ui"`);

// Final verification of mobile-nav CSS
const mobileNavCSS = `.mobile-nav { z-index: 10000; position: fixed; bottom: 0; width: 100%; background: rgba(15, 8, 25, 0.85); backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.08); }`;
if(!html.includes('z-index: 10000; position: fixed; bottom: 0;')) {
    html = html.replace(/<style>/, `<style>\n${mobileNavCSS}\n`);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Final fixes successfully applied.');
