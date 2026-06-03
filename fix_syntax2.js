const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Fix the dynamicIsland syntax error
// We want to replace "function {" followed by "const di = document.getElementById('dynamicIsland');"
// with an empty string up to its closing brace.
html = html.replace(/function\s*\{\s*const di = document\.getElementById\('dynamicIsland'\);[\s\S]*?\}, 3000\);\s*\}/g, '');

// Also fix the theme toggle syntax error: "function {" followed by "const html=document.documentElement;"
html = html.replace(/function\s*\{\s*const html=document\.documentElement;/g, 'function toggle() {\n        const html=document.documentElement;');

fs.writeFileSync('public/index.html', html);
console.log('Syntax error patched in index.html');
