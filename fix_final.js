const fs = require('fs');

// --- 1. INDEX.HTML FIXES ---
let html = fs.readFileSync('public/index.html', 'utf8');

// Fix the video fetch issue (bypass fetch to avoid file:// protocol cors issues)
const fetchScript = `
    const videos = [];
    for(let i=1; i<=20; i++){
        const url = 'assets/video_'+i+'.mp4';
        try {
            const res = await fetch(url, {method:'HEAD'});
            if(res.ok) videos.push(url);
            else break;
        } catch(e){ break; }
    }`;
const hardcodedVideos = `
    const videos = [
        'assets/video_1.mp4', 'assets/video_2.mp4', 'assets/video_3.mp4',
        'assets/video_4.mp4', 'assets/video_5.mp4', 'assets/video_6.mp4',
        'assets/video_7.mp4', 'assets/video_8.mp4', 'assets/video_9.mp4',
        'assets/video_10.mp4', 'assets/video_11.mp4', 'assets/video_12.mp4',
        'assets/video_13.mp4'
    ];
`;
html = html.replace(fetchScript, hardcodedVideos);

// Add ?v=3 to style.css to force cache refresh (fixes invisible cursor if cached)
html = html.replace(/<link rel="stylesheet" href="css\/style\.css(\?v=\d+)?">/, '<link rel="stylesheet" href="css/style.css?v=3">');

// Fix text visibility of story section (the white on white issue)
// The text was: color:transparent; background:linear-gradient(to right,#FFFFFF 50%,rgba(0,0,0,.1) 50%);
html = html.replace(/#FFFFFF 50%/g, '#1A1C20 50%');

// Fix Arsenal Section (Digital Marketing Services)
// Let's add nice elegant colors to them instead of pure white/transparent.
// .bento-item needs a colored gradient. I'll add an inline style or replace class.
html = html.replace(/<div class="bento-item bi-large"/, '<div class="bento-item bi-large" style="background: linear-gradient(135deg, #D4AF37 0%, #C8A96E 100%); color: #FFF; border: none; box-shadow: 0 10px 30px rgba(212,175,55,0.3);"');
html = html.replace(/<div class="bento-item bi-med"/, '<div class="bento-item bi-med" style="background: linear-gradient(135deg, #556B2F 0%, #3d4f21 100%); color: #FFF; border: none; box-shadow: 0 10px 30px rgba(85,107,47,0.3);"');
html = html.replace(/<div class="bento-item bi-small"/, '<div class="bento-item bi-small" style="background: linear-gradient(135deg, #1877F2 0%, #1059b8 100%); color: #FFF; border: none; box-shadow: 0 10px 30px rgba(24,119,242,0.3);"');
html = html.replace(/<div class="bento-item bi-tall"/, '<div class="bento-item bi-tall" style="background: linear-gradient(135deg, #222 0%, #111 100%); color: #FFF; border: none; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"');
html = html.replace(/<div class="bento-item bi-wide"/, '<div class="bento-item bi-wide" style="background: linear-gradient(135deg, #FF3B30 0%, #d42218 100%); color: #FFF; border: none; box-shadow: 0 10px 30px rgba(255,59,48,0.3);"');

// For the bento-items, the inline styles had `color:var(--text-dark, #1A1C20)`. Let's remove those so #FFF inherits, or force #FFF.
html = html.replace(/color:var\(--text-dark, #1A1C20\)/g, 'color:inherit');

// Also give the blueprint-section cards a soft colored graphic.
html = html.replace(/<div class="bp-card reveal-up" style="flex:1;background:var\(--bg-surface, rgba\(255,255,255,\.6\)\)/g, '<div class="bp-card reveal-up" style="flex:1;background:linear-gradient(135deg, #E6E1CE 0%, #D8D0BA 100%);border:none;color:#1A1C20;');

// Also remove cursor:none from html if it accidentally exists
html = html.replace(/cursor:\s*none;?/g, 'cursor: pointer;');

fs.writeFileSync('public/index.html', html);


// --- 2. STYLE.CSS FIXES ---
let css = fs.readFileSync('public/css/style.css', 'utf8');

// The user wants bg off-white, and not so bright.
// Base colors in CSS: --bg-base: #FDFDFB -> change to #F4F4F0.
css = css.replace(/--bg-base: #FDFDFB;/g, '--bg-base: #F4F4F0;');
css = css.replace(/--bg-surface: #FFF;/g, '--bg-surface: #EBEBE4;');

// Make absolutely sure there's no cursor:none anywhere
css = css.replace(/cursor:\s*none\s*!important;?/gi, 'cursor: pointer !important;');
css = css.replace(/cursor:\s*none;?/gi, 'cursor: pointer;');

fs.writeFileSync('public/css/style.css', css);

console.log('Final fixes applied to index.html and style.css.');
