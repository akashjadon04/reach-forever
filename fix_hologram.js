const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// The current logic in index.html for switchCylinder is roughly:
// window.switchCylinder = function(platform){
//     const prefixMap = {ig:'ig', fb:'fb', go:'gl', web:'wb'};
//     const prefix = prefixMap[platform] || platform;
//     ...
// }

const switchRegex = /window\.switchCylinder\s*=\s*function\(platform\)\{([\s\S]*?)const prefix = prefixMap\[platform\] \|\| platform;/;
if (switchRegex.test(html)) {
    const updateLogic = `
        const prefix = prefixMap[platform] || platform;
        // God-Level Feature: Swap the 6 cylinder images based on the active platform
        for (let i = 1; i <= 6; i++) {
            const img = document.getElementById('cyl-img-' + i);
            if (img) {
                img.src = 'assets/' + prefix + '_' + i + '.png';
            }
        }
`;
    html = html.replace(/const prefix = prefixMap\[platform\] \|\| platform;/, updateLogic);
    fs.writeFileSync('public/index.html', html);
    console.log('Hologram swap logic injected into index.html');
} else {
    console.log('Regex failed to match switchCylinder in index.html');
}
