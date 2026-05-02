const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove logo color filter
    content = content.replace(/filter:\s*brightness\(0\)\s*invert\(1\);?/gi, '');

    // 2. Add Footer Signature
    const signature = `\n        <!-- Engineering Signature -->\n        <p style="font-size: 0.8rem; color: #888; margin-top: 30px; font-family: 'Outfit', sans-serif; letter-spacing: 1px;">Engineered by <span style="color: #C8A96E;">Zyrova Digital</span> | Made by <span style="color: #FFF;">Akash Jadon</span></p>\n    `;
    if (!content.includes('Engineered by Zyrova Digital')) {
        content = content.replace(/(<\/footer>)/i, signature + '$1');
    }

    // 3. Fix Video Auto-Play Sound Bug (On Page Show/Back Navigation)
    const scriptFix = `
    <!-- Bug Fix: Force Mute on Back Navigation -->
    <script>
        window.addEventListener('pageshow', function(event) {
            document.querySelectorAll('video').forEach(vid => {
                vid.muted = true;
                if(vid.autoplay) {
                    let playPromise = vid.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {});
                    }
                }
            });
        });
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                document.querySelectorAll('video').forEach(vid => { vid.muted = true; });
            }
        });
    </script>
</body>`;
    if (!content.includes('Bug Fix: Force Mute')) {
        content = content.replace(/<\/body>/i, scriptFix);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed HTML: ${file}`);
}

// 4. Update CSS (dark-overhaul.css)
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const additionalCss = `

/* ==========================================================================
   15. FINAL PREMIUM FIXES & ALIVE EFFECTS
   ========================================================================== */

/* Mobile Logo Constraint */
@media (max-width: 1024px) {
    .nav-brand img { max-width: 160px !important; max-height: 40px !important; width: auto !important; height: auto !important; }
}

/* Light Mode Particle Fix (Ensure visibility) */
[data-theme="light"] #particle-canvas {
    opacity: 0.4 !important;
    filter: invert(1) hue-rotate(180deg) brightness(1.5) !important;
    mix-blend-mode: multiply !important;
}

/* Premium Hover Lift & Glow for Cards */
.s2-social-card, .review-card, .process-card, .pricing-card {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease !important;
}
.s2-social-card:hover, .review-card:hover, .process-card:hover, .pricing-card:hover {
    transform: translateY(-8px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(200, 169, 110, 0.15) !important;
}

/* Universal Sub-Page Backgrounds */
body {
    background-color: var(--bg-dark) !important;
    color: var(--text-light) !important;
}
.services-section, .reviews-section, .form-section {
    background-color: transparent !important;
}
`;

if (!cssContent.includes('FINAL PREMIUM FIXES & ALIVE EFFECTS')) {
    cssContent += additionalCss;
    fs.writeFileSync(cssPath, cssContent);
    console.log('Processed CSS: dark-overhaul.css');
}

console.log('All misc fixes applied successfully!');
