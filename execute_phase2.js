const fs = require('fs');

// ============================================
// 1. INDEX.HTML OVERHAUL
// ============================================
let html = fs.readFileSync('public/index.html', 'utf8');

// A. Fix Before/After image sources
html = html.replace(/src="https:\/\/images\.pexels\.com\/photos\/19736858[^"]*"/, 'src="assets/after.png"');
html = html.replace(/src="https:\/\/images\.pexels\.com\/photos\/265087[^"]*"/, 'src="assets/before.png"');

// B. Purge Dynamic Island HTML completely
const islandStartStr = '<div class="rf-island" id="rfIsland"';
const islandStartIndex = html.indexOf(islandStartStr);
if (islandStartIndex !== -1) {
    // Just use regex to strip out the island block
    html = html.replace(/<div class="rf-island" id="rfIsland"[\s\S]*?<\/div>\s*<\/div>/, '');
}

// C. Remove all triggerIsland and triggerHaptic calls from the HTML
html = html.replace(/triggerIsland\([^)]*\)/g, '');
html = html.replace(/triggerHaptic\(\)/g, '');
html = html.replace(/onclick=";*"/g, '');
html = html.replace(/onclick="([^"]*);*;/g, 'onclick="$1'); 

// D. Massive Arsenal Glassmorphism Redesign
const arsStartStr = '<div class="ars-container"';
const arsEndStr = '</section>';
const arsStartIndex = html.indexOf(arsStartStr);
const arsEndIndex = html.indexOf(arsEndStr, arsStartIndex);

