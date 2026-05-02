const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// ============================================================
// SAFE INLINE STYLE COLOR REPLACEMENTS
// These only touch color values inside style="..." attributes
// They do NOT touch any data-cms, ids, classes, or JS hooks
// ============================================================

// 1. Theme color meta
html = html.replace(/<meta name="theme-color" content="#0A0B0E">/, '<meta name="theme-color" content="#05020A">');

// 2. Background colors — light to dark
html = html.replace(/background-color: #FDFDFB;/g, 'background-color: #05020A;');
html = html.replace(/background-color: var\(--bg-base\);/g, 'background-color: #05020A;');
html = html.replace(/background: #FDFDFB;/g, 'background: #05020A;');
html = html.replace(/background: #F4F4F0;/g, 'background: #05020A;');
html = html.replace(/background: #0A0B0E;/g, 'background: #05020A;');

// 3. Text colors — dark to light
html = html.replace(/color: #1A1C20;/g, 'color: #FFF;');
html = html.replace(/color: #6B7280;/g, 'color: #B0B0C0;');

// 4. Navbar glassmorphism (inline style on nav element)
html = html.replace(
    /background: rgba\(253, 253, 251, 0\.85\); backdrop-filter: blur\(35px\); border-radius: 100px; border: 1px solid #D4AF37; box-shadow: 0 0 20px rgba\(212, 175, 55, 0\.4\), inset 0 0 15px rgba\(212, 175, 55, 0\.1\);/g,
    'background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px); border-radius: 100px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 0 20px rgba(144, 71, 255, 0.4);'
);

// 5. Buttons — olive to neon purple gradient  
html = html.replace(/background: #556B2F; color: #FFF;/g, 'background: linear-gradient(135deg, #9047FF, #00D1FF); color: #FFF;');
html = html.replace(/box-shadow: 0 10px 25px rgba\(85, 107, 47, 0\.25\);/g, 'box-shadow: 0 10px 25px rgba(144, 71, 255, 0.4);');

// 6. Olive accent color references
html = html.replace(/color: #556B2F;/g, 'color: #00D1FF;');
html = html.replace(/#556B2F/g, '#9047FF');

// 7. Scroll progress bar
html = html.replace(
    /linear-gradient\(90deg, #556B2F, #D4AF37\)/g,
    'linear-gradient(90deg, #9047FF, #00D1FF)'
);
html = html.replace(/rgba\(212,175,55,0\.5\)/g, 'rgba(144,71,255,0.5)');

// 8. Tag pills / hero tag — white bg to glass  
html = html.replace(
    /background: #FFF; border: 1px solid rgba\(212,175,55,0\.4\);/g,
    'background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08);'
);

// 9. Hero social floats
html = html.replace(
    /background: rgba\(255,255,255,0\.95\); backdrop-filter: blur\(20px\); border: 1px solid rgba\(212,175,55,0\.4\);/g,
    'background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08);'
);

// 10. Review indicator  
html = html.replace(
    /background: rgba\(255,255,255,0\.95\); backdrop-filter: blur\(10px\);/g,
    'background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px);'
);

// 11. Border-left on hero desc
html = html.replace(/border-left: 3px solid #D4AF37;/g, 'border-left: 3px solid #9047FF;');
html = html.replace(/border-left: 3px solid var\(--accent-gold\);/g, 'border-left: 3px solid #9047FF;');

// 12. Chatbot inline styles
html = html.replace(
    /linear-gradient\(135deg, #556B2F 0%, #435525 100%\)/g,
    'linear-gradient(135deg, #9047FF 0%, #00D1FF 100%)'
);
html = html.replace(
    /background: #FFFFFF; border: 1px solid rgba\(0,0,0,0\.06\);/g,
    'background: rgba(15, 8, 25, 0.7); border: 1px solid rgba(255,255,255,0.08);'
);

// 13. Gold border references to neon purple  
html = html.replace(/rgba\(212, 175, 55, 0\.4\)/g, 'rgba(144, 71, 255, 0.4)');
html = html.replace(/rgba\(212,175,55,0\.4\)/g, 'rgba(144,71,255,0.4)');

// 14. Cursor dot/ring
html = html.replace(/background: #556B2F;/g, 'background: #9047FF;');
html = html.replace(/border: 1px solid #556B2F;/g, 'border: 1px solid #9047FF;');

// 15. Logo — add invert filter
html = html.replace(
    /<img src="https:\/\/agency-resources\.zyrova\.com\/reachforever\/ReachForever_Illustrative_Logo_8K\.png" alt="Reach Forever Logo" data-cms="header_logo" style="/,
    '<img src="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png" alt="Reach Forever Logo" data-cms="header_logo" onerror="this.onerror=null; this.style.display=\'none\'; this.nextElementSibling.style.display=\'inline-block\';" style="filter: brightness(0) invert(1); '
);
// Add fallback text logo after the img tag  
html = html.replace(
    /data-cms="header_logo" onerror="[^"]*" style="filter: brightness\(0\) invert\(1\); max-height: 45px; width: auto; object-fit: contain;">/,
    (match) => match + '\n<span style="display: none; font-family: \'Cormorant Garamond\', serif; font-size: 1.8rem; font-weight: 700; color: #FFF; letter-spacing: 1px; text-shadow: 0 0 10px rgba(144, 71, 255, 0.5);">ReachForever.</span>'
);

// 16. Section backgrounds that use var() but are inline  
html = html.replace(/background: var\(--bg-elevated\);/g, 'background: #05020A;');
html = html.replace(/background: var\(--bg-dark\);/g, 'background: #05020A;');
html = html.replace(/background: var\(--bg-surface\);/g, 'background: #05020A;');

// 17. Radar section - radial gradient container
html = html.replace(
    /background: radial-gradient\(circle at center, #F8F7F4 0%, #FFFFFF 100%\);/g,
    'background: radial-gradient(circle at center, #0F0819 0%, #05020A 100%);'
);
html = html.replace(
    /rgba\(212, 175, 55, 0\.2\) 1px/g,
    'rgba(144, 71, 255, 0.15) 1px'
);

// 18. City cards
html = html.replace(
    /background: rgba\(255,255,255,0\.9\); backdrop-filter: blur\(20px\); border: 1px solid rgba\(212, 175, 55, 0\.5\);/g,
    'background: rgba(15, 8, 25, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(144, 71, 255, 0.3);'
);

// 19. GE floating UI  
html = html.replace(
    /background: rgba\(10, 11, 14, 0\.85\); backdrop-filter: blur\(20px\); border: 1px solid rgba\(212, 175, 55, 0\.4\);/g,
    'background: rgba(15, 8, 25, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(144, 71, 255, 0.4);'
);

// 20. GE icon  
html = html.replace(
    /background: rgba\(85, 107, 47, 0\.2\); color: #556B2F;/g,
    'background: rgba(144, 71, 255, 0.2); color: #9047FF;'
);

// 21. Rush section radial gradient  
html = html.replace(
    /rgba\(212, 175, 55, 0\.15\)/g,
    'rgba(144, 71, 255, 0.15)'
);

// 22. Before/After labels
html = html.replace(
    /background: rgba\(255,255,255,0\.95\); padding: 12px 25px/g,
    'background: rgba(15, 8, 25, 0.7); padding: 12px 25px'
);

// 23. Sticky CTA
html = html.replace(
    /background: rgba\(255,255,255,0\.95\); backdrop-filter: blur\(20px\); border: 1px solid rgba\(212, 175, 55, 0\.4\);/g,
    'background: rgba(15, 8, 25, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08);'
);

// 24. Service cards — white bg to glass  
html = html.replace(
    /background: #FFF; border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba\(0,0,0,0\.05\); border: 1px solid rgba\(0,0,0,0\.05\);/g,
    'background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08);'
);

// 25. Mobile nav glassmorphism
html = html.replace(
    /<div class="mobile-nav">/,
    '<div class="mobile-nav" style="background: rgba(15, 8, 25, 0.85) !important; backdrop-filter: blur(20px) !important; border-top: 1px solid rgba(255,255,255,0.08) !important;">'
);

// 26. Chatbot body bg
html = html.replace(/background: var\(--bg-base\)/g, 'background: #05020A');

// 27. Text color on story scroll text
html = html.replace(
    /background: linear-gradient\(to right, var\(--text-dark\) 50%, rgba\(0,0,0,0\.1\) 50%\)/g,
    'background: linear-gradient(to right, #FFFFFF 50%, rgba(255,255,255,0.1) 50%)'
);
html = html.replace(
    /background: linear-gradient\(to right, #1A1C20 50%, rgba\(0,0,0,0\.1\) 50%\)/g,
    'background: linear-gradient(to right, #FFFFFF 50%, rgba(255,255,255,0.1) 50%)'
);

// 28. Preloader  
html = html.replace(/background: var\(--bg-base\)/g, 'background: #05020A');

// 29. Footer  
html = html.replace(
    /background: var\(--bg-dark\); color: var\(--text-light\)/g,
    'background: #05020A; color: #FFF'
);

console.log('Inline style overhaul complete. No HTML structure, data-cms, or JS hooks were touched.');
fs.writeFileSync(filePath, html, 'utf8');
