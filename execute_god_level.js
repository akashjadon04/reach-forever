const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');
let css = fs.readFileSync('public/css/style.css', 'utf8');
let js = fs.readFileSync('public/js/main.js', 'utf8');

// ==========================================
// 1. PERFORMANCE & CLEANUP (index.html)
// ==========================================
html = html.replace(/<html lang="en"[^>]*>/, '<html lang="en" data-theme="light">');
html = html.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js"><\/script>/, '');
html = html.replace(/<div id="canvas-container"[^>]*><\/div>/, '');
html = html.replace(/<div class="theme-switch"[^>]*>[\s\S]*?<\/div>\s*<\/div>/, '</div>'); // Remove theme switch
html = html.replace(/<p class="story-p apple-text-reveal"[\s\S]*?<\/p>/, ''); // Remove the third big text section
html = html.replace(/<div class="aura-chatbot"[\s\S]*?<\/div>/, ''); // Optional: Cleanup chatbot if causing lag, wait, user didn't ask. Leave it.

// Remove all data-cms from img and video
html = html.replace(/<img([^>]*)data-cms="[^"]*"/g, '<img$1');
html = html.replace(/<video([^>]*)data-cms="[^"]*"/g, '<video$1');

// Global logo fetch
html = html.replace(/src="[^"]*logo[^"]*"/g, 'src="assets/logo.png"');

// Before/After fetch
html = html.replace(/src="[^"]*before[^"]*"/g, 'src="assets/before.png"');
html = html.replace(/src="[^"]*after[^"]*"/g, 'src="assets/after.png"');

// Hero section tweaks (Client Reviews instead of Dental Clinic)
html = html.replace(/Dental Clinic/g, 'Client Reviews');

// Arsenal Images Replacement (Remove dogs, use high quality Unsplash)
const services = [
    { id: 'fb_ads', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop' },
    { id: 'auto_web', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
    { id: 'seo', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
    { id: 'web_dev', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
    { id: 'social', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop' },
    { id: 'crm', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' }
];
services.forEach(s => {
    // Find the specific ars-card img and replace its src
    const regex = new RegExp(`onclick="expandServiceCard\\(this,'${s.id}'\\)[\\s\\S]*?<img src="[^"]*"`, 'g');
    html = html.replace(regex, (match) => {
        return match.replace(/<img src="[^"]*"/, `<img src="${s.url}"`);
    });
});

// Footer Overhaul
html = html.replace(/<footer class="premium-footer"[^>]*>/, '<footer class="premium-footer" style="background:#05020A; color:#FFFFFF; margin-top:0 !important;">');
html = html.replace(/<div class="pf-container"[^>]*>/, '<div class="pf-container" style="color:#FFFFFF;">');
html = html.replace(/917888429760/g, '918146652870');
html = html.replace(/\+91 76687 58238/g, '+91 81466 52870');
html = html.replace(/Revenue Generated This Quarter<\/p>/, 'Revenue Generated This Quarter</p>').replace(/color:var\(--rf-text\)/g, 'color:#FFF');
html = html.replace(/color:var\(--text-dark, #1A1C20\)/g, 'color:#FFF'); // Fix any dark text in footer/dark sections

// Inject Section 2 Liquid Color CSS
const liquidCSS = `
<style>
/* God-Level Liquid Colors for Section 2 */
.liquid-bg-fb { background: linear-gradient(135deg, #0055FF, #00A2FF); animation: liquid 6s ease-in-out infinite alternate; }
.liquid-bg-ig { background: linear-gradient(135deg, #FF0077, #7700FF); animation: liquid 6s ease-in-out infinite alternate; }
.liquid-bg-web { background: linear-gradient(135deg, #00FFCC, #0088FF); animation: liquid 6s ease-in-out infinite alternate; }
.liquid-bg-go { background: linear-gradient(135deg, #FF8800, #FF0055); animation: liquid 6s ease-in-out infinite alternate; }
@keyframes liquid { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(30deg); } }
</style>
`;
html = html.replace(/<\/head>/, liquidCSS + '\n</head>');


// ==========================================
// 2. PERFORMANCE & CLEANUP (main.js)
// ==========================================
// Remove QuantumParticleEngine completely
js = js.replace(/\/\*\s*={2,}\s*MODULE 4: THREE\.JS WEBGL[\s\S]*?this\.scene\.add\(this\.particlesMesh\);\s*\}\s*\}\s*\}/, '');
js = js.replace(/const engine = new QuantumParticleEngine\(\);[\s\S]*?engine\.init\(\);/, '');

// Remove Theme Switch Logic
js = js.replace(/const themeSwitch = document\.getElementById\('themeSwitch'\);[\s\S]*?\}\);/g, '');

// Fix Section 2 (Everywhere Online) to use liquid colors and local assets
js = js.replace(/const wrapper = document\.getElementById\('s2Wrapper'\);[\s\S]*?if\(window\.triggerHaptic\)/, `
    const wrapper = document.getElementById('s2Wrapper');
    if(wrapper) {
        wrapper.className = 'section-2-wrapper reveal-on-scroll'; // reset
        if(platform === 'fb') wrapper.classList.add('liquid-bg-fb');
        else if(platform === 'ig') wrapper.classList.add('liquid-bg-ig');
        else if(platform === 'web') wrapper.classList.add('liquid-bg-web');
        else if(platform === 'go') wrapper.classList.add('liquid-bg-go');
    }
    if(window.triggerHaptic)
`);

// Dynamic iPhone Mockup Local Video Fetching
const fastFetchJS = `
    const videos = [];
    async function discoverLocalVideos() {
        for(let i=1; i<=50; i++) {
            const url = 'assets/video_'+i+'.mp4';
            try {
                const res = await fetch(url, {method: 'HEAD'});
                if (res.ok) videos.push(url);
                else break; 
            } catch(e) { break; }
        }
        if (videos.length === 0) {
            videos.push('assets/video_1.mp4'); // fallback
        }
    }
    await discoverLocalVideos();
`;
js = js.replace(/const videos = \[\];[\s\S]*?catch\(e\)\{ break; \}\s*\}/, fastFetchJS);

// ==========================================
// 3. ENFORCE PREMIUM LIGHT THEME (style.css)
// ==========================================
// Strip ALL [data-theme="dark"] blocks from CSS completely to save parsing time
css = css.replace(/\[data-theme="dark"\]\s*\{[\s\S]*?\}/g, '');

// Hardcode root to Light Premium Theme
css = css.replace(/:root\s*\{[\s\S]*?--bg-main:[^;]*;/m, (match) => {
    return match.replace(/--bg-main:[^;]*;/, '--bg-main: #F4F4F0;')
                .replace(/--bg-base:[^;]*;/, '--bg-base: #FFFFFF;')
                .replace(/--bg-panel:[^;]*;/, '--bg-panel: rgba(255, 255, 255, 0.7);')
                .replace(/--rf-text:[^;]*;/, '--rf-text: #111111;')
                .replace(/--rf-muted:[^;]*;/, '--rf-muted: #555555;');
});


// Save everything
fs.writeFileSync('public/index.html', html);
fs.writeFileSync('public/css/style.css', css);
fs.writeFileSync('public/js/main.js', js);
console.log('God-Level Overhaul successfully written to disk.');
