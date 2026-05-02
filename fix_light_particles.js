const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['services.html', 'reviews.html', 'form.html', 'index.html'];

for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;

    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // Replace hardcoded gold particles with dynamic theme-based particles
    htmlContent = htmlContent.replace(
        /ctx\.fillStyle\s*=\s*`rgba\(212,\s*175,\s*55,\s*\$\{p\.alpha\}\)`;/g,
        "ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? `rgba(0,0,0,${p.alpha})` : `rgba(212, 175, 55, ${p.alpha})`;"
    );

    fs.writeFileSync(filePath, htmlContent);
    console.log(`Patched particles in ${file}`);
}
console.log('Light Mode Particles Fix Complete.');
