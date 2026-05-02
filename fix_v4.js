const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// 1. REVERT & CLEAN DARK-OVERHAUL.CSS
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Strip out the bad mobile header dynamic island CSS that broke the iPhone
cssContent = cssContent.replace(/\/\* MOBILE HEADER DYNAMIC ISLAND \*\/[\s\S]*?(?=\/\* HOLOGRAM FIX \*\/)/, '');

// Strip out the broken hologram fix
cssContent = cssContent.replace(/\/\* HOLOGRAM FIX \*\/[\s\S]*?(?=\/\* DEEP DARK BACKGROUND ENFORCER \*\/)/, '');

// Strip out the aggressive background enforcer
cssContent = cssContent.replace(/\/\* DEEP DARK BACKGROUND ENFORCER \*\/[\s\S]*?(\n|$)/, '');

// Strip out the specific logo preservation that made it stay black
cssContent = cssContent.replace(/\/\* FORCE LOGO COLOR PRESERVATION \*\/[\s\S]*?(?=\n\n|\n\/|\n$)/, '');

// Inject precise fixes
const elegantFixes = `
/* ==========================================================================
   ELEGANT UI/UX FIXES V4
   ========================================================================== */

/* 1. Logo Colorization (Force Gold across all themes) */
.nav-brand img[data-cms="header_logo"] {
    filter: invert(72%) sepia(45%) saturate(366%) hue-rotate(5deg) brightness(91%) contrast(85%) !important;
    mix-blend-mode: normal !important;
}

/* 2. Mobile Header Elegance */
@media (max-width: 1024px) {
    #navbar {
        background: rgba(10, 10, 15, 0.85) !important;
        backdrop-filter: blur(25px) saturate(200%) !important;
        border: 1px solid rgba(200, 169, 110, 0.25) !important;
        border-radius: 25px !important;
        margin-top: 5px !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(200,169,110,0.15) !important;
    }
}

/* 3. Footer Overlap Fix */
.footer-fixed {
    padding-bottom: 110px !important; 
    z-index: 10 !important;
}
.footer-engineered {
    position: relative;
    z-index: 100;
    text-align: center;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Outfit', sans-serif;
    margin-top: 40px;
    padding-bottom: 20px;
}
.footer-engineered span {
    color: #D4AF37;
    font-weight: bold;
}

/* 4. Universal Theme Background Override (Without breaking Light Theme) */
[data-theme="dark"] .main-wrapper,
[data-theme="dark"] .bg-white,
[data-theme="dark"] section {
    background-color: var(--bg-dark) !important;
    color: var(--text-light) !important;
}
`;

cssContent += elegantFixes;
fs.writeFileSync(cssPath, cssContent);
console.log('Cleaned and updated dark-overhaul.css');

// 2. HTML FILES (Remove Unbreakable Lock, Add Gentle Mute, Fix Footer)
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

const gentleVideoMuter = `
    <!-- GENTLE VIDEO MUTE ON BACK NAVIGATION -->
    <script>
        window.addEventListener('pagehide', function() {
            document.querySelectorAll('video').forEach(vid => {
                vid.pause();
                vid.muted = true;
            });
        });
        window.addEventListener('pageshow', function() {
            // Mute background videos only, do not lock them
            const heroVid = document.getElementById('heroVideoAd');
            if (heroVid) heroVid.muted = true;
        });
    </script>
</body>`;

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the aggressive Unbreakable Video Sound Lock
    content = content.replace(/<!-- UNBREAKABLE VIDEO SOUND LOCK -->.*?<\/script>\s*<\/body>/gis, '</body>');
    
    // Inject gentle muter
    content = content.replace(/<\/body>/i, gentleVideoMuter);

    // Ensure footer is exact
    content = content.replace(/<div class="footer-engineered">.*?<\/div>/gis, '<div class="footer-engineered">made by <span>zyrova digital</span></div>');

    // Remove the bad inline style on iphone-mockup
    if (file === 'index.html') {
        content = content.replace(/class="iphone-mockup"\s+style="margin:\s*0\s*auto;\s*display:\s*block;\s*position:\s*relative;\s*max-width:\s*300px;"/g, 'class="iphone-mockup"');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed HTML: ${file}`);
}

console.log('All Fix V4 scripts applied successfully!');
