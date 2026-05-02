const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// 1. OVERHAUL VARS (Redefine base colors for strict dark mode)
const varsPath = path.join(baseDir, 'css', 'overhaul-vars.css');
if (fs.existsSync(varsPath)) {
    let varsContent = fs.readFileSync(varsPath, 'utf8');
    const darkModeVars = `
[data-theme="dark"] {
    --bg-main: #05020A !important;
    --bg-white: #05020A !important;
    --text-dark: #FFFFFF !important;
    --border-light: rgba(255,255,255,0.1) !important;
    --rf-glass: rgba(10, 10, 15, 0.85) !important;
}
`;
    if (!varsContent.includes('[data-theme="dark"] {')) {
        varsContent += darkModeVars;
        fs.writeFileSync(varsPath, varsContent);
        console.log('Strict dark mode vars injected.');
    }
}

// 2. DARK-OVERHAUL.CSS FIXES
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const additionalCss = `
/* FORCE LOGO COLOR PRESERVATION */
.nav-brand img {
    filter: none !important;
    opacity: 1 !important;
    mix-blend-mode: normal !important;
}

/* MOBILE HEADER DYNAMIC ISLAND */
@media (max-width: 1024px) {
    .mobile-nav {
        background: rgba(10, 10, 15, 0.9) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(200, 169, 110, 0.3) !important;
        border-radius: 30px !important;
        bottom: 20px !important;
        left: 5% !important;
        width: 90% !important;
        padding: 10px 15px !important;
        box-shadow: 0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1) !important;
        display: flex !important;
        justify-content: space-around !important;
        animation: glowPulse 4s infinite alternate !important;
    }
    
    @keyframes glowPulse {
        0% { box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 10px rgba(200,169,110,0.1); }
        100% { box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 25px rgba(200,169,110,0.3); }
    }

    .footer-fixed {
        padding-bottom: 120px !important; /* Clear dynamic island */
    }
    
    .iphone-mockup {
        margin: 0 auto !important;
        transform: none !important;
        position: relative !important;
        right: auto !important;
        left: auto !important;
    }
}

/* HOLOGRAM FIX */
.s2-hologram {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 20px !important;
    position: relative !important;
}
.s2-social-card {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;
    margin: 10px !important;
}

/* DEEP DARK BACKGROUND ENFORCER */
.main-wrapper, .bg-white, section, div[style*="background: #FFF"], div[style*="background: white"], div[style*="background-color: #FFF"] {
    background-color: var(--bg-main) !important;
}
`;

if (!cssContent.includes('/* FORCE LOGO COLOR PRESERVATION */')) {
    cssContent += additionalCss;
    fs.writeFileSync(cssPath, cssContent);
    console.log('Processed dark-overhaul.css');
}

// 3. HTML FILES (Video Lock, Footer Signature)
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

const unbreakableVideoMuter = `
    <!-- UNBREAKABLE VIDEO SOUND LOCK -->
    <script>
        (function() {
            function lockVideo(vid) {
                vid.muted = true;
                vid.setAttribute('muted', '');
                // Prevent any script from setting muted = false
                Object.defineProperty(vid, 'muted', {
                    get: function() { return true; },
                    set: function(val) { /* Blocked */ }
                });
            }
            
            function enforceMute() {
                document.querySelectorAll('video').forEach(vid => {
                    if(!vid.hasAttribute('data-mute-locked')) {
                        lockVideo(vid);
                        vid.setAttribute('data-mute-locked', 'true');
                    }
                });
            }
            
            enforceMute();
            setInterval(enforceMute, 200);
            
            window.addEventListener('pageshow', enforceMute);
            window.addEventListener('visibilitychange', enforceMute);
        })();
    </script>
</body>`;

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old muter
    content = content.replace(/<!-- ULTIMATE VIDEO SOUND KILLER -->.*?<\/script>\s*<\/body>/gis, '</body>');
    
    // Inject unbreakable muter
    content = content.replace(/<\/body>/i, unbreakableVideoMuter);

    // Update Footer Signature Text
    content = content.replace(/Engineered by <span>Zyrova Digital<\/span> &bull; Made by <span>Akash Jadon<\/span>/g, 'made by <span>zyrova digital</span>');
    content = content.replace(/Engineered by Zyrova Digital \| Made by Akash Jadon/g, 'made by zyrova digital');

    // Fix iPhone centering inline (if any)
    if (file === 'index.html') {
        content = content.replace(/class="iphone-mockup"/g, 'class="iphone-mockup" style="margin: 0 auto; display: block; position: relative; max-width: 300px;"');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed HTML: ${file}`);
}

console.log('All Fix V3 scripts applied successfully!');
