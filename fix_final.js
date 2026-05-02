const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

// 1. Fix dark-overhaul.css for the text rotator
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
if (!cssContent.includes('.tr-word { -webkit-text-fill-color')) {
    cssContent += '\n/* Fix for text rotator losing colors */\n.tr-word {\n    -webkit-text-fill-color: currentcolor !important;\n}\n';
    fs.writeFileSync(cssPath, cssContent);
    console.log('Fixed dark-overhaul.css');
}

// 2. Fix the logo tag in all files
for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Revert logo: Remove onerror and the fallback span
    const logoRegex = /<img src="[^"]+" alt="Reach Forever Logo" data-cms="header_logo"[^>]*>/;
    const match = content.match(logoRegex);
    if (match) {
        let imgTag = match[0];
        // Remove onerror
        imgTag = imgTag.replace(/onerror="[^"]+"/, '');
        // Update tag
        content = content.replace(match[0], imgTag);
        
        // Remove the text fallback span
        const fallbackRegex = /<span class="logo-text-fallback"[^>]*>.*?<\/span><\/span>/s;
        content = content.replace(fallbackRegex, '');
    }
    
    // Also fix any stray nested spans from the fallback removal
    content = content.replace(/<span style="color: #C8A96E;">Reach<\/span>&nbsp;Forever<\/span>/g, '');
    content = content.replace(/<span class="logo-text-fallback" style="display: none; align-items: center; gap: 8px; font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: #FFF; letter-spacing: 0.5px;">/g, '');

    fs.writeFileSync(filePath, content);
    console.log(`Removed fallback from ${file}`);
}

// 3. Sync headers to other files
const indexContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Extract the header-wrap and mobile-nav from index.html
const headerMatch = indexContent.match(/<div class="header-wrap" id="headerWrap"[^>]*>.*?<\/nav>\s*<\/div>/s);
const mobileNavMatch = indexContent.match(/<div class="mobile-nav">.*?<\/div>/s);

if (headerMatch && mobileNavMatch) {
    const headerHtml = headerMatch[0];
    const mobileNavHtml = mobileNavMatch[0];

    ['services.html', 'reviews.html', 'form.html'].forEach(file => {
        const filePath = path.join(baseDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace header-wrap
        const targetHeaderMatch = content.match(/<div class="header-wrap" id="headerWrap"[^>]*>.*?<\/nav>\s*<\/div>/s);
        if (targetHeaderMatch) {
            let newHeader = headerHtml;
            // Fix active states
            newHeader = newHeader.replace(/class="nav-pill active magnetic-inner"/, 'class="nav-pill magnetic-inner"');
            if (file === 'services.html') newHeader = newHeader.replace(/<a href="services.html" class="nav-pill magnetic-inner"/, '<a href="services.html" class="nav-pill active magnetic-inner"');
            if (file === 'reviews.html') newHeader = newHeader.replace(/<a href="reviews.html" class="nav-pill magnetic-inner"/, '<a href="reviews.html" class="nav-pill active magnetic-inner"');
            
            content = content.replace(targetHeaderMatch[0], newHeader);
        }

        // Replace mobile-nav
        const targetMobileMatch = content.match(/<div class="mobile-nav">.*?<\/div>/s);
        if (targetMobileMatch) {
            let newMobile = mobileNavHtml;
            // Fix active states
            newMobile = newMobile.replace(/class="m-nav-item active"/, 'class="m-nav-item"');
            if (file === 'services.html') newMobile = newMobile.replace(/<a href="services.html" class="m-nav-item"/, '<a href="services.html" class="m-nav-item active"');
            if (file === 'reviews.html') newMobile = newMobile.replace(/<a href="reviews.html" class="m-nav-item"/, '<a href="reviews.html" class="m-nav-item active"');

            content = content.replace(targetMobileMatch[0], newMobile);
        } else {
            // If mobile-nav isn't there, insert it after header-wrap
            const insertPos = content.indexOf('</div>', content.indexOf('<div class="header-wrap" id="headerWrap"')) + 6;
            content = content.slice(0, insertPos) + '\n\n' + mobileNavHtml + content.slice(insertPos);
            console.log(`Added mobile-nav to ${file}`);
        }

        fs.writeFileSync(filePath, content);
        console.log(`Synced header to ${file}`);
    });
}
