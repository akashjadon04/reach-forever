const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['services.html', 'reviews.html', 'form.html'];

for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;

    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // Fix the canvas style to match index.html
    htmlContent = htmlContent.replace(
        /<canvas id="particle-canvas"[^>]*><\/canvas>/i,
        '<canvas id="particle-canvas" style="position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 99; pointer-events: none; opacity: 0.6;"></canvas>'
    );
    
    // Some subpages might use "gold-dust-canvas" instead of "particle-canvas" if copied poorly
    htmlContent = htmlContent.replace(
        /<canvas id="gold-dust-canvas"[^>]*><\/canvas>/i,
        '<canvas id="gold-dust-canvas" style="position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 99; pointer-events: none; opacity: 0.6;"></canvas>'
    );

    // Also fix the transparent backgrounds inside main-wrapper so it's deep black
    // This removes the need for my CSS hack, but the CSS hack is good backup.
    
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Patched canvas in ${file}`);
}
console.log('Canvas Fix Complete.');
