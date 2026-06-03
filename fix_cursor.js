const fs = require('fs');

let css = fs.readFileSync('public/css/style.css', 'utf8');
css = css.replace(/cursor:\s*none;?/g, 'cursor: pointer;');
fs.writeFileSync('public/css/style.css', css);

console.log('Cursor fixed.');
