const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];
const cssFile = path.join(baseDir, 'css', 'dark-overhaul.css');

// 1. Universal Header Language (Change across all HTML files)
// 2. Remove footer-fixed from index.html
// 3. Fix services-hero padding
// 4. Update cursor to be bright gold and highly visible
// 5. Fix ROI calculator contrast (remove hardcoded colors, use var(--rf-text))
for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove footer-fixed from index.html
    if (file === 'index.html') {
        const footerRegex = /<footer class="footer-fixed"[\s\S]*?<\/footer>/;
        content = content.replace(footerRegex, '');
        console.log('Removed footer-fixed from index.html');
    }

    // Replace menu text globally
    content = content.replace(/>Growth Engine<\/a>/g, '>Home</a>');
    content = content.replace(/>Our Arsenal<\/a>/g, '>Services</a>');
    content = content.replace(/>Success Vault<\/a>/g, '>Reviews</a>');

    // Fix services-hero padding
    if (file === 'services.html') {
        content = content.replace(/\.services-hero\s*\{/g, '.services-hero { padding-top: 100px; ');
        
        // Remove hardcoded #1A1C20 or #000 for ROI text
        content = content.replace(/color:\s*#1A1C20;/ig, 'color: var(--rf-text);');
        content = content.replace(/color:\s*#000;/ig, 'color: var(--rf-text);');
    }

    if (file === 'reviews.html') {
        content = content.replace(/color:\s*#1A1C20;/ig, 'color: var(--rf-text);');
        content = content.replace(/color:\s*#000;/ig, 'color: var(--rf-text);');
    }

    // Fix Cursor styles across all files (mostly defined in inline styles or style.css)
    // Actually, inline styles in each file:
    content = content.replace(/\.cursor-dot\s*\{\s*position:\s*fixed;[\s\S]*?\}/g, 
        '.cursor-dot { position: fixed; top: 0; left: 0; width: 10px; height: 10px; background: #FFF; border-radius: 50%; pointer-events: none; z-index: 999999; transform: translate(-50%, -50%); transition: background 0.2s, width 0.2s, height 0.2s; box-shadow: 0 0 15px #D4AF37; mix-blend-mode: difference; }'
    );
    content = content.replace(/\.cursor-ring\s*\{\s*position:\s*fixed;[\s\S]*?\}/g, 
        '.cursor-ring { position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 2px solid #D4AF37; border-radius: 50%; pointer-events: none; z-index: 999998; transform: translate(-50%, -50%); transition: width 0.1s, height 0.1s, border-color 0.2s; mix-blend-mode: difference; }'
    );
    
    // Some files might have different inline cursor definitions:
    content = content.replace(/<div class="cursor-dot" id="cursorDot" style="[^"]*"><\/div>/g, 
        '<div class="cursor-dot" id="cursorDot" style="position: fixed; width: 10px; height: 10px; background: #FFF; border-radius: 50%; pointer-events: none; z-index: 999999; transform: translate(-50%, -50%); transition: opacity 0.2s; box-shadow: 0 0 15px #D4AF37; mix-blend-mode: difference;"></div>'
    );
    content = content.replace(/<div class="cursor-ring" id="cursorRing" style="[^"]*"><\/div>/g, 
        '<div class="cursor-ring" id="cursorRing" style="position: fixed; width: 40px; height: 40px; border: 2px solid #D4AF37; border-radius: 50%; pointer-events: none; z-index: 999998; transform: translate(-50%, -50%); transition: width 0.1s, height 0.1s; mix-blend-mode: difference;"></div>'
    );

    fs.writeFileSync(filePath, content);
}
console.log('HTML files patched.');

// 6. Fix Mobile Header CSS & Expand Nuclear CSS
let overhaulCSS = fs.readFileSync(cssFile, 'utf8');

// Replace the previous mobile css fix for `#headerWrap { display: none !important; }`
// with the new logo-only top bar.
const oldMobileFix = `    /* Hide the double top header on mobile */
    #headerWrap { display: none !important; }`;

const newMobileFix = `    /* Transform top header into Logo + Toggle only on mobile */
    #navbar .nav-links, #navbar .nav-btn-wrap { display: none !important; }
    #navbar { width: 100% !important; border-radius: 0 !important; border: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; background: rgba(5,2,10,0.95) !important; padding: 0 20px !important; backdrop-filter: blur(20px) !important; }
    #headerWrap { top: 0 !important; }`;

if (overhaulCSS.includes(oldMobileFix)) {
    overhaulCSS = overhaulCSS.replace(oldMobileFix, newMobileFix);
} else {
    // If it's not exactly that string, let's append it as an override at the end
    overhaulCSS += `\n
@media (max-width: 1024px) {
    #navbar .nav-links, #navbar .nav-btn-wrap { display: none !important; }
    #navbar { width: 100% !important; border-radius: 0 !important; border: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; background: rgba(5,2,10,0.95) !important; padding: 0 20px !important; backdrop-filter: blur(20px) !important; }
    #headerWrap { top: 0 !important; display: flex !important; }
}
`;
}

// Expand nuclear CSS for reviews.html ROI and any other container
overhaulCSS = overhaulCSS.replace(
    /html\[data-theme="dark"\] \.story-section \{/g,
    'html[data-theme="dark"] .story-section,\nhtml[data-theme="dark"] .roi-container,\nhtml[data-theme="dark"] .roi-results,\nhtml[data-theme="dark"] .vault-header,\nhtml[data-theme="dark"] section,\nhtml[data-theme="dark"] div[style*="background: #FFF"],\nhtml[data-theme="dark"] div[style*="background:#FFF"] {'
);

fs.writeFileSync(cssFile, overhaulCSS);
console.log('CSS patches complete.');
