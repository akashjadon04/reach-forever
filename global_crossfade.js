const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const globalFadeCss = `
    <!-- GLOBAL 1S THEME CROSSFADE -->
    <style>
        html, body, .main-wrapper, section, header, footer, nav, article, aside, div:not(.cursor-dot):not(.cursor-ring), h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, label, i, svg, path, .bento-card, .process-3d-card, .founder-card {
            transition-property: background-color, background, color, border-color, box-shadow, fill, stroke !important;
            transition-duration: 1s !important;
            transition-timing-function: ease !important;
        }
        /* Ensure 3D cards and their children preserve their transform speed for physics */
        .tilt-card, .tilt-card * {
            transition-property: background-color, background, color, border-color, box-shadow, transform !important;
            transition-duration: 1s, 1s, 1s, 1s, 1s, 0.4s !important;
        }
        /* Exclude cursor and canvas from heavy transitions */
        canvas, .cursor-dot, .cursor-ring {
            transition-duration: 0.1s !important;
        }
    </style>
`;

files.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // Remove the old "STANDARD 1S THEME CROSSFADE" if it exists
    html = html.replace(/<!-- STANDARD 1S THEME CROSSFADE -->[\s\S]*?<\/style>/, '');
    
    // Remove if any older variations exist
    html = html.replace(/<!-- SMOOTH & BOUNCY THEME TRANSITION -->[\s\S]*?<\/style>/, '');

    // Inject the new GLOBAL crossfade right before closing head or body
    if (!html.includes('GLOBAL 1S THEME CROSSFADE')) {
        html = html.replace(/<\/head>/, globalFadeCss + '\\n</head>');
    }

    fs.writeFileSync(filepath, html);
    console.log('Applied global crossfade to ' + file);
});
