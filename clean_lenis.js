const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Strip script tags with lenis
html = html.replace(/<script[^>]*lenis[^>]*><\/script>/gi, '');

// Strip lenis instantiation block
const lenisStart = html.indexOf("if(typeof Lenis !== 'undefined'){");
if (lenisStart !== -1) {
    const lenisEnd = html.indexOf("window._lenis = lenis;", lenisStart) + 400; 
    // Just remove everything up to a certain point, or regex it without bad escapes
    html = html.replace(/if\(typeof Lenis !== 'undefined'\)\{[\s\S]*?\}\s*\},400\);\s*\};/, '');
}

// Strip leftover calls
html = html.replace(/window\._lenis = null;/g, '');
html = html.replace(/if\(window\._lenis\) window\._lenis\.stop\(\);/g, '');
html = html.replace(/if\(window\._lenis\) window\._lenis\.start\(\);/g, '');
html = html.replace(/if\(window\._lenis\) window\._lenis\.scrollTo\(0,\{immediate:true\}\);/g, '');

fs.writeFileSync('public/index.html', html);
console.log('Lenis removed.');
