const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'public/index.html');
let indexHtml = fs.readFileSync(indexFile, 'utf8');

// 1. Extract Nav from index
const navStart = indexHtml.indexOf('<nav id="rfNav">');
const navEnd = indexHtml.indexOf('</nav>', navStart) + 6;
let newNav = indexHtml.substring(navStart, navEnd);
// Ensure data-cms is removed from header logo inside the Nav
newNav = newNav.replace(/data-cms="header_logo"/g, '');

// 2. Extract Mobile Nav
const mNavStart = indexHtml.indexOf('<nav class="mnav">');
const mNavEnd = indexHtml.indexOf('</nav>', mNavStart) + 6;
let newMNav = '';
if (mNavStart > -1) {
    newMNav = indexHtml.substring(mNavStart, mNavEnd);
    newMNav = newMNav.replace('href="#hero"', 'href="index.html"');
    newMNav = newMNav.replace('href="#svcSec"', 'href="services.html"');
}

// 3. Extract Footer
const footStart = indexHtml.indexOf('<footer');
const footEnd = indexHtml.indexOf('</footer>', footStart) + 9;
let newFooter = indexHtml.substring(footStart, footEnd);
newFooter = newFooter.replace(/data-cms="header_logo"/g, '');

// 4. Update index.html
let updatedIndex = indexHtml;
const bezelCSS = `
/* ── phone bezel ── */
.phone-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:110px;height:30px;background:#000;border-bottom-left-radius:18px;border-bottom-right-radius:18px;z-index:20;display:flex;justify-content:center;align-items:center}
.phone-notch::before{content:'';width:12px;height:12px;border-radius:50%;background:#090909;box-shadow:inset 0 0 4px rgba(255,255,255,.1);margin-right:12px}
.phone-notch::after{content:'';width:40px;height:4px;background:#151515;border-radius:10px}
#heroPhone{width:290px;height:600px;border:14px solid #000;border-radius:55px;background:#000;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2), inset 0 0 0 4px rgba(0,0,0,1), 0 60px 140px rgba(26,18,8,.4), 0 0 0 1px rgba(200,169,110,.2);cursor:pointer;position:relative;z-index:2;transform:perspective(1200px) rotateY(-14deg) rotateX(4deg);transition:transform .7s cubic-bezier(0.16,1,0.3,1);margin-left:5vw;}
#heroPhone:hover{transform:perspective(1200px) rotateY(-5deg) rotateX(0deg) scale(1.05)}
#heroPhone::before{content:'';position:absolute;top:100px;bottom:100px;left:-16px;width:2px;background:#333;border-radius:2px} /* volume buttons mock */
#heroPhone::after{content:'';position:absolute;top:150px;bottom:250px;right:-16px;width:2px;background:#333;border-radius:2px} /* power button mock */
#heroPhone video{width:100%;height:100%;object-fit:cover;display:block;border-radius:40px}
#heroPhone .ph-fallback{width:100%;height:100%;object-fit:cover;display:none;border-radius:40px}
`;
if (!updatedIndex.includes('.phone-notch')) {
    updatedIndex = updatedIndex.replace('/* ── phone ── */', bezelCSS + '\n/* ── phone ── */');
}
if (!updatedIndex.includes('<div class="phone-notch">')) {
    updatedIndex = updatedIndex.replace(
        '<div class="phone-badge">',
        '<div class="phone-notch"></div><div class="phone-badge" style="top:40px;">'
    );
}

// Remove CMS tags from iPhone ONLY
updatedIndex = updatedIndex.replace(/data-cms="home_iphone_reel"/g, '');
updatedIndex = updatedIndex.replace(/data-cms="hero_iphone_client"/g, '');
updatedIndex = updatedIndex.replace(/data-cms="hero_iphone_caption"/g, '');
updatedIndex = updatedIndex.replace(/data-cms="header_logo"/g, '');

// Restore data-cms on before/after
updatedIndex = updatedIndex.replace(
    /<img id="baAfter" src="assets\/after\.png" alt="After"/g,
    '<img id="baAfter" src="assets/after.png" alt="After" data-cms="ba_img_after"'
);
updatedIndex = updatedIndex.replace(
    /<img id="baBefore" src="assets\/before\.png" alt="Before"/g,
    '<img id="baBefore" src="assets/before.png" alt="Before" data-cms="ba_img_before"'
);

// Restore data-cms on platform grid dynamically
updatedIndex = updatedIndex.replace(
    /img\.src='assets\/'\+p\.pre\+'_'\+i\+'\.jpg'; img\.alt=p\.lbl\+' '\+i; img\.loading='lazy';/g,
    "img.src='assets/'+p.pre+'_'+i+'.jpg'; img.alt=p.lbl+' '+i; img.loading='lazy'; img.setAttribute('data-cms', 'cyl_'+p.pre+'_'+i);"
);

fs.writeFileSync(indexFile, updatedIndex);
console.log("Updated index.html");

// 5. Upgrade services, reviews, form
const pages = ['public/services.html', 'public/reviews.html', 'public/form.html'];
for (const page of pages) {
    const p = path.join(__dirname, page);
    if (!fs.existsSync(p)) continue;
    
    let content = fs.readFileSync(p, 'utf8');

    // Safe regex removal for scripts that don't match greedy blocks
    content = content.replace(/<nav[\s\S]*?<\/nav>/i, ''); // only first nav
    content = content.replace(/<nav class="mnav"[\s\S]*?<\/nav>/i, ''); // mnav
    content = content.replace(/<header[\s\S]*?<\/header>/i, '');
    content = content.replace(/<footer[\s\S]*?<\/footer>/i, '');

    const parts = content.split('</body>');
    if (parts.length > 1) {
        let bodyContent = parts[0];
        
        // Remove Lenis, Splitting
        bodyContent = bodyContent.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/lenis.*?"><\/script>/g, '');
        bodyContent = bodyContent.replace(/<script src="https:\/\/unpkg\.com\/splitting.*?"><\/script>/g, '');
        bodyContent = bodyContent.replace(/<link rel="stylesheet" href="https:\/\/unpkg\.com\/splitting.*?">/g, '');
        
        // Remove ALL <script> tags inside body that contain inline JS (this safely removes the bloated CMS engine)
        // We will match <script>...</script> blocks
        // But we must NOT use [\s\S]*? if there are multiple. 
        // A safer way: replace all <script>...</script> that DON'T have a src attribute.
        bodyContent = bodyContent.replace(/<script>((?!src=)[\s\S])*?<\/script>/g, '');
        
        content = bodyContent + '\n' + newFooter + '\n' + newMNav + '\n<script src="js/cms.js" defer></script>\n</body>' + parts[1];
    }
    
    // Put Nav at the start of body
    content = content.replace(/<body[^>]*>/i, `$&\\n${newNav}\\n`);
    content = content.replace(/data-cms="header_logo"/g, '');

    fs.writeFileSync(p, content);
    console.log("Upgraded", page);
}

// 6. Fix cms.js
const cmsPath = path.join(__dirname, 'public/js/cms.js');
if (fs.existsSync(cmsPath)) {
    let cms = fs.readFileSync(cmsPath, 'utf8');
    if (!cms.includes("dbItem.elementId === 'header_logo'")) {
        cms = cms.replace(
            /allContent\.forEach\(dbItem => \{/,
            "allContent.forEach(dbItem => {\n        if (dbItem.elementId === 'header_logo' || dbItem.elementId === 'home_iphone_reel') return;"
        );
        fs.writeFileSync(cmsPath, cms);
        console.log("Patched cms.js");
    }
}
console.log("All done.");
