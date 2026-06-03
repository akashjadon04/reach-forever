/**
 * optimize-images.js
 * Converts logo.png → logo.webp (tiny, optimized for navbar)
 * Converts poster_1.jpg → poster_1.webp
 * Run with: node optimize-images.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'public', 'assets');

async function run() {
    // 1. Convert logo.png → logo.webp
    // The logo is displayed at 36px height in navbar, never more than ~200px wide
    // Original: 2.28MB PNG (1536×1024)  →  Target: <20KB WebP
    const logoSrc = path.join(assetsDir, 'logo.png');
    const logoDst = path.join(assetsDir, 'logo.webp');
    
    if (fs.existsSync(logoSrc)) {
        const meta = await sharp(logoSrc).metadata();
        console.log(`Logo: ${meta.width}x${meta.height} ${meta.format}`);
        
        // Resize to 2x display size for retina: 240x80 (will be displayed at 120x40 max)
        await sharp(logoSrc)
            .resize(240, null, { fit: 'inside' }) // Preserve aspect ratio, max width 240px
            .webp({ quality: 90, lossless: false })
            .toFile(logoDst);
        
        const origSize = fs.statSync(logoSrc).size;
        const newSize = fs.statSync(logoDst).size;
        console.log(`logo.webp: ${Math.round(origSize/1024)}KB → ${Math.round(newSize/1024)}KB (${Math.round((1-newSize/origSize)*100)}% saved)`);
    }

    // 2. Convert poster_1.jpg → poster_1.webp
    const posterSrc = path.join(assetsDir, 'poster_1.jpg');
    const posterDst = path.join(assetsDir, 'poster_1.webp');
    
    if (fs.existsSync(posterSrc)) {
        const meta = await sharp(posterSrc).metadata();
        console.log(`Poster: ${meta.width}x${meta.height} ${meta.format}`);
        
        // Poster is displayed at ~300x600px (phone mockup), resize to 2x=600x1200
        await sharp(posterSrc)
            .resize(600, null, { fit: 'inside' })
            .webp({ quality: 80 })
            .toFile(posterDst);
        
        const origSize = fs.statSync(posterSrc).size;
        const newSize = fs.statSync(posterDst).size;
        console.log(`poster_1.webp: ${Math.round(origSize/1024)}KB → ${Math.round(newSize/1024)}KB (${Math.round((1-newSize/origSize)*100)}% saved)`);
    }

    console.log('\nDone! Update HTML to use .webp sources.');
}

run().catch(console.error);
