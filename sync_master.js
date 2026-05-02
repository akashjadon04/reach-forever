const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// ---------------------------------------------------------
// 1. CSS UPDATES (`dark-overhaul.css`)
// ---------------------------------------------------------
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace Gold Logo with Original Colors + Dark Mode Shadow
cssContent = cssContent.replace(
    /filter: brightness\(0\) saturate.*?contrast\(85%\) !important;/g,
    'filter: none !important;'
);
const logoFix = `
/* ORIGINAL LOGO COLOR PRESERVATION */
.nav-brand img { filter: none !important; opacity: 1 !important; mix-blend-mode: normal !important; }
[data-theme="dark"] .nav-brand img { filter: drop-shadow(0 0 10px rgba(255,255,255,0.4)) !important; }
`;
cssContent += logoFix;

// Hide TikTok App Section on Desktop
const desktopAppHide = `
/* HIDE TIKTOK APP SECTION ON PC */
@media (min-width: 1025px) {
    .reels-section { display: none !important; }
}
`;
if (!cssContent.includes('HIDE TIKTOK APP SECTION ON PC')) {
    cssContent += desktopAppHide;
}

// Fix Light Mode Particles
cssContent = cssContent.replace(
    /\[data-theme="light"\] #particle-canvas \{[\s\S]*?\}/,
    `[data-theme="light"] #particle-canvas {
        opacity: 0.8 !important;
        filter: invert(1) !important;
        mix-blend-mode: normal !important;
    }`
);

fs.writeFileSync(cssPath, cssContent);
console.log('Fixed CSS Rules.');


// ---------------------------------------------------------
// 2. EXTRACT HEADER & THEME JS FROM INDEX.HTML
// ---------------------------------------------------------
const indexPath = path.join(baseDir, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extract Header Wrap
const headerRegex = /<div class="header-wrap" id="headerWrap"[\s\S]*?<\/nav>\s*<\/div>/i;
const headerMatch = indexContent.match(headerRegex);
const exactHeader = headerMatch ? headerMatch[0] : '';

// Extract Professional Footer
const footerRegex = /<!-- PREMIUM PROFESSIONAL FOOTER -->[\s\S]*?<\/footer>/i;
const footerMatch = indexContent.match(footerRegex);
const exactFooter = footerMatch ? footerMatch[0] : '';

// Extract Theme Toggle JS
const themeJsRegex = /<!-- THEME TOGGLE LOGIC -->[\s\S]*?<\/script>/i;
const themeJsMatch = indexContent.match(themeJsRegex);
const exactThemeJs = themeJsMatch ? themeJsMatch[0] : '';


// ---------------------------------------------------------
// 3. APPLY HEADER, FOOTER, AND JS TO ALL FILES
// ---------------------------------------------------------
const subPages = ['services.html', 'reviews.html', 'form.html'];

for (const file of subPages) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace old header
    content = content.replace(/<div class="header-wrap" id="headerWrap"[\s\S]*?<\/nav>\s*<\/div>/i, exactHeader);

    // Replace old footer
    content = content.replace(/<footer class="footer-fixed">[\s\S]*?<\/footer>/i, exactFooter);
    content = content.replace(/<!-- PREMIUM PROFESSIONAL FOOTER -->[\s\S]*?<\/footer>/i, exactFooter);

    // Replace or Inject Theme JS
    if (content.includes('<!-- THEME TOGGLE LOGIC -->')) {
        content = content.replace(/<!-- THEME TOGGLE LOGIC -->[\s\S]*?<\/script>/i, exactThemeJs);
    } else {
        content = content.replace(/<\/body>/i, exactThemeJs + '\n</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Synchronized Header & Footer in ${file}`);
}


// ---------------------------------------------------------
// 4. FIX AUDIO RACE-CONDITION IN JS/CMS.JS & INDEX.HTML
// ---------------------------------------------------------
const cmsJsPath = path.join(baseDir, 'js', 'cms.js');
if (fs.existsSync(cmsJsPath)) {
    let cmsContent = fs.readFileSync(cmsJsPath, 'utf8');
    
    const badObserver = /const videoObserver = new IntersectionObserver\(\(entries\) => \{[\s\S]*?entry\.target\.muted = false;[\s\S]*?\}\);/g;
    
    const fixedObserver = `const videoObserver = new IntersectionObserver((entries) => {
                        const rm = document.getElementById('reelsModal');
                        const isModalOpen = rm && rm.style.opacity === '1';

                        entries.forEach(entry => {
                            if(entry.isIntersecting && isModalOpen) { 
                                entry.target.muted = false; 
                                let playPromise = entry.target.play();
                                if (playPromise !== undefined) {
                                    playPromise.catch(error => console.log("Scroll play blocked"));
                                }
                            } 
                            else { 
                                entry.target.pause(); 
                                entry.target.currentTime = 0; 
                            }
                        });
                    });`;
    
    cmsContent = cmsContent.replace(badObserver, fixedObserver);
    fs.writeFileSync(cmsJsPath, cmsContent);
    console.log('Fixed IntersectionObserver in cms.js');
}

// Fix index.html IntersectionObserver
let idxContent = fs.readFileSync(indexPath, 'utf8');
const badIdxObserver = /const videoObserver = new IntersectionObserver\(\(entries\) => \{[\s\S]*?entry\.target\.muted = false;[\s\S]*?\}\, \{ threshold: 0\.6 \}\);/g;
const fixedIdxObserver = `const videoObserver = new IntersectionObserver((entries) => {
                        const rm = document.getElementById('reelsModal');
                        const isModalOpen = rm && rm.style.opacity === '1';

                        entries.forEach(entry => {
                            if(entry.isIntersecting && isModalOpen) { 
                                entry.target.muted = false; 
                                let p = entry.target.play();
                                if(p !== undefined) p.catch(e => console.log('Autoplay wait')); 
                            } else { 
                                entry.target.pause(); 
                                entry.target.currentTime = 0; 
                            }
                        });
                    }, { threshold: 0.6 });`;
idxContent = idxContent.replace(badIdxObserver, fixedIdxObserver);

fs.writeFileSync(indexPath, idxContent);
console.log('Fixed IntersectionObserver in index.html');

console.log('SYNC MASTER COMPLETE');
