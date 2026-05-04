const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const blockingHeadScript = `
    <!-- CRITICAL THEME SYNC SCRIPT (Must run before CSS loads) -->
    <script>
        (function() {
            // Default to dark mode if no saved theme exists
            const savedTheme = localStorage.getItem('rf-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
        })();
    </script>
`;

files.forEach(file => {
    const filepath = path.join(publicDir, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // 1. Force the HTML tag to default to dark mode
    html = html.replace(/<html[^>]*>/, '<html lang="en" data-theme="dark">');

    // 2. Remove any old Theme Initialization scripts in the head
    html = html.replace(/<!-- Theme Initialization Script -->[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script>\s*\(function\(\)\s*\{\s*const savedTheme = localStorage\.getItem\('rf-theme'\);[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<!-- CRITICAL THEME SYNC SCRIPT.*?-->[\s\S]*?<\/script>/gi, '');

    // 3. Inject the blocking head script exactly after <head> to ensure zero flicker and perfect cross-page sync
    html = html.replace(/<head>/, '<head>\\n' + blockingHeadScript);

    fs.writeFileSync(filepath, html);
    console.log('Synchronized core theme architecture for ' + file);
});
