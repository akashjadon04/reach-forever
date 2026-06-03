const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
console.log('hero index:', html.indexOf('<div class="hero-text" id="hero-text-module"'));
console.log('arsenal index:', html.indexOf('<div class="arsenal-grid"'));
