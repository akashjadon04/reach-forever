const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove third section of text
html = html.replace(/<p class="story-p apple-text-reveal" data-cms="story_3"[\s\S]*?<\/p>/, '');

// 2. Change phone number to 8146652870
html = html.replace(/917888429760/g, '918146652870');
html = html.replace(/\+91 76687 58238/g, '+91 81466 52870');

// 3. Make footer black and text white
html = html.replace(/<footer class="premium-footer" style="padding-top: 4rem !important; margin-top: 0 !important; background: var\(--bg-base, #FDFDFB\); border-top: none !important;">/, 
    '<footer class="premium-footer" style="padding-top: 4rem !important; margin-top: 0 !important; background: #05020A; border-top: none !important;">');

// The footer has some hardcoded text colors now due to my previous script. Let's fix them to be light since bg is black.
html = html.replace(/<p>We engineer predictable revenue systems that flood your business with high-ticket local customers.<\/p>/, 
    '<p style="color: #A0A0A0">We engineer predictable revenue systems that flood your business with high-ticket local customers.</p>');

// "Reach Forever HQ" should be white.
html = html.replace(/<strong style="color:var\(--text-dark, #1A1C20\)">Reach Forever HQ<\/strong>/g, 
    '<strong style="color:#FFF">Reach Forever HQ</strong>');

// Change text colors in footer headings to white.
// .pf-col h4{color:var(--text-dark, #1A1C20); ...} -> .pf-col h4{color:#FFF; ...}
// I will just add an inline style to the footer section or overwrite it.
html = html.replace(/<div class="pf-container">/, '<div class="pf-container" style="color: #A0A0A0;">');
html = html.replace(/<h4>Sitemap<\/h4>/, '<h4 style="color:#FFF;">Sitemap</h4>');
html = html.replace(/<h4>Legal & Contact<\/h4>/, '<h4 style="color:#FFF;">Legal & Contact</h4>');
html = html.replace(/<div style="margin-top:20px;color:var\(--text-muted, #6B7280\);font-size:.9rem;line-height:1.6">/, '<div style="margin-top:20px;color:#A0A0A0;font-size:.9rem;line-height:1.6">');

// 4. "Revenue Generated This Quarter" is dark, make it white.
html = html.replace(/<p style="font-family:'Outfit',sans-serif;font-size:clamp\(\.75rem,2.5vw,1.2rem\);font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var\(--text-dark, #1A1C20\);text-shadow:0 10px 20px rgba\(0,0,0,\.8\)">Revenue Generated This Quarter<\/p>/, 
    '<p style="font-family:\'Outfit\',sans-serif;font-size:clamp(.75rem,2.5vw,1.2rem);font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FFF;text-shadow:0 10px 20px rgba(0,0,0,.8)">Revenue Generated This Quarter</p>');

// Also change the h2 text "Before vs After." just to be sure it looks good. It was `#1A1C20` but there was a section background `#FDFDFB`. Wait, the user said "dont also make it empty empty...".
// I'll add a subtle radial gradient to the `.blueprint-section` and `.reels-section`.
html = html.replace(/<section class="blueprint-section">/, '<section class="blueprint-section" style="background: radial-gradient(circle at top right, rgba(212,175,55,0.05), transparent 50%);">');
html = html.replace(/<section class="reels-section section-pad" id="proof" style="background:var\(--bg-base, #FDFDFB\);/, '<section class="reels-section section-pad" id="proof" style="background:var(--bg-base, #FDFDFB); background-image: radial-gradient(circle at bottom left, rgba(144,71,255,0.03), transparent 40%);');

// 5. Fix video modal click
// Replace the iphoneClickLayer div to include onclick directly
html = html.replace(/<div class="iphone-click-layer" id="iphoneClickLayer" style="position:absolute;inset:0;z-index:30;cursor:pointer;border-radius:34px"><\/div>/, 
    `<div class="iphone-click-layer" id="iphoneClickLayer" style="position:absolute;inset:0;z-index:30;cursor:pointer;border-radius:34px" onclick="openReelsModal()"></div>`);

// Also add openReelsModal function inside the main script tag
const openReelsModalFunc = `
window.openReelsModal = function() {
    const rm = document.getElementById('reelsModal');
    if(rm){
        document.body.style.overflow='hidden';
        rm.style.opacity='1'; rm.style.pointerEvents='auto';
        const hv = document.getElementById('heroVideoAd'); if(hv) hv.pause();
        const fv = document.querySelector('#rmModalContainer .rm-video');
        if(fv){ fv.muted=false; fv.play().catch(()=>{}); }
        if(window.triggerHaptic) window.triggerHaptic(60);
    }
};
`;
// Put it right before triggerIsland function
html = html.replace(/function triggerIsland\(/, openReelsModalFunc + '\nfunction triggerIsland(');

// Now remove the duplicate event listener from the bottom script
html = html.replace(/const iphoneLayer = document\.getElementById\('iphoneClickLayer'\);\s*if\(iphoneLayer\)\{\s*iphoneLayer\.addEventListener\('click',\(\)=>\{[\s\S]*?\}\);\s*\}/, '');


fs.writeFileSync('public/index.html', html);
console.log('Fixes applied to index.html.');
