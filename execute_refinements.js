const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const cssPath = path.join(publicDir, 'css', 'dark-overhaul.css');

// --- 1. CSS FIXES (Tap to Watch & Services Smoothness) ---
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('/* Tap to Watch Light Mode Fix */')) {
    css += `
/* Tap to Watch Light Mode Fix */
[data-theme="light"] #audioIndicator {
    background: rgba(255, 255, 255, 0.9) !important;
    color: #1A1C20 !important;
    border-color: rgba(0,0,0,0.1) !important;
}

/* Reviews section light mode text fixes */
[data-theme="light"] .reviews-section h2,
[data-theme="light"] .reviews-section p,
[data-theme="light"] .reviews-section span,
[data-theme="light"] .rc-content {
    color: #1A1C20 !important;
}
[data-theme="light"] .review-card {
    background: #FFFFFF !important;
    border-color: rgba(0,0,0,0.1) !important;
}
[data-theme="light"] .rc-name {
    color: #1A1C20 !important;
}
[data-theme="light"] .rc-role {
    color: #6B7280 !important;
}
`;
}
fs.writeFileSync(cssPath, css);


// --- 2. HTML FIXES (Particles, Nav Active State, Services 3D) ---
const htmlFiles = ['index.html', 'services.html', 'reviews.html'];

const optimalParticleScript = `
    <!-- OPTIMIZED PARTICLE ENGINE -->
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
                function animateParticles() {
                    if(document.documentElement.getAttribute('data-theme') === 'light') { 
                        ctx.clearRect(0, 0, canvas.width, canvas.height); 
                        requestAnimationFrame(animateParticles); 
                        return; 
                    }
                    ctx.clearRect(0, 0, innerWidth, innerHeight);
                    ctx.fillStyle = \`rgba(212, 175, 55, 0.4)\`;
                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
                        ctx.fill();
                        p.x += p.dx; p.y += p.dy;
                        if(p.x < 0 || p.x > innerWidth) p.dx = -p.dx;
                        if(p.y < 0 || p.y > innerHeight) p.dy = -p.dy;
                    });
                    requestAnimationFrame(animateParticles);
                }
                animateParticles();
            }
        });
    </script>
`;

htmlFiles.forEach(file => {
    let htmlPath = path.join(publicDir, file);
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Remove old particle scripts
    html = html.replace(/<!-- PARTICLES INIT -->[\s\S]*?<\/script>/, '');
    html = html.replace(/<!-- OPTIMIZED PARTICLE ENGINE -->[\s\S]*?<\/script>/, '');
    
    // Also remove the inline script if it exists in index.html (the one with // 4. GOLDEN DUST PARTICLE SYSTEM)
    html = html.replace(/\/\/ 4\. GOLDEN DUST PARTICLE SYSTEM \(Optimized\)[\s\S]*?requestAnimationFrame\(animateParticles\);\s*\}\s*animateParticles\(\);\s*\}/, '');

    // Inject optimal particle script before UNIVERSAL THEME TOGGLE
    html = html.replace(/(<!-- UNIVERSAL THEME TOGGLE SCRIPT -->)/, optimalParticleScript.trim() + '\n\n    $1');

    // NAV ACTIVE STATES FIX
    // Reset all nav links
    html = html.replace(/class="active" data-cms="nav_home"/g, 'data-cms="nav_home"');
    html = html.replace(/class="active" data-cms="nav_services"/g, 'data-cms="nav_services"');
    html = html.replace(/class="active" data-cms="nav_reviews"/g, 'data-cms="nav_reviews"');

    // Apply specific active class based on file
    if (file === 'index.html') {
        html = html.replace(/data-cms="nav_home"/g, 'class="active" data-cms="nav_home"');
    } else if (file === 'services.html') {
        html = html.replace(/data-cms="nav_services"/g, 'class="active" data-cms="nav_services"');
        
        // SERVICES 3D SMOOTHNESS REWRITE
        html = html.replace(/transition: all 1\.2s cubic-bezier\(0\.25, 1, 0\.5, 1\);/g, 'transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease, filter 0.8s ease;');
        
        // Rewrite the sc-visuals transitions to avoid changing layout properties (left, right, width) which cause jitters
        html = html.replace(/\.sc-visuals\[data-active="insta"\] \.iphone-3d \{ transform: translateZ\(100px\) translateX\(-50%\) left:50% scale\(1\.3\) rotateY\(0deg\) !important; right:auto !important; z-index: 10; box-shadow: 0 40px 100px rgba\(228,64,95,0\.4\); \}/, '.sc-visuals[data-active="insta"] .iphone-3d { transform: translateZ(100px) translateX(-45%) scale(1.3) rotateY(0deg) !important; z-index: 10; filter: drop-shadow(0 40px 100px rgba(228,64,95,0.4)); }');
        html = html.replace(/\.sc-visuals\[data-active="app"\] \.iphone-3d \{ transform: translateZ\(50px\) translateX\(-50%\) left:50% scale\(1\.1\) !important; right:auto !important;\}/, '.sc-visuals[data-active="app"] .iphone-3d { transform: translateZ(50px) translateX(-45%) scale(1.1) !important; }');
        html = html.replace(/\.sc-visuals\[data-active="fb"\] \.iphone-3d \{ filter: blur\(5px\) brightness\(0\.5\); transform: translateZ\(-50px\) translateX\(30%\); \}/, '.sc-visuals[data-active="fb"] .iphone-3d { filter: blur(5px) brightness(0.5); transform: translateZ(-50px) translateX(30%); }');

        // Also fix responsive logic for transitions
        html = html.replace(/\.macbook-3d \{ width: 95% !important; left: 0 !important; right: 0 !important; margin: 0 auto !important; transform: rotateY\(0\) translateZ\(0\) !important;\}/g, '.macbook-3d { width: 95% !important; left: 0 !important; transform: rotateY(0) translateZ(0) !important;}');
        html = html.replace(/\.iphone-3d \{ width: 35% !important; right: 5% !important; bottom: 0 !important; transform: rotateY\(-10deg\) translateZ\(50px\) !important;\}/g, '.iphone-3d { width: 35% !important; right: 5% !important; bottom: 0 !important; transform: rotateY(-10deg) translateZ(50px) !important;}');

    } else if (file === 'reviews.html') {
        html = html.replace(/data-cms="nav_reviews"/g, 'class="active" data-cms="nav_reviews"');
    }

    fs.writeFileSync(htmlPath, html);
    console.log('Fixed ' + file);
});

console.log('Execution completed!');
