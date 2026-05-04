const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // 1. Remove orphaned broken script tags left from regex replacements
    html = html.replace(/<script>\s*\/\/\s*THEME TOGGLE LOGIC\s*\\n/g, '');
    html = html.replace(/<script>\s*\/\/\s*THEME TOGGLE LOGIC\s*\n/g, '');
    
    // Sometimes there's just <script> \n \n <script>
    html = html.replace(/<script>\s*\n\s*<!-- UNIVERSAL/g, '<!-- UNIVERSAL');
    html = html.replace(/<script>\s*\/\/\s*THEME TOGGLE LOGIC\s*<!-- UNIVERSAL/g, '<!-- UNIVERSAL');

    // Remove any rogue literal \n strings anywhere near script tags
    html = html.replace(/\\n\s*<!--/g, '\n<!--');

    fs.writeFileSync(filepath, html);
    console.log('Cleaned HTML syntax in ' + file);
});
