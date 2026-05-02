const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['services.html', 'reviews.html'];

for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace hardcoded light glassmorphism with dynamic --rf-glass
    content = content.replace(/background:\s*rgba\(253,\s*253,\s*251,\s*0\.95\);/g, 'background: var(--rf-glass);');
    content = content.replace(/background:\s*rgba\(253,\s*253,\s*251,\s*0\.8\);/g, 'background: var(--rf-glass);');
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.9\);/g, 'background: var(--rf-glass);');
    
    // Replace linear-gradient overlays that force a white mask
    content = content.replace(/linear-gradient\(135deg,\s*rgba\(253,253,251,0\.95\)\s*0%,\s*rgba\(253,253,251,0\.8\)\s*100%\)/g, 
        'var(--rf-glass)');

    fs.writeFileSync(filePath, content);
    console.log(`Patched glass containers in ${file}`);
}