if (arsStartIndex !== -1 && arsEndIndex !== -1) {
    const newArsenalCards = `
            <div class="ars-container" id="ultimate-arsenal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:35px;width:100%;z-index:10;position:relative;margin-top:50px;perspective:1000px;">
                
                <!-- Card 1: Meta Ads -->
                <div class="god-card-v2" data-tilt style="position:relative;border-radius:35px;overflow:hidden;background:rgba(255,255,255,0.4);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.6);padding:45px 35px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 30px 60px rgba(0,0,0,0.03);min-height:480px;transition:box-shadow 0.4s ease, border 0.4s ease;transform-style:preserve-3d;">
                    <div style="position:absolute;top:-80px;right:-80px;width:250px;height:250px;background:radial-gradient(circle, rgba(0,85,255,0.15) 0%, transparent 70%);border-radius:50%;filter:blur(30px);z-index:1;pointer-events:none;"></div>
                    <div class="card-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%);transform:translateX(-100%);z-index:2;pointer-events:none;transition:transform 0.6s ease;"></div>
                    
                    <div style="position:relative;z-index:10;display:flex;flex-direction:column;flex-grow:1;transform:translateZ(30px);">
                        <div style="width:75px;height:75px;border-radius:24px;background:linear-gradient(135deg, #0055FF, #003399);display:flex;justify-content:center;align-items:center;font-size:2.5rem;color:#FFF;margin-bottom:30px;box-shadow:0 15px 30px rgba(0,85,255,0.3);"><i class="ri-facebook-circle-fill"></i></div>
                        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#111;margin-bottom:15px;line-height:1.1;letter-spacing:-1px;">Local Business Ads</h3>
                        <p style="font-family:'Outfit',sans-serif;font-size:1.15rem;color:#555;line-height:1.6;margin-bottom:30px;">Hyper-targeted Meta & Google Campaigns designed to capture high-intent customers in your exact service area.</p>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:auto;">
                            <span style="padding:10px 18px;background:rgba(0,85,255,0.08);color:#0055FF;border:1px solid rgba(0,85,255,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Retargeting</span>
                            <span style="padding:10px 18px;background:rgba(0,85,255,0.08);color:#0055FF;border:1px solid rgba(0,85,255,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">ROI Tracking</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2: Landing Pages -->
                <div class="god-card-v2" data-tilt style="position:relative;border-radius:35px;overflow:hidden;background:rgba(255,255,255,0.4);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.6);padding:45px 35px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 30px 60px rgba(0,0,0,0.03);min-height:480px;transition:box-shadow 0.4s ease, border 0.4s ease;transform-style:preserve-3d;">
                    <div style="position:absolute;top:-80px;right:-80px;width:250px;height:250px;background:radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%);border-radius:50%;filter:blur(30px);z-index:1;pointer-events:none;"></div>
                    <div class="card-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%);transform:translateX(-100%);z-index:2;pointer-events:none;transition:transform 0.6s ease;"></div>
                    
                    <div style="position:relative;z-index:10;display:flex;flex-direction:column;flex-grow:1;transform:translateZ(30px);">
                        <div style="width:75px;height:75px;border-radius:24px;background:linear-gradient(135deg, #D4AF37, #A67C00);display:flex;justify-content:center;align-items:center;font-size:2.5rem;color:#FFF;margin-bottom:30px;box-shadow:0 15px 30px rgba(212,175,55,0.3);"><i class="ri-macbook-fill"></i></div>
                        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#111;margin-bottom:15px;line-height:1.1;letter-spacing:-1px;">Automated Websites</h3>
                        <p style="font-family:'Outfit',sans-serif;font-size:1.15rem;color:#555;line-height:1.6;margin-bottom:30px;">Lightning-fast, high-converting landing pages engineered to capture contact info and book appointments instantly.</p>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:auto;">
                            <span style="padding:10px 18px;background:rgba(212,175,55,0.08);color:#A67C00;border:1px solid rgba(212,175,55,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">A/B Tested</span>
                            <span style="padding:10px 18px;background:rgba(212,175,55,0.08);color:#A67C00;border:1px solid rgba(212,175,55,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Speed Optimized</span>
                        </div>
                    </div>
                </div>

                <!-- Card 3: Google SEO -->
                <div class="god-card-v2" data-tilt style="position:relative;border-radius:35px;overflow:hidden;background:rgba(255,255,255,0.4);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.6);padding:45px 35px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 30px 60px rgba(0,0,0,0.03);min-height:480px;transition:box-shadow 0.4s ease, border 0.4s ease;transform-style:preserve-3d;">
                    <div style="position:absolute;top:-80px;right:-80px;width:250px;height:250px;background:radial-gradient(circle, rgba(219,68,55,0.15) 0%, transparent 70%);border-radius:50%;filter:blur(30px);z-index:1;pointer-events:none;"></div>
                    <div class="card-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%);transform:translateX(-100%);z-index:2;pointer-events:none;transition:transform 0.6s ease;"></div>
                    
                    <div style="position:relative;z-index:10;display:flex;flex-direction:column;flex-grow:1;transform:translateZ(30px);">
                        <div style="width:75px;height:75px;border-radius:24px;background:linear-gradient(135deg, #DB4437, #8B0000);display:flex;justify-content:center;align-items:center;font-size:2.5rem;color:#FFF;margin-bottom:30px;box-shadow:0 15px 30px rgba(219,68,55,0.3);"><i class="ri-search-eye-line"></i></div>
                        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#111;margin-bottom:15px;line-height:1.1;letter-spacing:-1px;">Google SEO</h3>
                        <p style="font-family:'Outfit',sans-serif;font-size:1.15rem;color:#555;line-height:1.6;margin-bottom:30px;">Rank #1 locally so when people search for your exact service, they find you before your competitors.</p>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:auto;">
                            <span style="padding:10px 18px;background:rgba(219,68,55,0.08);color:#DB4437;border:1px solid rgba(219,68,55,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">GMB Optimization</span>
                            <span style="padding:10px 18px;background:rgba(219,68,55,0.08);color:#DB4437;border:1px solid rgba(219,68,55,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Backlinks</span>
                        </div>
                    </div>
                </div>

                <!-- Card 4: Web Dev -->
                <div class="god-card-v2" data-tilt style="position:relative;border-radius:35px;overflow:hidden;background:rgba(255,255,255,0.4);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.6);padding:45px 35px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 30px 60px rgba(0,0,0,0.03);min-height:480px;transition:box-shadow 0.4s ease, border 0.4s ease;transform-style:preserve-3d;">
                    <div style="position:absolute;top:-80px;right:-80px;width:250px;height:250px;background:radial-gradient(circle, rgba(15,15,15,0.15) 0%, transparent 70%);border-radius:50%;filter:blur(30px);z-index:1;pointer-events:none;"></div>
                    <div class="card-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%);transform:translateX(-100%);z-index:2;pointer-events:none;transition:transform 0.6s ease;"></div>
                    
                    <div style="position:relative;z-index:10;display:flex;flex-direction:column;flex-grow:1;transform:translateZ(30px);">
                        <div style="width:75px;height:75px;border-radius:24px;background:linear-gradient(135deg, #333, #111);display:flex;justify-content:center;align-items:center;font-size:2.5rem;color:#FFF;margin-bottom:30px;box-shadow:0 15px 30px rgba(15,15,15,0.3);"><i class="ri-window-line"></i></div>
                        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#111;margin-bottom:15px;line-height:1.1;letter-spacing:-1px;">Web Development</h3>
                        <p style="font-family:'Outfit',sans-serif;font-size:1.15rem;color:#555;line-height:1.6;margin-bottom:30px;">Bespoke, high-performance web applications built for speed, security, and absolute scale.</p>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:auto;">
                            <span style="padding:10px 18px;background:rgba(15,15,15,0.08);color:#111;border:1px solid rgba(15,15,15,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Custom UI/UX</span>
                            <span style="padding:10px 18px;background:rgba(15,15,15,0.08);color:#111;border:1px solid rgba(15,15,15,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Scalable Tech</span>
                        </div>
                    </div>
                </div>

                <!-- Card 5: Social Media -->
                <div class="god-card-v2" data-tilt style="position:relative;border-radius:35px;overflow:hidden;background:rgba(255,255,255,0.4);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.6);padding:45px 35px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 30px 60px rgba(0,0,0,0.03);min-height:480px;transition:box-shadow 0.4s ease, border 0.4s ease;transform-style:preserve-3d;">
                    <div style="position:absolute;top:-80px;right:-80px;width:250px;height:250px;background:radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%);border-radius:50%;filter:blur(30px);z-index:1;pointer-events:none;"></div>
                    <div class="card-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%);transform:translateX(-100%);z-index:2;pointer-events:none;transition:transform 0.6s ease;"></div>
                    
                    <div style="position:relative;z-index:10;display:flex;flex-direction:column;flex-grow:1;transform:translateZ(30px);">
                        <div style="width:75px;height:75px;border-radius:24px;background:linear-gradient(135deg, #9932CC, #8A2BE2);display:flex;justify-content:center;align-items:center;font-size:2.5rem;color:#FFF;margin-bottom:30px;box-shadow:0 15px 30px rgba(138,43,226,0.3);"><i class="ri-megaphone-fill"></i></div>
                        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#111;margin-bottom:15px;line-height:1.1;letter-spacing:-1px;">Social Media Growth</h3>
                        <p style="font-family:'Outfit',sans-serif;font-size:1.15rem;color:#555;line-height:1.6;margin-bottom:30px;">Engaging content, viral reels, and strategic brand positioning to make your business famous locally.</p>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:auto;">
                            <span style="padding:10px 18px;background:rgba(138,43,226,0.08);color:#8A2BE2;border:1px solid rgba(138,43,226,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Viral Reels</span>
                            <span style="padding:10px 18px;background:rgba(138,43,226,0.08);color:#8A2BE2;border:1px solid rgba(138,43,226,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Brand Identity</span>
                        </div>
                    </div>
                </div>

                <!-- Card 6: CRM -->
                <div class="god-card-v2" data-tilt style="position:relative;border-radius:35px;overflow:hidden;background:rgba(255,255,255,0.4);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.6);padding:45px 35px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 30px 60px rgba(0,0,0,0.03);min-height:480px;transition:box-shadow 0.4s ease, border 0.4s ease;transform-style:preserve-3d;">
                    <div style="position:absolute;top:-80px;right:-80px;width:250px;height:250px;background:radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%);border-radius:50%;filter:blur(30px);z-index:1;pointer-events:none;"></div>
                    <div class="card-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%);transform:translateX(-100%);z-index:2;pointer-events:none;transition:transform 0.6s ease;"></div>
                    
                    <div style="position:relative;z-index:10;display:flex;flex-direction:column;flex-grow:1;transform:translateZ(30px);">
                        <div style="width:75px;height:75px;border-radius:24px;background:linear-gradient(135deg, #14B8A6, #0D9488);display:flex;justify-content:center;align-items:center;font-size:2.5rem;color:#FFF;margin-bottom:30px;box-shadow:0 15px 30px rgba(20,184,166,0.3);"><i class="ri-mail-send-fill"></i></div>
                        <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#111;margin-bottom:15px;line-height:1.1;letter-spacing:-1px;">CRM & Automation</h3>
                        <p style="font-family:'Outfit',sans-serif;font-size:1.15rem;color:#555;line-height:1.6;margin-bottom:30px;">Automated email sequences, SMS follow-ups, and lead tracking so no potential customer ever slips through.</p>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:auto;">
                            <span style="padding:10px 18px;background:rgba(20,184,166,0.08);color:#0D9488;border:1px solid rgba(20,184,166,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">SMS Follow-ups</span>
                            <span style="padding:10px 18px;background:rgba(20,184,166,0.08);color:#0D9488;border:1px solid rgba(20,184,166,0.1);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;">Automated Nurture</span>
                        </div>
                    </div>
                </div>
                
                <style>
                    .god-card-v2:hover { border-color:rgba(255,255,255,0.9); box-shadow:0 40px 80px rgba(0,0,0,0.08); }
                    .god-card-v2:hover .card-glare { transform:translateX(100%); }
                </style>
            </div>
`;
    html = html.substring(0, arsStartIndex) + newArsenalCards + html.substring(arsEndIndex);
}

