const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

let arsStart = html.indexOf('<div class="ars-container"');
let arsEnd = html.indexOf('</section>', arsStart);
if(arsStart !== -1 && arsEnd !== -1) {
    let arsBlock = html.substring(arsStart, arsEnd);
    arsBlock = arsBlock.replace(/color:var\(--text-muted, #6B7280\)/g, 'color:rgba(255,255,255,0.9)');
    
    // Also change the icon wrappers to a translucent white so they look good on any colored background
    arsBlock = arsBlock.replace(/background:rgba\(\d+,\d+,\d+,\.1[25]\)/g, 'background:rgba(255,255,255,0.2)');
    // Change icon colors to white inside the cards
    arsBlock = arsBlock.replace(/color:#[0-9A-Fa-f]{6}/g, 'color:#FFF');

    html = html.substring(0, arsStart) + arsBlock + html.substring(arsEnd);
}

fs.writeFileSync('public/index.html', html);
console.log('Fixed ars-card text contrast.');
