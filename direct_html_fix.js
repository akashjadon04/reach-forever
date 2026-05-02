const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const subPages = ['services.html', 'reviews.html', 'form.html'];

for (const file of subPages) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the localized :root variables entirely so it inherits from overhaul-vars.css
    content = content.replace(/:root\s*\{[\s\S]*?\-\-glass-border:[^\}]*\}/i, '');

    // Replace all instances of localized variables with master variables
    content = content.replace(/var\(--bg-main\)/g, 'var(--rf-bg)');
    content = content.replace(/var\(--bg-surface\)/g, 'var(--rf-surface)');
    content = content.replace(/var\(--text-dark\)/g, 'var(--rf-text)');
    content = content.replace(/var\(--text-muted\)/g, 'var(--rf-muted)');

    // Replace hardcoded white backgrounds with the dynamic surface variable
    // This allows them to be white in Light Mode, and dark in Dark Mode
    content = content.replace(/background:\s*#FFF(?:FFF)?/gi, 'background: var(--rf-surface)');
    content = content.replace(/background-color:\s*#FFF(?:FFF)?/gi, 'background-color: var(--rf-surface)');

    // Remove specific hardcoded box shadows that might look weird on dark mode
    // (Optional, but replacing rgba(0,0,0,0.05) with var(--rf-glow) or keeping it is fine, 
    // the main issue is the background colors)

    fs.writeFileSync(filePath, content);
    console.log(`Sanitized inline CSS in ${file}`);
}
console.log('HTML Direct Fix Complete');
