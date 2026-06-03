const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Fix the video fetch by using a regex to replace the entire block
html = html.replace(/const videos = \[\];\s*for\(let i=1; i<=20; i\+\+\)\{[\s\S]*?\} catch\(e\)\{ break; \}\s*\}/, `const videos = [
        'assets/video_1.mp4', 'assets/video_2.mp4', 'assets/video_3.mp4',
        'assets/video_4.mp4', 'assets/video_5.mp4', 'assets/video_6.mp4',
        'assets/video_7.mp4', 'assets/video_8.mp4', 'assets/video_9.mp4',
        'assets/video_10.mp4', 'assets/video_11.mp4', 'assets/video_12.mp4',
        'assets/video_13.mp4'
    ];`);

// 2. Fix the graphics colors (ars-card)
// I will replace `background:var(--bg-surface, rgba(255,255,255,.6))` with beautiful gradients.
// Since there are multiple, I will replace them one by one.
const gradients = [
    'linear-gradient(135deg, #1A1C20 0%, #111 100%)', // Very Dark Elegant (Wait, user said no black. I will use rich colors)
    'linear-gradient(135deg, #D4AF37 0%, #C8A96E 100%)', // Gold
    'linear-gradient(135deg, #556B2F 0%, #3d4f21 100%)', // Olive
    'linear-gradient(135deg, #1877F2 0%, #1059b8 100%)', // Blue
    'linear-gradient(135deg, #FF3B30 0%, #d42218 100%)', // Red
    'linear-gradient(135deg, #8A2BE2 0%, #5d16a1 100%)', // Purple
    'linear-gradient(135deg, #14B8A6 0%, #0d8073 100%)'  // Teal
];

// Let's replace the inline style of `.ars-card`
let i = 1;
html = html.replace(/background:var\(--bg-surface, rgba\(255,255,255,\.6\)\)/g, () => {
    let grad = gradients[i % gradients.length];
    i++;
    return 'background:' + grad;
});

// Since the cards now have rich colors, the text inside them MUST be white so it's visible!
// Look for `color:var(--text-dark, #1A1C20)` inside the ars-container block and replace with `#FFF`.
// I will just globally replace `color:var(--text-dark, #1A1C20)` to `#FFF` inside the `.ars-card` elements?
// Actually, it's safer to just replace it generally where it applies to headers inside those cards.
// But a simpler way: just replace it across the whole ars-container.
let arsStart = html.indexOf('<div class="ars-container"');
let arsEnd = html.indexOf('</section>', arsStart);
if(arsStart !== -1 && arsEnd !== -1) {
    let arsBlock = html.substring(arsStart, arsEnd);
    arsBlock = arsBlock.replace(/color:var\(--text-dark, #1A1C20\)/g, 'color:#FFF');
    html = html.substring(0, arsStart) + arsBlock + html.substring(arsEnd);
}

// Ensure the CSS file cache is refreshed
html = html.replace(/href="css\/style\.css(\?v=\d+)?"/, 'href="css/style.css?v=4"');

// Ensure performance is 100 by deferring images/videos? They are already lazy loaded or deferred.
// Let's just make sure there are no other white graphics.
// "blueprint-section" cards `.bp-card`:
html = html.replace(/background:linear-gradient\(135deg, #E6E1CE 0%, #D8D0BA 100%\);/g, 'background:linear-gradient(135deg, #D4AF37 0%, #C8A96E 100%);color:#FFF;');
html = html.replace(/background:var\(--bg-surface, rgba\(255,255,255,\.6\)\)/g, 'background:linear-gradient(135deg, #D4AF37 0%, #C8A96E 100%);color:#FFF;');

fs.writeFileSync('public/index.html', html);
console.log('Fixed fetch and colors.');
