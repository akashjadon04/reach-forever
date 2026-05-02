const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// 1. FIX DARK-OVERHAUL.CSS (Remove absolute positioning from buttons)
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Strip out the broken hologram fix
cssContent = cssContent.replace(/\/\* 4\. HOLOGRAM CARDS FIX \(Restore Absolute 3D Carousel\) \*\/[\s\S]*?(?=\/\* 5\. FOOTER OVERLAP FIX \*\/)/, '');

// Re-add proper layout for buttons (just ensuring they aren't absolute)
const hologramFix = `
/* 4. HOLOGRAM CARDS FIX (Ensure Grid stays intact) */
.s2-social-card {
    position: relative !important;
    transform: none !important;
    top: auto !important; left: auto !important; bottom: auto !important; right: auto !important;
}
.cylinder-face {
    position: absolute !important; 
    /* Keep 3D faces absolute */
}
`;
cssContent = cssContent.replace(/\/\* 5\. FOOTER OVERLAP FIX \*\//, hologramFix + '\n/* 5. FOOTER OVERLAP FIX */');

// Add Footer Styles
const footerCss = `
/* 7. PROFESSIONAL FOOTER CSS */
.premium-footer {
    position: relative;
    z-index: 50;
    background: #05020A;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 60px 5% 120px 5%; /* 120px bottom padding to clear dynamic island */
    color: #A0A0A0;
    font-family: 'Outfit', sans-serif;
}
.pf-container {
    max-width: 1250px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
}
@media (max-width: 768px) {
    .pf-container { grid-template-columns: 1fr; text-align: center; }
}
.pf-brand img { max-height: 40px; margin-bottom: 20px; filter: invert(72%) sepia(45%) saturate(366%) hue-rotate(5deg) brightness(91%) contrast(85%); }
.pf-col h4 {
    color: #FFF;
    font-size: 1.1rem;
    margin-bottom: 20px;
    font-weight: 600;
}
.pf-links { list-style: none; padding: 0; margin: 0; }
.pf-links li { margin-bottom: 12px; }
.pf-links a {
    color: #888;
    text-decoration: none;
    transition: color 0.3s;
}
.pf-links a:hover { color: #D4AF37; }
.pf-bottom {
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.05);
    text-align: center;
}
.pf-signature {
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
}
.pf-signature span { color: #D4AF37; font-weight: bold; }
`;

if (!cssContent.includes('.premium-footer')) {
    cssContent += footerCss;
}

fs.writeFileSync(cssPath, cssContent);
console.log('Fixed dark-overhaul.css');


// 2. HTML FIXES
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

const professionalFooter = `
    <!-- PREMIUM PROFESSIONAL FOOTER -->
    <footer class="premium-footer">
        <div class="pf-container">
            <div class="pf-col pf-brand">
                <img src="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png" alt="Reach Forever">
                <p>We engineer predictable revenue systems that flood your business with high-ticket local customers.</p>
            </div>
            <div class="pf-col">
                <h4>Sitemap</h4>
                <ul class="pf-links">
                    <li><a href="index.html">Growth Engine</a></li>
                    <li><a href="services.html">Our Arsenal</a></li>
                    <li><a href="reviews.html">Success Vault</a></li>
                    <li><a href="form.html">Initiate Project</a></li>
                </ul>
            </div>
            <div class="pf-col">
                <h4>Legal & Contact</h4>
                <ul class="pf-links">
                    <li><a href="https://wa.me/917888429760" target="_blank">WhatsApp Support</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div class="pf-bottom">
            <div class="pf-signature">made by <span>zyrova digital</span></div>
        </div>
    </footer>
`;

const targetedVideoMuter = `
    <!-- HERO VIDEO MUTE LOCK (Fixes Sound Bug WITHOUT breaking Modal) -->
    <script>
        (function() {
            function lockHeroMute() {
                const heroVid = document.getElementById('heroVideoAd');
                if (heroVid && !heroVid.hasAttribute('data-mute-locked')) {
                    heroVid.muted = true;
                    heroVid.setAttribute('muted', '');
                    heroVid.setAttribute('data-mute-locked', 'true');
                    Object.defineProperty(heroVid, 'muted', {
                        get: function() { return true; },
                        set: function(val) { /* Blocked */ }
                    });
                }
            }
            // Attempt lock immediately and on load
            lockHeroMute();
            window.addEventListener('DOMContentLoaded', lockHeroMute);
            window.addEventListener('pageshow', lockHeroMute);
        })();
    </script>
</body>`;

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old footer
    content = content.replace(/<footer class="footer-fixed">[\s\S]*?<\/footer>/i, '');
    content = content.replace(/<!-- PREMIUM PROFESSIONAL FOOTER -->[\s\S]*?<\/footer>/i, '');

    // Deep Clean HTML for Dark Mode (Remove inline bg-white and #FFF)
    if (file !== 'index.html') {
        content = content.replace(/class="([^"]*)bg-white([^"]*)"/g, 'class="$1 $2"');
        content = content.replace(/style="([^"]*)background:\s*#FFF;?([^"]*)"/gi, 'style="$1 $2"');
        content = content.replace(/style="([^"]*)background-color:\s*#FFF;?([^"]*)"/gi, 'style="$1 $2"');
        content = content.replace(/style="([^"]*)background:\s*#ffffff;?([^"]*)"/gi, 'style="$1 $2"');
        content = content.replace(/style="([^"]*)background-color:\s*#ffffff;?([^"]*)"/gi, 'style="$1 $2"');
        content = content.replace(/style="([^"]*)background:\s*white;?([^"]*)"/gi, 'style="$1 $2"');
    }

    // Remove old scripts
    content = content.replace(/<!-- GENTLE VIDEO MUTER.*?<\/script>\s*<\/body>/gis, '</body>');
    content = content.replace(/<!-- HERO VIDEO MUTE LOCK.*?<\/script>\s*<\/body>/gis, '</body>');

    // Inject New Footer & Script
    content = content.replace(/<\/body>/i, professionalFooter + '\n' + targetedVideoMuter);

    fs.writeFileSync(filePath, content);
    console.log(`Processed HTML: ${file}`);
}

console.log('Final Structural Fixes Applied!');
