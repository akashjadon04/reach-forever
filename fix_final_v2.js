const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];
const cssFile = path.join(baseDir, 'css', 'dark-overhaul.css');

// 1. Mobile Logo Floating Fix
let cssContent = fs.readFileSync(cssFile, 'utf8');

const oldNavbarCss = `#navbar { width: 100% !important; border-radius: 0 !important; border: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; background: rgba(5,2,10,0.95) !important; padding: 0 20px !important; backdrop-filter: blur(20px) !important; }`;
const newNavbarCss = `#navbar { width: 100% !important; border-radius: 0 !important; border: none !important; background: transparent !important; padding: 0 20px !important; box-shadow: none !important; backdrop-filter: none !important; }`;

if (cssContent.includes(oldNavbarCss)) {
    cssContent = cssContent.replace(oldNavbarCss, newNavbarCss);
} else {
    cssContent += `\n@media (max-width: 1024px) { #navbar { background: transparent !important; border: none !important; box-shadow: none !important; backdrop-filter: none !important; } }`;
}

// 2. Vibrant Calculate Your Growth ROI Graphic CSS
const roiDynamicCss = `
/* ==========================================================================
   DYNAMIC VIBRANT ROI CALCULATOR GRAPHICS
   ========================================================================== */
html[data-theme="light"] .roi-slider { background: #E0E0E0 !important; border-color: #D0D0D0 !important; }
html[data-theme="light"] .roi-slider::-webkit-slider-thumb { background: #25D366 !important; border-color: #0A66C2 !important; box-shadow: 0 4px 15px rgba(37,211,102,0.5) !important; }
html[data-theme="light"] .roi-results { background: #FFFFFF !important; border: 1px solid #EAEAEA !important; box-shadow: 0 10px 40px rgba(0,0,0,0.05) !important; }
html[data-theme="light"] .result-row span { color: #25D366 !important; font-weight: bold; }

html[data-theme="dark"] .roi-slider { background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.05) !important; }
html[data-theme="dark"] .roi-slider::-webkit-slider-thumb { background: #D4AF37 !important; border-color: #FFF !important; box-shadow: 0 4px 20px rgba(212,175,55,0.5) !important; }
html[data-theme="dark"] .roi-results { background: rgba(15,8,25,0.9) !important; border: 1px solid rgba(255,255,255,0.1) !important; box-shadow: 0 10px 40px rgba(0,0,0,0.3) !important; }
html[data-theme="dark"] .result-row span { color: #D4AF37 !important; font-weight: bold; }
`;

if (!cssContent.includes('DYNAMIC VIBRANT ROI CALCULATOR GRAPHICS')) {
    cssContent += roiDynamicCss;
}

fs.writeFileSync(cssFile, cssContent);

for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Default to dark explicitly
    content = content.replace(/<html lang="en">/g, '<html lang="en" data-theme="dark">');

    // Fix services hero overlap
    if (file === 'services.html') {
        content = content.replace(/\.services-hero\s*\{\s*padding-top:\s*100px;/g, '.services-hero { padding-top: 180px !important;');
    }

    // Inject data-cms="header_logo" into premium-footer
    const footerLogoRegex = /<img src="https:\/\/agency-resources\.zyrova\.com\/reachforever\/ReachForever_Illustrative_Logo_8K\.png" alt="Reach Forever">/g;
    const newFooterLogo = '<img src="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png" alt="Reach Forever" data-cms="header_logo">';
    content = content.replace(footerLogoRegex, newFooterLogo);

    // Scrub hardcoded white text specifically in index.html (and generally across others where safe)
    // Target common inline styles used for headings
    content = content.replace(/color:\s*#FFF;/g, 'color: var(--rf-text);');
    content = content.replace(/color:\s*#FFFFFF;/g, 'color: var(--rf-text);');

    // Revert the crucial things that MUST remain white
    content = content.replace(/class="btn-olive"[^>]*style="[^"]*color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/class="btn btn-olive"[^>]*style="[^"]*color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/\.btn-olive\s*\{[\s\S]*?color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/\.wa-float\s*\{[\s\S]*?color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/\.msg\.user\s*\{[\s\S]*?color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/\.msg\.ai\s*\{[\s\S]*?color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/\.pl-logo\s*\{[\s\S]*?color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/\.sc-text\s*\[data-cms="sticky_cta_text"\][^>]*color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF'));
    content = content.replace(/background:\s*#25D366;\s*color:\s*var\(--rf-text\);/g, 'background: #25D366; color: #FFF;'); // WA Float inline
    content = content.replace(/background:\s*linear-gradient\([^)]*\);\s*color:\s*var\(--rf-text\);/g, match => match.replace('var(--rf-text)', '#FFF')); // Buttons inline
    
    // Specifically fix rgba(255,255,255,0.7) to var(--rf-muted) in index.html ge-text p
    content = content.replace(/\.ge-text\s*p\s*\{[\s\S]*?color:\s*rgba\(255,255,255,0\.7\);/g, match => match.replace('rgba(255,255,255,0.7)', 'var(--rf-muted)'));
    content = content.replace(/\.ge-ui-text\s*h4\s*\{[\s\S]*?color:\s*rgba\(255,255,255,0\.7\);/g, match => match.replace('rgba(255,255,255,0.7)', 'var(--rf-muted)'));

    // Clean duplicate initThemeToggle from reviews.html
    if (file === 'reviews.html') {
        const occurrences = content.split('function initThemeToggle() {');
        if (occurrences.length > 2) {
            let newContent = occurrences[0];
            newContent += 'function initThemeToggle() {' + occurrences[1];
            let remainder = occurrences[2].replace(/[\s\S]*?<\/script>/, '</script>');
            content = newContent + remainder;
            console.log('Cleaned up duplicated script in reviews.html');
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`Patched ${file}`);
}
