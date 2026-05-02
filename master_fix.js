const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';

// 1. MASTER CSS OVERHAUL (`dark-overhaul.css`)
const cssPath = path.join(baseDir, 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Strip old bad overrides that broke layout
cssContent = cssContent.replace(/\/\* ELEGANT UI\/UX FIXES V4 \*\/[\s\S]*$/, '');
cssContent = cssContent.replace(/\/\* MOBILE HEADER DYNAMIC ISLAND \*\/[\s\S]*?(?=\/\*)/g, '');
cssContent = cssContent.replace(/\/\* HOLOGRAM FIX \*\/[\s\S]*?(?=\/\*)/g, '');
cssContent = cssContent.replace(/\/\* DEEP DARK BACKGROUND ENFORCER \*\/[\s\S]*?(?=\n\n|$)/g, '');

const masterCss = `
/* ==========================================================================
   MASTER FULL-POWER FIXES V5
   ========================================================================== */

/* 1. UNIVERSAL LOGO COLORIZATION (Pure Gold) */
.nav-brand img[data-cms="header_logo"], .nav-brand img {
    filter: invert(72%) sepia(45%) saturate(366%) hue-rotate(5deg) brightness(91%) contrast(85%) !important;
    opacity: 1 !important;
    mix-blend-mode: normal !important;
}

/* 2. DYNAMIC ISLAND MOBILE HEADER */
@media (max-width: 1024px) {
    #navbar {
        background: rgba(10, 10, 15, 0.85) !important;
        backdrop-filter: blur(25px) saturate(200%) !important;
        border: 1px solid rgba(200, 169, 110, 0.3) !important;
        border-radius: 25px !important;
        margin-top: 10px !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(200,169,110,0.15) !important;
        animation: glowPulse 4s infinite alternate !important;
    }
    
    @keyframes glowPulse {
        0% { box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 10px rgba(200,169,110,0.1); }
        100% { box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(200,169,110,0.3); }
    }
}

/* 3. HERO IPHONE POSITIONING FIX (Desktop vs Mobile) */
.hero-visuals {
    position: relative !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
.iphone-mockup {
    position: absolute !important;
    transform: none !important;
    margin: 0 auto !important;
    /* On Desktop, it sits naturally inside its container */
}
@media (max-width: 1024px) {
    .iphone-mockup {
        position: relative !important;
        display: block !important;
        margin: 20px auto 0 auto !important;
        right: auto !important;
        bottom: auto !important;
    }
}

/* 4. HOLOGRAM CARDS FIX (Restore Absolute 3D Carousel) */
.s2-social-card {
    position: absolute !important;
    /* Do NOT use flexbox on the hologram container, it breaks the 3D transforms */
}

/* 5. FOOTER OVERLAP FIX */
.footer-fixed {
    padding-bottom: 120px !important; 
}
.footer-engineered {
    text-align: center;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Outfit', sans-serif;
    margin-top: 40px;
}
.footer-engineered span {
    color: #D4AF37;
    font-weight: bold;
}

/* 6. UNIVERSAL DARK MODE BACKGROUND FIX */
/* Remove !important from section backgrounds so we don't break Light Mode */
[data-theme="dark"] .main-wrapper,
[data-theme="dark"] .bg-white {
    background-color: var(--bg-dark);
    color: var(--text-light);
}
[data-theme="dark"] section {
    background-color: transparent; 
}
`;

if (!cssContent.includes('MASTER FULL-POWER FIXES V5')) {
    cssContent += masterCss;
}
fs.writeFileSync(cssPath, cssContent);
console.log('Master CSS applied to dark-overhaul.css');


// 2. MASTER HTML FIXES
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

const masterVideoMuter = `
    <!-- GENTLE VIDEO MUTER (Fixes Back Navigation Sound without breaking Modal) -->
    <script>
        window.addEventListener('pagehide', function() {
            document.querySelectorAll('video').forEach(vid => {
                vid.pause();
                vid.muted = true;
            });
        });
        window.addEventListener('pageshow', function() {
            const heroVid = document.getElementById('heroVideoAd');
            if (heroVid) heroVid.muted = true;
        });
    </script>
</body>`;

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old broken muters
    content = content.replace(/<!-- UNBREAKABLE VIDEO SOUND LOCK -->.*?<\/script>\s*<\/body>/gis, '</body>');
    content = content.replace(/<!-- Bug Fix: Force Mute on Back Navigation -->.*?<\/script>\s*<\/body>/gis, '</body>');
    content = content.replace(/<!-- GENTLE VIDEO MUTE ON BACK NAVIGATION -->.*?<\/script>\s*<\/body>/gis, '</body>');
    
    // Inject Master Muter
    content = content.replace(/<\/body>/i, masterVideoMuter);

    // Ensure footer signature is perfect
    content = content.replace(/<div class="footer-engineered">.*?<\/div>/gis, '');
    const masterFooter = `<div class="footer-engineered">made by <span>zyrova digital</span></div>\n    </footer>`;
    content = content.replace(/<\/footer>/i, masterFooter);

    // Clean up any bad inline iphone-mockup styles
    content = content.replace(/class="iphone-mockup"\s+style="margin:\s*0\s*auto;\s*display:\s*block;\s*position:\s*relative;\s*max-width:\s*300px;"/g, 'class="iphone-mockup"');

    // Force data-theme="dark" strictly on the HTML tag
    if (!content.includes('data-theme="dark"')) {
        content = content.replace(/<html lang="en">/i, '<html lang="en" data-theme="dark">');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed HTML: ${file}`);
}

// 3. FIX SERVICES.HTML (Re-inject SEO if missing due to user deletion)
const servicesPath = path.join(baseDir, 'services.html');
let servicesContent = fs.readFileSync(servicesPath, 'utf8');
if (!servicesContent.includes('<!-- MAXIMUM GRADE SEO & META TAGS -->')) {
    const seoInjection = `
    <!-- MAXIMUM GRADE SEO & META TAGS -->
    <title>Premium Digital Services | Reach Forever Marketing Agency Punjab</title>
    <meta name="description" content="Reach Forever builds high-converting digital marketing systems in Punjab. SEO, Google Ads, Meta Ads, and Premium Web Development for local businesses.">
    <meta name="keywords" content="Digital Marketing Punjab, SEO Agency Jalandhar, Facebook Ads Phagwara, Best Marketing Agency Amritsar, Website Development Punjab">
    
    <!-- Open Graph / Social -->
    <meta property="og:title" content="Premium Digital Services | Reach Forever">
    <meta property="og:description" content="We build systems that generate real paying customers. Explore our 7-lakh tier marketing arsenal.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://reach-forever.onrender.com/services.html">
    <meta property="og:image" content="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Digital Marketing & Web Development",
      "provider": {
        "@type": "MarketingAgency",
        "name": "Reach Forever",
        "image": "https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png",
        "priceRange": "$$$$"
      },
      "areaServed": ["Punjab", "Jalandhar", "Phagwara", "Amritsar"]
    }
    </script>
    `;
    servicesContent = servicesContent.replace(/<title>.*?<\/title>/is, seoInjection);
    fs.writeFileSync(servicesPath, servicesContent);
    console.log('Restored SEO on services.html');
}

console.log('MASTER FIX V5 COMPLETED!');
