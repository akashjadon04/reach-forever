const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Fix text wiped out in Universal Presence section (.s2-social-card)
// Since the wrapper has color:#FFF, .s2-social-card inherits it but has a white background.
// We change color:inherit inside the social cards to color:#1A1C20.
html = html.replace(/<div class="s2-social-card([^>]*?)><i class="ri-instagram-fill s2-icon" style="font-size:2.5rem;color:#E4405F"><\/i><span style="font-family:'Outfit',sans-serif;font-weight:700;color:inherit">Instagram<\/span><\/div>/,
    '<div class="s2-social-card$1><i class="ri-instagram-fill s2-icon" style="font-size:2.5rem;color:#E4405F"></i><span style="font-family:\'Outfit\',sans-serif;font-weight:700;color:#1A1C20">Instagram</span></div>');
html = html.replace(/<div class="s2-social-card([^>]*?)><i class="ri-facebook-circle-fill s2-icon" style="font-size:2.5rem;color:#1877F2"><\/i><span style="font-family:'Outfit',sans-serif;font-weight:700;color:inherit">Facebook<\/span><\/div>/,
    '<div class="s2-social-card$1><i class="ri-facebook-circle-fill s2-icon" style="font-size:2.5rem;color:#1877F2"></i><span style="font-family:\'Outfit\',sans-serif;font-weight:700;color:#1A1C20">Facebook</span></div>');
html = html.replace(/<div class="s2-social-card([^>]*?)><i class="ri-google-fill s2-icon" style="font-size:2.5rem;color:#DB4437"><\/i><span style="font-family:'Outfit',sans-serif;font-weight:700;color:inherit">Google<\/span><\/div>/,
    '<div class="s2-social-card$1><i class="ri-google-fill s2-icon" style="font-size:2.5rem;color:#DB4437"></i><span style="font-family:\'Outfit\',sans-serif;font-weight:700;color:#1A1C20">Google</span></div>');
html = html.replace(/<div class="s2-social-card([^>]*?)><i class="ri-window-line s2-icon" style="font-size:2.5rem;color:inherit"><\/i><span style="font-family:'Outfit',sans-serif;font-weight:700;color:inherit">Websites<\/span><\/div>/,
    '<div class="s2-social-card$1><i class="ri-window-line s2-icon" style="font-size:2.5rem;color:#1A1C20"></i><span style="font-family:\'Outfit\',sans-serif;font-weight:700;color:#1A1C20">Websites</span></div>');

// Ensure Everywhere Online title text is clearly white
html = html.replace(/<h2 class="title-lg" data-cms="s2_title" style="font-family:'Cormorant Garamond',serif;font-size:clamp\(2.5rem,4.5vw,4.5rem\);margin-bottom:10px;font-weight:700;color:inherit">Everywhere Online.<\/h2>/,
    '<h2 class="title-lg" data-cms="s2_title" style="font-family:\'Cormorant Garamond\',serif;font-size:clamp(2.5rem,4.5vw,4.5rem);margin-bottom:10px;font-weight:700;color:#FFF">Everywhere Online.</h2>');

