const fs = require('fs');

const file = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Foolproof Particle System Hide (Light Mode)
const foolproofCss = `
        /* FOOLPROOF LIGHT MODE PARTICLES HIDE */
        html[data-theme="light"] #gold-dust-canvas { display: none !important; }
        
        /* FOOLPROOF MOBILE GRID */
        @media (max-width: 1024px) {
            .ars-container { display: flex !important; flex-direction: column !important; gap: 20px !important; }
            .ars-card { margin-bottom: 10px !important; }
        }
`;
if (!content.includes('FOOLPROOF LIGHT MODE PARTICLES HIDE')) {
    content = content.replace(/<\/style>/, foolproofCss + '\n    </style>');
}

// 2. Fix the ₹85 Lakh+ Text 
// Find exactly <h2 data-cms="px_val"...>...</h2>
const pxRegex = /<h2 data-cms="px_val"[^>]*>[\s\S]*?<\/h2>/;
const newPx = `<h2 data-cms="px_val" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 8vw, 7.5rem); color: var(--rf-text); line-height: 1; margin-bottom: 10px; text-shadow: 0 20px 40px rgba(0,0,0,0.9); font-weight: 700;">₹85 Lakh+</h2>`;
content = content.replace(pxRegex, newPx);

// 3. Fix Growth Engine Text in Light Theme
// Wait, my previous script `.replace(/\.ge-text h2 \{[^}]*\}/...` worked.
// But maybe the `index.html` inline styles also have hardcoded `#FFF` in the HTML tags themselves?
// Let's check if the HTML tags have `style="color: #FFF"`
content = content.replace(/<h2 data-cms="ge_title"[^>]*>/, `<h2 data-cms="ge_title" style="color: var(--rf-text); font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 1.1; margin-bottom: 20px;">`);
content = content.replace(/<p data-cms="ge_desc"[^>]*>/, `<p data-cms="ge_desc" style="color: var(--rf-muted); font-family: 'Outfit', sans-serif; font-size: 1.15rem; line-height: 1.6; margin-bottom: 30px;">`);
// For ge-feat spans
content = content.replace(/<div class="ge-feat"><i class="ri-check-double-line"><\/i>\s*<span data-cms="ge_feat_1">/g, `<div class="ge-feat" style="color: var(--rf-text);"><i class="ri-check-double-line"></i> <span data-cms="ge_feat_1">`);
content = content.replace(/<div class="ge-feat"><i class="ri-check-double-line"><\/i>\s*<span data-cms="ge_feat_2">/g, `<div class="ge-feat" style="color: var(--rf-text);"><i class="ri-check-double-line"></i> <span data-cms="ge_feat_2">`);
content = content.replace(/<div class="ge-feat"><i class="ri-check-double-line"><\/i>\s*<span data-cms="ge_feat_3">/g, `<div class="ge-feat" style="color: var(--rf-text);"><i class="ri-check-double-line"></i> <span data-cms="ge_feat_3">`);

// 4. Force Before/After Slider Draggable Fix
content = content.replace(/class="ba-img-after"[^>]*>/g, match => {
    if(!match.includes('draggable="false"')) return match.replace('>', ' draggable="false">');
    return match;
});
content = content.replace(/class="ba-img-before"[^>]*>/g, match => {
    if(!match.includes('draggable="false"')) return match.replace('>', ' draggable="false">');
    return match;
});

// Also, the user mentioned text not turning dark in light mode globally.
// I will just wipe out ALL `color: #FFF` and `color: #FFFFFF` inside the CSS block.
// We only want `#FFF` on buttons.
let cssBlockMatch = content.match(/<style>([\s\S]*?)<\/style>/);
if (cssBlockMatch) {
    let cssBlock = cssBlockMatch[1];
    // Specific elements to fix
    cssBlock = cssBlock.replace(/\.ge-text\s*h2\s*\{\s*color:\s*#FFF;/g, '.ge-text h2 { color: var(--rf-text);');
    cssBlock = cssBlock.replace(/\.ge-text\s*p\s*\{\s*color:\s*rgba\(255,255,255,0\.7\);/g, '.ge-text p { color: var(--rf-muted);');
    cssBlock = cssBlock.replace(/\.ge-feat\s*\{\s*color:\s*#FFF;/g, '.ge-feat { color: var(--rf-text);');
    cssBlock = cssBlock.replace(/\.ge-ui-text\s*h4\s*\{\s*color:\s*rgba\(255,255,255,0\.7\);/g, '.ge-ui-text h4 { color: var(--rf-muted);');
    cssBlock = cssBlock.replace(/\.ge-ui-text\s*span\s*\{\s*color:\s*#FFF;/g, '.ge-ui-text span { color: var(--rf-text);');
    cssBlock = cssBlock.replace(/\.msg\.ai\s*\{\s*color:\s*#FFF;/g, '.msg.ai { color: var(--rf-text);');
    content = content.replace(cssBlockMatch[1], cssBlock);
}

fs.writeFileSync(file, content);
console.log('Fixed index.html remaining client rejection issues.');
