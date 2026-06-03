const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// The goal is to remove dark backgrounds and fix text contrast.
html = html.replace(/var\(--bg-main, #05020A\)/g, 'var(--bg-base, #FDFDFB)');
html = html.replace(/var\(--bg-panel, rgba\(15,8,25,\.6\)\)/g, 'var(--bg-surface, rgba(255,255,255,.6))');
html = html.replace(/var\(--bg-panel, rgba\(15,8,25,\.8\)\)/g, 'var(--bg-surface, rgba(255,255,255,.8))');
html = html.replace(/var\(--bg-panel, rgba\(10,11,14,\.85\)\)/g, 'var(--bg-surface, rgba(255,255,255,.85))');

html = html.replace(/rgba\(15,8,25,\.6\)/g, 'rgba(255,255,255,.6)');
html = html.replace(/rgba\(15,8,25,\.7\)/g, 'rgba(255,255,255,.7)');
html = html.replace(/rgba\(15,8,25,\.95\)/g, 'rgba(255,255,255,.95)');
html = html.replace(/rgba\(5,2,10,\.96\)/g, 'rgba(255,255,255,.96)');

html = html.replace(/rgba\(255,255,255,\.08\)/g, 'rgba(0,0,0,.08)');
html = html.replace(/rgba\(255,255,255,\.07\)/g, 'rgba(0,0,0,.07)');
html = html.replace(/rgba\(255,255,255,\.06\)/g, 'rgba(0,0,0,.06)');
html = html.replace(/rgba\(255,255,255,\.04\)/g, 'rgba(0,0,0,.04)');
html = html.replace(/rgba\(255,255,255,\.1\)/g, 'rgba(0,0,0,.1)');
html = html.replace(/rgba\(255,255,255,\.2\)/g, 'rgba(0,0,0,.2)');

// iPhone mockup container background and faces
html = html.replace(/background:#1a1a1a/g, 'background:#f4f4f0');
html = html.replace(/background:#000/g, 'background:#fff');

// Audio Indicator
html = html.replace(/background:rgba\(0,0,0,\.8\)/g, 'background:rgba(255,255,255,.8)');

// Dynamic Island
html = html.replace(/background: rgba\(0,0,0,0\.9\)/g, 'background: rgba(255,255,255,0.9)');

// Replace undefined --rf-text and --rf-muted
html = html.replace(/var\(--rf-text, #FFF\)/g, 'var(--text-dark, #1A1C20)');
html = html.replace(/var\(--rf-text, #fff\)/g, 'var(--text-dark, #1A1C20)');
html = html.replace(/var\(--rf-text\)/g, 'var(--text-dark, #1A1C20)');

html = html.replace(/var\(--rf-muted, #B0B0C0\)/g, 'var(--text-muted, #6B7280)');
html = html.replace(/var\(--rf-muted, #A0A0A0\)/g, 'var(--text-muted, #6B7280)');
html = html.replace(/var\(--rf-muted\)/g, 'var(--text-muted, #6B7280)');

// Hardcoded text colors on sections that were dark
html = html.replace(/color:#FFF/g, 'color:var(--text-dark, #1A1C20)');
html = html.replace(/color:#fff/g, 'color:var(--text-dark, #1A1C20)');

// We MUST put back color:#FFF for buttons which have colored backgrounds.
html = html.replace(/color:var\(--text-dark, #1A1C20\);padding:12px 25px/g, 'color:#FFF;padding:12px 25px');
html = html.replace(/color:var\(--text-dark, #1A1C20\);padding:12px 28px/g, 'color:#FFF;padding:12px 28px');
html = html.replace(/color:var\(--text-dark, #1A1C20\);padding:16px 36px/g, 'color:#FFF;padding:16px 36px');
html = html.replace(/color:var\(--text-dark, #1A1C20\);border-radius:100px;font-family:'Outfit'/g, 'color:#FFF;border-radius:100px;font-family:\'Outfit\'');
html = html.replace(/\.msg\.user\{background:linear-gradient\(135deg,#9047FF 0%,#435525 100%\);box-shadow:0 5px 15px rgba\(85,107,47,\.3\);color:var\(--text-dark, #1A1C20\)\}/g, '.msg.user{background:linear-gradient(135deg,#9047FF 0%,#435525 100%);box-shadow:0 5px 15px rgba(85,107,47,.3);color:#FFF}');

// WA Float
html = html.replace(/\.wa-float\{.*color:var\(--text-dark, #1A1C20\)!important;.*\}/, function(match) { return match.replace(/color:var\(--text-dark, #1A1C20\)/g, 'color:#fff'); });


fs.writeFileSync('public/index.html', html);
console.log('Colors replaced.');