// 2. Make opacity around 55% for the colored graphics
// Universal Presence Wrapper initial style:
html = html.replace(/background:linear-gradient\(135deg, #E4405F 0%, #fd1d1d 100%\);/,
    'background:linear-gradient(135deg, rgba(228,64,95,0.55) 0%, rgba(253,29,29,0.55) 100%);');

// Inside switchCylinder:
html = html.replace(/wrapper\.style\.background = 'linear-gradient\(135deg, #E4405F 0%, #fd1d1d 100%\)'/,
    "wrapper.style.background = 'linear-gradient(135deg, rgba(228,64,95,0.55) 0%, rgba(253,29,29,0.55) 100%)'");
html = html.replace(/wrapper\.style\.background = 'linear-gradient\(135deg, #1877F2 0%, #0055FF 100%\)'/,
    "wrapper.style.background = 'linear-gradient(135deg, rgba(24,119,242,0.55) 0%, rgba(0,85,255,0.55) 100%)'");
html = html.replace(/wrapper\.style\.background = 'linear-gradient\(135deg, #F4B400 0%, #DB4437 100%\)'/,
    "wrapper.style.background = 'linear-gradient(135deg, rgba(244,180,0,0.55) 0%, rgba(219,68,55,0.55) 100%)'");
html = html.replace(/wrapper\.style\.background = 'linear-gradient\(135deg, #00FFCC 0%, #0088FF 100%\)'/,
    "wrapper.style.background = 'linear-gradient(135deg, rgba(0,255,204,0.55) 0%, rgba(0,136,255,0.55) 100%)'");

// Arsenal Cards initial styles:
html = html.replace(/background:linear-gradient\(135deg, #D4AF37 0%, #C8A96E 100%\)/g,
    'background:linear-gradient(135deg, rgba(212,175,55,0.55) 0%, rgba(200,169,110,0.55) 100%)');
html = html.replace(/background:linear-gradient\(135deg, #556B2F 0%, #3d4f21 100%\)/g,
    'background:linear-gradient(135deg, rgba(85,107,47,0.55) 0%, rgba(61,79,33,0.55) 100%)');
html = html.replace(/background:linear-gradient\(135deg, #1877F2 0%, #1059b8 100%\)/g,
    'background:linear-gradient(135deg, rgba(24,119,242,0.55) 0%, rgba(16,89,184,0.55) 100%)');
html = html.replace(/background:linear-gradient\(135deg, #FF3B30 0%, #d42218 100%\)/g,
    'background:linear-gradient(135deg, rgba(255,59,48,0.55) 0%, rgba(212,34,24,0.55) 100%)');
html = html.replace(/background:linear-gradient\(135deg, #8A2BE2 0%, #5d16a1 100%\)/g,
    'background:linear-gradient(135deg, rgba(138,43,226,0.55) 0%, rgba(93,22,161,0.55) 100%)');
html = html.replace(/background:linear-gradient\(135deg, #14B8A6 0%, #0d8073 100%\)/g,
    'background:linear-gradient(135deg, rgba(20,184,166,0.55) 0%, rgba(13,128,115,0.55) 100%)');

// Since opacity is 55%, the white text might be hard to read against lighter body backgrounds, but since they have backdrop-filter:blur(20px) and there's a strong color, it should be fine. However, let's add text-shadow for better readability.
// Find all instances of text elements inside `.ars-card` and give them a subtle text-shadow.
html = html.replace(/class="ars-title" data-cms="ars_c\d_title" style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;margin-bottom:10px;color:#FFF"/g,
    (match) => match.replace('color:#FFF', 'color:#FFF;text-shadow:0 2px 4px rgba(0,0,0,0.5)'));

html = html.replace(/class="ars-desc" data-cms="ars_c\d_desc" style="font-family:'Outfit',sans-serif;font-size:1rem;color:rgba\(255,255,255,0.9\);line-height:1.6;margin-bottom:25px"/g,
    (match) => match.replace('color:rgba(255,255,255,0.9)', 'color:rgba(255,255,255,0.95);text-shadow:0 1px 3px rgba(0,0,0,0.4)'));


// 3. More SEO & Speed
// Insert JSON-LD structured data into <head>
const jsonLD = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Reach Forever",
      "image": "https://reachforever.in/assets/logo.png",
      "telephone": "+91-81466-52870",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Digital HQ",
        "addressLocality": "Jalandhar",
        "addressRegion": "Punjab",
        "postalCode": "144001",
        "addressCountry": "IN"
      },
      "url": "https://reachforever.in/",
      "sameAs": [
        "https://wa.me/918146652870"
      ],
      "priceRange": "$$$"
    }
    </script>
`;
if(!html.includes('application/ld+json')) {
    html = html.replace(/<\/head>/, jsonLD + '\n</head>');
}

// Add html lang
html = html.replace(/<html(\s*)>/, '<html lang="en">');

// Ensure all lazy loaded images have explicit width/height or rendering properties for PageSpeed
html = html.replace(/loading="lazy"/g, 'loading="lazy" fetchpriority="low"');
// Add preload for CSS
html = html.replace(/<link rel="stylesheet" href="css\/style\.css\?v=\d+">/, (match) => {
    return `<link rel="preload" href="css/style.css?v=6" as="style">\n    <link rel="stylesheet" href="css/style.css?v=6">`;
});

// Cache busting string update
html = html.replace(/\?v=5/g, '?v=6');

fs.writeFileSync('public/index.html', html);
console.log('Fixed opacity, text visibility, and added structured data/SEO.');
