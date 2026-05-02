const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public', 'css', 'dark-overhaul.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const forceVars = `
/* FORCE SUB-PAGE VARIABLES TO SYNC WITH DARK MODE */
[data-theme="dark"] {
    --bg-main: #0A0A0F !important;
    --bg-surface: #14141F !important;
    --text-dark: #F5F0E8 !important;
    --text-muted: #8A8A95 !important;
    --glass-border: rgba(200,169,110,0.15) !important;
}
`;

if (!cssContent.includes('FORCE SUB-PAGE VARIABLES TO SYNC WITH DARK MODE')) {
    cssContent += forceVars;
    fs.writeFileSync(cssPath, cssContent);
    console.log('Appended dark mode variable overrides to dark-overhaul.css');
}
