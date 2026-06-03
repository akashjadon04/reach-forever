const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
console.log('Logo header:', html.includes('src="assets/logo.png"') ? 'OK' : 'MISSING');
console.log('Backend gone:', !html.includes('reach-forever.onrender.com') ? 'OK' : 'STILL THERE');
console.log('Theme toggle gone:', !html.includes('themeToggleDesktop') ? 'OK' : 'STILL THERE');
console.log('Dynamic island gone:', !html.includes('id="dynamicIsland"') ? 'OK' : 'STILL THERE');
console.log('Local engine:', html.includes('LOCAL ASSET ENGINE') ? 'OK' : 'MISSING');
console.log('Light mode forced:', html.includes('Always force light beige') ? 'OK' : 'MISSING');
console.log('File size:', html.length, 'bytes');
