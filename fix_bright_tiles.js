const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Dim down the bright white backgrounds of the main section tiles (arsenal, xray, reels)
html = html.replace(/background:var\(--bg-base, #FDFDFB\)/g, 'background:linear-gradient(135deg, #F0EFE9 0%, #E6E1CE 100%)');

fs.writeFileSync('public/index.html', html);
console.log('Fixed overly bright section tiles.');
