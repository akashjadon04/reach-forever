const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // Remove the literal \n strings caused by escaping error
    html = html.replace(/<head>\\n/g, '<head>\n');
    html = html.replace(/\\n<\/body>/g, '\n</body>');
    html = html.replace(/\\n<\/head>/g, '\n</head>');

    fs.writeFileSync(filepath, html);
    console.log('Fixed literal newlines in ' + file);
});
