const fs = require('fs');

function processFile(filename) {
    let html = fs.readFileSync(filename, 'utf8');

    // 1. Change z-index: -1 to z-index: 100
    html = html.replace(/z-index: -1; \/\* In the background! \*\//g, 'z-index: 100; /* Behind main wrapper but over body */');

    // 2. Ensure main-wrapper, header, etc are above the water when animating
    const zindexFix = `
        /* Ensure content stays ABOVE the water */
        body.theme-animating .main-wrapper,
        body.theme-animating header,
        body.theme-animating .mobile-nav {
            position: relative !important;
            z-index: 200 !important;
        }
        /* Make sure html background doesn't interfere, though it shouldn't matter now */
    `;
    
    if(!html.includes('Ensure content stays ABOVE the water')) {
        html = html.replace(/body\.theme-animating \{/, zindexFix + '\n        body.theme-animating {');
    }

    fs.writeFileSync(filename, html);
    console.log('Z-Index fixed for ' + filename);
}

processFile('public/index.html');
processFile('public/services.html');
processFile('public/reviews.html');
