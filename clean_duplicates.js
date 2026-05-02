const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const subPages = ['services.html', 'reviews.html', 'form.html'];

for (const file of subPages) {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove Duplicate Headers if any exist
    const headerRegex = /<div class="header-wrap" id="headerWrap"[\s\S]*?<\/nav>\s*<\/div>/ig;
    const headers = content.match(headerRegex);
    if (headers && headers.length > 1) {
        // Keep only the first one
        let firstDone = false;
        content = content.replace(headerRegex, (match) => {
            if (!firstDone) {
                firstDone = true;
                return match;
            }
            return '';
        });
        console.log(`Cleaned duplicate headers in ${file}`);
    }

    // 2. Add Particles JS to subpages if missing
    if (!content.includes('id="particle-canvas"')) {
        content = content.replace(
            /<div class="main-wrapper"/i, 
            '<canvas id="particle-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;"></canvas>\n    <div class="main-wrapper"'
        );
        console.log(`Injected particle canvas into ${file}`);
    }

    // Initialize particles explicitly
    const particleJs = `
    <!-- PARTICLES INIT -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('particle-canvas');
            if(canvas) {
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                let particles = [];
                for(let i=0; i<40; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 2 + 1,
                        dx: (Math.random() - 0.5) * 0.5,
                        dy: (Math.random() - 0.5) * 0.5
                    });
                }
                function animate() {
                    requestAnimationFrame(animate);
                    ctx.clearRect(0, 0, innerWidth, innerHeight);
                    ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(212, 175, 55, 0.5)';
                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
                        ctx.fill();
                        p.x += p.dx; p.y += p.dy;
                        if(p.x < 0 || p.x > innerWidth) p.dx = -p.dx;
                        if(p.y < 0 || p.y > innerHeight) p.dy = -p.dy;
                    });
                }
                animate();
            }
        });
    </script>
    `;
    if (!content.includes('<!-- PARTICLES INIT -->')) {
        content = content.replace(/<\/body>/i, particleJs + '\n</body>');
        console.log(`Injected particle logic into ${file}`);
    }

    fs.writeFileSync(filePath, content);
}
console.log('Cleanup Complete');
