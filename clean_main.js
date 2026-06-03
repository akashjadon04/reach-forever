const fs = require('fs');
let js = fs.readFileSync('public/js/main.js', 'utf8');

// The class starts with `class QuantumParticleEngine {` and ends before `/* ================================================================` (the REELS MODAL section).
const classStart = js.indexOf('class QuantumParticleEngine');
const nextSection = js.indexOf('/* ================================================================', classStart);
if (classStart !== -1 && nextSection !== -1) {
    // Remove the class definition and instantiation
    js = js.substring(0, classStart) + js.substring(nextSection);
}
// Remove the instantiation at the bottom of the DOMContentLoaded block
js = js.replace(/const engine = new QuantumParticleEngine\(\);\s*engine\.init\(\);/, '');

// Remove Theme Switch Logic
js = js.replace(/const themeSwitch = document\.getElementById\('themeSwitch'\);[\s\S]*?\}\);/g, '');

// Apply the fastFetchJS
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

fs.writeFileSync('public/js/main.js', js);
console.log('Cleaned main.js');
