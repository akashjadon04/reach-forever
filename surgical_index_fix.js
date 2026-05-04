const fs = require('fs');
const path = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Use regex to find the H2 inside parallax-break
const h2Regex = /<h2 data-cms="px_val"[\s\S]*?<\/h2>/;
const newH2 = '<h2 data-cms="px_val" style="font-family: \'Cormorant Garamond\', serif; font-size: clamp(3.5rem, 7vw, 7rem); line-height: 1; margin-bottom: 10px; color: #FFFFFF; background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));">₹85 Lakhs+</h2>';

content = content.replace(h2Regex, newH2);

// Fix the container as well
content = content.replace('px-content apple-stat-reveal', 'px-content');
content = content.replace('position: relative; z-index: 2; text-align: center; color: var(--rf-text);', 'position: relative; z-index: 10; text-align: center; color: #FFFFFF;');

fs.writeFileSync(path, content);
console.log('Index fix applied successfully with regex');
