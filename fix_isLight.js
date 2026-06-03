const fs = require('fs');
let js = fs.readFileSync('public/js/main.js', 'utf8');

// Replace all occurrences of isLight with true
js = js.replace(/isLight/g, 'true');

fs.writeFileSync('public/js/main.js', js);
console.log('Fixed ReferenceError in main.js');
