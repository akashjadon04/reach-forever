const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. REVERT the reveal-on-scroll CSS change that might have caused the blank screen
const buggyRevealCSS = `.reveal-on-scroll { 
    opacity: 0; 
    transform: perspective(1000px) scale(0.95) rotateX(15deg) translateY(60px); 
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); 
    will-change: transform, opacity; 
    transform-style: preserve-3d;
}
.reveal-on-scroll.revealed {
    opacity: 1;
    transform: perspective(1000px) scale(1) rotateX(0deg) translateY(0);
}`;

const origRevealCSS = `.reveal-on-scroll{opacity:0;transform:translateY(40px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); will-change: transform, opacity;}`;

html = html.replace(buggyRevealCSS, origRevealCSS);

// 2. Fix the JS selectors for the orb
html = html.replace(/const hero = document\.querySelector\('\.hero-section'\);/g, "const hero = document.getElementById('home');");

// Let's also ensure orb has a massive z-index and doesn't get hidden by anything
html = html.replace(/z-index: 9000;/g, 'z-index: 999999;');

fs.writeFileSync('public/index.html', html);
console.log('Fixed blank screen issue and corrected JS selectors.');