fs.writeFileSync('public/index.html', html);
console.log('index.html updated successfully.');

// ============================================
// 2. MAIN.JS OVERHAUL
// ============================================
let js = fs.readFileSync('public/js/main.js', 'utf8');

// A. Purge Dynamic Island logic completely
js = js.replace(/window\.triggerIsland\s*=\s*function[\s\S]*?\}\s*clearTimeout\([^)]*\);[\s\S]*?\};/, '');

// B. Inject Custom 3D Tilt Logic
const tiltLogicStr = `
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.god-card-v2');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
});
`;

if (!js.includes('.god-card-v2')) {
    js += '\n' + tiltLogicStr;
}

// C. Fix switchCylinder function
const switchCylRegex = /window\.switchCylinder = function\(platform\)\{([\s\S]*?const prefix = prefixMap\[platform\] \|\| platform;)/;
if (switchCylRegex.test(js)) {
    const updateLogic = `
    // Swap images dynamically for the cylinder
    for (let i = 1; i <= 6; i++) {
        const img = document.getElementById('cyl-img-' + i);
        if (img) {
            img.src = 'assets/' + prefix + '_' + i + '.png';
        }
    }
`;
    js = js.replace(switchCylRegex, '$1\n' + updateLogic);
}

fs.writeFileSync('public/js/main.js', js);
console.log('main.js updated successfully.');
