const fs = require('fs');
const path = require('path');

const filesToClean = ['public/services.html', 'public/reviews.html', 'public/form.html', 'public/index.html'];

for (const file of filesToClean) {
    const p = path.join(__dirname, file);
    if (!fs.existsSync(p)) continue;
    let content = fs.readFileSync(p, 'utf8');

    // 1. Remove obsolete scripts globally
    content = content.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/lenis@.*?"><\/script>/g, '');
    content = content.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/vanilla-tilt.*?"><\/script>/g, '');
    content = content.replace(/<script src="https:\/\/unpkg\.com\/splitting.*?"><\/script>/g, '');
    content = content.replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/splitting.*?">/g, '');

    // 2. Remove inline CMS blocks and Theme Toggle completely
    content = content.replace(/\/\*[\s\S]*?CMS ENGINE DB CALL[\s\S]*?(?=<\/script>)/g, '');
    content = content.replace(/\/\*[\s\S]*?THEME TOGGLE ENGINE[\s\S]*?(?=\/\*|$)/g, '');
    content = content.replace(/\/\*[\s\S]*?THEME TOGGLE[\s\S]*?(?=\/\*|<\/script>)/g, '');
    content = content.replace(/\/\*[\s\S]*?CMS ENGINE\s*[-?]*\s*Never triggers island[\s\S]*?(?=<\/script>)/g, '');
    
    // Also remove the standalone initThemeToggle calls if they remain
    content = content.replace(/function initThemeToggle[\s\S]*?initThemeToggle\(\);/g, '');
    content = content.replace(/\(function initThemeToggle[\s\S]*?\}\)\(\);/g, '');
    
    // 3. Remove inline Lenis / Smooth scroll init blocks
    content = content.replace(/\/\*[\s\S]*?1\. LENIS SMOOTH SCROLL[\s\S]*?(?=\/\*|<\/script>)/g, '');

    // 4. Ensure cms.js is included
    if (!content.includes('js/cms.js')) {
        content = content.replace('</body>', '  <script src="js/cms.js" defer></script>\n</body>');
    }

    // 5. Index.html specifics
    if (file === 'public/index.html') {
        content = content.replace(/data-cms="home_iphone_reel"/g, '');
        content = content.replace(/data-cms="hero_iphone_client"/g, '');
        content = content.replace(/data-cms="hero_iphone_caption"/g, '');
        // Shift iPhone to right
        if (!content.includes('margin-left: 5vw;')) {
            content = content.replace(/#heroPhone\{/g, '#heroPhone{margin-left: 5vw;');
        }
    }

    fs.writeFileSync(p, content);
    console.log("Cleaned and synced:", file);
}

// 6. Update cms.js to NEVER touch header_logo or home_iphone_reel
const cmsPath = path.join(__dirname, 'public/js/cms.js');
if (fs.existsSync(cmsPath)) {
    let cms = fs.readFileSync(cmsPath, 'utf8');
    if (!cms.includes("if (dbItem.elementId === 'header_logo' || dbItem.elementId === 'home_iphone_reel') return;")) {
        cms = cms.replace(
            /allContent\.forEach\(dbItem => \{/,
            "allContent.forEach(dbItem => {\n        if (dbItem.elementId === 'header_logo' || dbItem.elementId === 'home_iphone_reel') return;"
        );
        fs.writeFileSync(cmsPath, cms);
        console.log("Patched cms.js to skip logo and iPhone mockup");
    }
}
