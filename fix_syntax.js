const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// The broken function signature is:
// function {
//     const di = document.getElementById('dynamicIsland');

// Let's find this block and remove it entirely.
const startStr = 'function {\\n    const di = document.getElementById(\\'dynamicIsland\\');';
const startIdx = html.indexOf('function {\\r\\n    const di = document.getElementById(\\'dynamicIsland\\');'); // Windows line endings
const startIdx2 = html.indexOf('function {\\n    const di = document.getElementById(\\'dynamicIsland\\');');

if (html.includes("function {") && html.includes("const di = document.getElementById('dynamicIsland');")) {
    // We will use a regex to match the broken function block
    // It looks like:
    // function {
    //     const di = document.getElementById('dynamicIsland');
    //     ...
    //     }, 3000);
    // }
    
    html = html.replace(/function\s*\{\s*const di = document\.getElementById\('dynamicIsland'\);[\s\S]*?\},\s*3000\);\s*\}/, '');
    
    // Let's also check for any remaining `function {` blocks just in case
    html = html.replace(/function\s*\{\s*\n\s*const di = document/g, 'function deleted_triggerIsland() {\n    const di = document');
}

// Since we are forcing light mode, let's also fix the themeToggleDesktop/Mobile logic just in case it's broken
html = html.replace(/function\s*\{\s*\n\s*const html=document\.documentElement;/g, 'function toggle() {\n        const html=document.documentElement;');

fs.writeFileSync('public/index.html', html);
console.log('Syntax error patched in index.html');
