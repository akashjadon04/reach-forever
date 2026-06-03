const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
    const t = l.trim();
    if (t.includes('<nav') || t.includes('header-wrap') || t.includes('<header') || 
        t.includes('id="home"') || t.includes('main-wrapper') || t.includes('hero-section') ||
        t.includes('class="navbar') || t.includes('nav-brand') || t.includes('id="preloader"') ||
        t.includes('section id=') || t.includes('switchCylinder') || t.includes('ba-container') ||
        t.includes('s2Wrapper') || t.includes('hero-grid')) {
        console.log((i+1) + ': ' + t.slice(0, 140));
    }
});
