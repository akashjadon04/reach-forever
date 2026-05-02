const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];
const cssFile = path.join(baseDir, 'css', 'dark-overhaul.css');

// 1. Fix CSS logic for Mobile Header and Mobile Nav overflow
let cssContent = fs.readFileSync(cssFile, 'utf8');
const mobileCssFix = `
/* ==========================================================================
   MASTER PATCH CSS FIXES
   ========================================================================== */
@media (max-width: 1024px) {
    /* Hide the double top header on mobile */
    #headerWrap { display: none !important; }
    
    /* Ensure mobile nav never overflows off screen */
    .mobile-nav {
        box-sizing: border-box !important;
        width: 90vw !important;
        max-width: 400px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important; /* Ensure it overrides any hidden display */
    }
}
`;
if (!cssContent.includes('MASTER PATCH CSS FIXES')) {
    fs.appendFileSync(cssFile, mobileCssFix);
    console.log('Appended Mobile CSS fixes to dark-overhaul.css');
}

// 2. Fix JS Toggle Logic and duplicates
for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;

    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // A) Replace `html.removeAttribute('data-theme');` with `html.setAttribute('data-theme', 'dark');`
    htmlContent = htmlContent.replace(/html\.removeAttribute\('data-theme'\);/g, "html.setAttribute('data-theme', 'dark');");
    htmlContent = htmlContent.replace(/document\.documentElement\.removeAttribute\('data-theme'\);/g, "document.documentElement.setAttribute('data-theme', 'dark');");

    // Fix the condition `isCurrentlyLight = html.getAttribute('data-theme') === 'light';` 
    // This condition works fine whether it's 'dark' or missing.

    // B) Special cleanup for form.html (duplicated script block)
    if (file === 'form.html') {
        // Find the second duplicated initThemeToggle block and delete it.
        // It starts with function initThemeToggle() and ends with document.addEventListener...
        // Let's use a regex to remove the second block if it appears.
        const occurrences = htmlContent.split('function initThemeToggle() {');
        if (occurrences.length > 2) {
            // Reconstruct but exclude the last occurrence block
            let newContent = occurrences[0];
            newContent += 'function initThemeToggle() {' + occurrences[1];
            // The second occurrence is everything after the second 'function initThemeToggle() {'
            // We just need to strip it out till </script>
            let remainder = occurrences[2].replace(/[\s\S]*?<\/script>/, '</script>');
            htmlContent = newContent + remainder;
            console.log('Cleaned up duplicated script in form.html');
        }
    }

    fs.writeFileSync(filePath, htmlContent);
    console.log(`Patched JS logic in ${file}`);
}

console.log('Master Patch Complete.');
