const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Force Dark Mode by default on the HTML tag to prevent white flashes
    content = content.replace(/<html lang="en">/i, '<html lang="en" data-theme="dark">');

    fs.writeFileSync(filePath, content);
    console.log(`Forced dark theme on ${file}`);
}
