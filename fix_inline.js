const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace(/data-theme="dark"/, 'data-theme="light"');
html = html.replace(/var\(--bg-main, #05020A\)/g, 'var(--bg-main, #F4F4F0)');
// the cards have a dark gradient #05020A
html = html.replace(/background:var\(--bg-panel, rgba\(15,8,25,\.6\)\)/g, 'background:var(--bg-panel, rgba(255,255,255,0.7))');
fs.writeFileSync('public/index.html', html);
console.log('Fixed inline vars.');
