const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const subPages = ['services.html', 'reviews.html', 'form.html'];

const cssLinks = `
    <!-- MASTER OVERHAUL STYLES -->
    <link rel="stylesheet" href="css/overhaul-vars.css">
    <link rel="stylesheet" href="css/dark-overhaul.css">
`;

for (const file of subPages) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Inject CSS Links if not present
    if (!content.includes('href="css/dark-overhaul.css"')) {
        content = content.replace(/<\/head>/i, cssLinks + '\n</head>');
        console.log(`Injected CSS links into ${file}`);
    }

    // 2. Remove the old broken footer that's conflicting with the premium footer
    // Look for <footer class="footer-fixed"...> down to its closing </footer>
    // Wait, the old footer in services.html starts with <footer class="footer-fixed" id="contact">
    content = content.replace(/<footer class="footer-fixed"[^>]*>[\s\S]*?<div class="footer-engineered">made by <span>zyrova digital<\/span><\/div>\s*<\/footer>/ig, '');
    
    // Also try a broader regex if it fails
    content = content.replace(/<footer class="footer-fixed"[^>]*>[\s\S]*?<\/footer>/ig, (match) => {
        if(match.includes('premium-footer')) return match; // don't delete new one just in case
        return '';
    });

    // Remove the old `<style>` variable block if it's explicitly breaking things,
    // actually, `dark-overhaul.css` will override it now that it's linked AFTER the inline style (because we inject right before `</head>`).
    
    fs.writeFileSync(filePath, content);
}
console.log('CSS Link Injection & Cleanup Complete');
