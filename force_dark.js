const fs = require('fs');
const path = require('path');

const cssFile = path.join('c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\css\\dark-overhaul.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');

const nuclearFix = `
/* ==========================================================================
   NUCLEAR BACKGROUND FIX FOR SUBPAGES
   ========================================================================== */
html[data-theme="dark"], 
html[data-theme="dark"] body, 
html[data-theme="dark"] .main-wrapper, 
html[data-theme="dark"] .services-hero,
html[data-theme="dark"] .section-pad,
html[data-theme="dark"] .section-2-wrapper,
html[data-theme="dark"] .story-section {
    background-color: #05020A !important;
    background: #05020A !important;
}

html[data-theme="light"] body,
html[data-theme="light"] .main-wrapper,
html[data-theme="light"] .services-hero {
    background-color: #FAFAF7 !important;
    background: #FAFAF7 !important;
}
`;

if (!cssContent.includes('NUCLEAR BACKGROUND FIX FOR SUBPAGES')) {
    fs.appendFileSync(cssFile, nuclearFix);
    console.log('Appended nuclear background fix to dark-overhaul.css');
}
