const fs = require('fs');

const file = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the Parallax Text Visibility & Encoding
// Remove 'apple-stat-reveal' class so it doesn't get hidden by GSAP if ScrollTrigger fails
// Replace the ?85 with &#8377;85 (₹85)
content = content.replace(/class="px-content apple-stat-reveal"/g, 'class="px-content"');
content = content.replace(/>\?85 Lakh\+</g, '>&#8377;85 Lakh+<');

// 2. ABSOLUTE FOOLPROOF Light Mode Text Visibility
// We will inject a brute-force CSS override that forces black text in light mode for the Growth Engine
const textFixCss = `
        /* BRUTE FORCE LIGHT MODE TEXT FIX */
        html[data-theme="light"] .ge-text h2, 
        html[data-theme="light"] .ge-text p,
        html[data-theme="light"] .ge-desc p,
        html[data-theme="light"] .ge-feat,
        html[data-theme="light"] .ge-feat span,
        html[data-theme="light"] .ars-title,
        html[data-theme="light"] .ars-desc,
        html[data-theme="light"] .msg.ai {
            color: #1A1A2E !important;
        }
        html[data-theme="light"] .ge-text p,
        html[data-theme="light"] .ars-desc {
            color: #4A4A5E !important; /* Slightly muted for paragraphs */
        }
`;
if (!content.includes('BRUTE FORCE LIGHT MODE TEXT FIX')) {
    content = content.replace(/<\/style>/, textFixCss + '\n    </style>');
}

fs.writeFileSync(file, content);
console.log('Final foolproof patches applied.');
