const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // Remove empty unclosed scripts like <!-- TRUE THEME LOGIC INJECTION --> <script> \s* <!--
    html = html.replace(/<!-- TRUE THEME LOGIC INJECTION -->\s*<script>\s*<!--/g, '<!--');
    
    // Remove isolated literal \n strings
    html = html.replace(/\\n/g, ''); // Remove literal \n strings entirely from the file (safe since we don't need literal \n in HTML)
    
    // Remove unclosed script tags before UNIVERSAL THEME TOGGLE
    html = html.replace(/<script>\s*<!-- UNIVERSAL THEME TOGGLE SCRIPT -->/g, '<!-- UNIVERSAL THEME TOGGLE SCRIPT -->');

    fs.writeFileSync(filepath, html);
    console.log('Cleaned syntax in ' + file);
});
