const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Change "Thorne Dental Clinic" to "Client Reviews"
html = html.replace(/>Thorne Dental Clinic</, '>Client Reviews<');

// 2. Change Universal Presence section to have dynamic colorful background
html = html.replace(/<div class="section-2-wrapper reveal-on-scroll" style="/, 
    '<div id="s2Wrapper" class="section-2-wrapper reveal-on-scroll" style="transition:background 0.5s ease; color:#FFF; background:linear-gradient(135deg, #E4405F 0%, #fd1d1d 100%); ');
// Ensure text inside is white
html = html.replace(/color:var\(--text-muted, #6B7280\)">We put your business on every platform/, 'color:rgba(255,255,255,0.9)">We put your business on every platform');

// 3. Update switchCylinder function to change background
const switchFuncRegex = /window\.switchCylinder = function\(platform\)\{[\s\S]*?triggerHaptic\(40\);\s*\};/;
const newSwitchFunc = `window.switchCylinder = function(platform){
    const prefixMap = {ig:'ig', fb:'fb', go:'gl', web:'wb'};
    const prefix = prefixMap[platform] || platform;
    for(let i=1;i<=6;i++){
        const img = document.getElementById('cyl-img-'+i);
        if(img) img.src = 'assets/'+prefix+'_'+i+'.png';
    }
    document.querySelectorAll('.s2-social-card').forEach(c=>c.style.border='2px solid transparent');
    const ac = document.getElementById('card-'+platform);
    if(ac) ac.style.border='2px solid #D4AF37';
    
    // Change wrapper background
    const wrapper = document.getElementById('s2Wrapper');
    if(wrapper) {
        if(platform === 'ig') wrapper.style.background = 'linear-gradient(135deg, #E4405F 0%, #fd1d1d 100%)';
        else if(platform === 'fb') wrapper.style.background = 'linear-gradient(135deg, #1877F2 0%, #0055FF 100%)';
        else if(platform === 'go') wrapper.style.background = 'linear-gradient(135deg, #F4B400 0%, #DB4437 100%)';
        else if(platform === 'web') wrapper.style.background = 'linear-gradient(135deg, #00FFCC 0%, #0088FF 100%)';
    }

    if(window.triggerHaptic) window.triggerHaptic(40);
};`;
html = html.replace(switchFuncRegex, newSwitchFunc);

// 4. Remove the sections between "Everywhere Online" and "Digital Marketing Services".
// These are: .story-section, .arsenal-section is next! 
// Wait, the user said "remove that section completly where text is written in big".
// Let's remove story-section and the parallax-break before blueprint, or just whatever is between Universal Presence and Arsenal.
// Actually, Arsenal IS the digital marketing services section.
// Between section-2 and Arsenal is just the story-section! Let's remove it entirely.
const storyStart = html.indexOf('<section class="story-section"');
const arsenalStart = html.indexOf('<section class="arsenal-section');
if (storyStart !== -1 && arsenalStart !== -1 && arsenalStart > storyStart) {
    html = html.substring(0, storyStart) + html.substring(arsenalStart);
}

// 5. Enhance SEO and PageSpeed in <head>
const seoTags = `
    <meta name="description" content="Reach Forever is a premium digital marketing agency engineering predictable revenue systems. We specialize in Automated Websites, Local Business Ads, and Google SEO.">
    <meta name="keywords" content="digital marketing, automated websites, local business ads, seo, revenue systems">
    <meta name="author" content="Reach Forever">
    <meta property="og:title" content="Reach Forever | Digital Marketing Agency">
    <meta property="og:description" content="We engineer predictable revenue systems that flood your business with high-ticket local customers.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://reachforever.in/">
    <meta property="og:image" content="assets/logo.png">
    <meta name="twitter:card" content="summary_large_image">
    <!-- Preload crucial assets for PageSpeed -->
    <link rel="preload" href="assets/logo.png" as="image">
    <link rel="preload" href="assets/video_1.mp4" as="video">
`;
// Insert right after <title>
html = html.replace(/<title>.*?<\/title>/, (match) => match + '\n' + seoTags);

// Cache bust CSS
html = html.replace(/href="css\/style\.css(\?v=\d+)?"/, 'href="css/style.css?v=5"');

fs.writeFileSync('public/index.html', html);
console.log('Fixed Universal Presence colors, removed story section, added SEO.');
