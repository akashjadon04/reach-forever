const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'public/index.html');
const indexHtml = fs.readFileSync(indexFile, 'utf8');

// 1. Extract the new Nav, Mobile Drawer, and Footer from index.html
const navRegex = /<!-- NAV -->([\s\S]*?)<!-- MOBILE MENU DRAWER -->([\s\S]*?<\/div>)/;
const navMatch = indexHtml.match(navRegex);
if (!navMatch) { console.error("Nav not found"); process.exit(1); }
const newNav = navMatch[0].replace(/data-cms="header_logo"/g, '');

const footerRegex = /<!-- FOOTER -->([\s\S]*?)<\/footer>/;
const footerMatch = indexHtml.match(footerRegex);
if (!footerMatch) { console.error("Footer not found"); process.exit(1); }
const newFooter = footerMatch[0].replace(/data-cms="header_logo"/g, '');

const mNavRegex = /<!-- MOBILE NAV -->([\s\S]*?)<\/nav>/;
const mNavMatch = indexHtml.match(mNavRegex);
const newMNav = mNavMatch ? mNavMatch[0] : '';

// 2. Fix index.html data-cms and iPhone bezel
let updatedIndex = indexHtml.replace(/data-cms="header_logo"/g, '');
updatedIndex = updatedIndex.replace(
    /<img id="baAfter" src="assets\/after\.png" alt="After"/g,
    '<img id="baAfter" src="assets/after.png" alt="After" data-cms="ba_img_after"'
);
updatedIndex = updatedIndex.replace(
    /<img id="baBefore" src="assets\/before\.png" alt="Before"/g,
    '<img id="baBefore" src="assets/before.png" alt="Before" data-cms="ba_img_before"'
);

// iPhone Bezel Enhancement in CSS
const bezelCSS = `
/* ── phone bezel ── */
.phone-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:120px;height:25px;background:#0C0A05;border-bottom-left-radius:16px;border-bottom-right-radius:16px;z-index:20;display:flex;justify-content:center;align-items:center}
.phone-notch::after{content:'';width:40px;height:4px;background:rgba(255,255,255,.1);border-radius:10px}
#heroPhone{border:12px solid #0C0A05;border-radius:52px;background:#0C0A05;box-shadow:inset 0 0 0 2px rgba(255,255,255,.15), 0 70px 140px rgba(26,18,8,.4)}
#heroPhone video{border-radius:38px}
`;
if (!updatedIndex.includes('.phone-notch')) {
    updatedIndex = updatedIndex.replace('/* ── phone ── */', bezelCSS + '\n/* ── phone ── */');
}
// Add notch to HTML
if (!updatedIndex.includes('<div class="phone-notch">')) {
    updatedIndex = updatedIndex.replace(
        '<div class="phone-badge">',
        '<div class="phone-notch"></div><div class="phone-badge" style="top:32px;">'
    );
}

fs.writeFileSync(indexFile, updatedIndex);

// 3. Update services.html, reviews.html, form.html
const pages = ['public/services.html', 'public/reviews.html', 'public/form.html'];
for (const page of pages) {
    const p = path.join(__dirname, page);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        // Remove old nav blocks
        content = content.replace(/<nav[\s\S]*?<\/nav>/g, '');
        content = content.replace(/<header[\s\S]*?<\/header>/g, '');
        content = content.replace(/<!-- NAV -->[\s\S]*?(?=<!--)/g, '');
        content = content.replace(/<!-- MOBILE MENU DRAWER -->[\s\S]*?<\/div>/g, '');
        
        // Remove old footer blocks
        content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
        content = content.replace(/<!-- FOOTER -->[\s\S]*?(?=<!--)/g, '');
        
        // Strip data-cms from logo globally just in case
        content = content.replace(/data-cms="header_logo"/g, '');

        // Inject new blocks
        // Find <body> start to inject Nav
        content = content.replace(/<body[^>]*>/i, `$&\\n${newNav}\\n`);
        
        // Find </body> end to inject Footer and Mobile Nav
        content = content.replace(/<\/body>/i, `\\n${newFooter}\\n${newMNav}\\n</body>`);

        fs.writeFileSync(p, content);
        console.log("Updated", page);
    }
}
console.log("Done unifying nav/footer and adding iPhone bezel.");
