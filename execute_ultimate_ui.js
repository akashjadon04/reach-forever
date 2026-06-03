const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove Lenis JS imports
html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/studio-freight\/lenis@1\.0\.29\/bundled\/lenis\.min\.js"><\/script>/, '');

// 2. Hero Section Rewrite
const newHeroText = `
            <div class="hero-text" id="hero-text-module" style="position:relative;z-index:5">
                <div class="glass-badge" style="display:inline-flex;align-items:center;gap:10px;padding:12px 28px;background:rgba(255,255,255,0.7);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.8);border-radius:100px;box-shadow:0 10px 30px rgba(0,0,0,0.05);margin-bottom:30px;">
                    <div style="width:10px;height:10px;background:#C8A96E;border-radius:50%;box-shadow:0 0 10px #C8A96E;animation:pulse 2s infinite;"></div>
                    <span style="font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:2px;color:#111;text-transform:uppercase;">God-Level Revenue Systems</span>
                </div>
                
                <h1 class="title-massive" style="font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,5.5vw,6rem);margin-bottom:20px;line-height:1.05;font-weight:700;color:#111;letter-spacing:-1px;">
                    We turn <br>
                    <span style="background:linear-gradient(135deg, #D4AF37, #A67C00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Ad Spend</span><br>
                    into clients.
                </h1>
                
                <p class="hero-desc" style="font-family:'Outfit',sans-serif;font-size:clamp(1.1rem,1.2vw,1.2rem);color:#555;line-height:1.7;margin-bottom:40px;font-weight:400;max-width:550px;">We engineer hyper-optimized landing pages, run aggressive local ads, and rank you #1 on Google. We don't deliver impressions, we deliver revenue.</p>
                
                <div class="hero-actions" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
                    <div class="magnetic-wrap" style="position:relative;display:inline-block;padding:20px;margin:-20px;">
                        <a href="form.html" class="btn magnetic-inner" style="display:inline-block;background:linear-gradient(135deg,#111,#333);color:#FFF;padding:18px 45px;border-radius:100px;font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:1px;text-decoration:none;box-shadow:0 15px 35px rgba(0,0,0,.2);transition:all 0.3s ease;">Start Growing Now</a>
                    </div>
                </div>
            </div>
`;
html = html.replace(/<div class="hero-text" id="hero-text-module"[^>]*>[\s\S]*?<\/div>\s*<div class="hero-visuals"/, newHeroText + '\n            <div class="hero-visuals"');


// 3. Arsenal Services Section Rewrite (The Cards)
const newArsenalCards = `
            <div class="arsenal-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px;width:100%;z-index:10;position:relative;margin-top:50px;">
                <!-- Card 1: Ads -->
                <div class="god-card" style="position:relative;border-radius:24px;overflow:hidden;background:linear-gradient(145deg, #F9F9F9, #EBEBEB);border:1px solid rgba(255,255,255,0.8);box-shadow:0 20px 40px rgba(0,0,0,0.06);display:flex;flex-direction:column;min-height:480px;cursor:pointer;transition:transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;">
                    <div class="god-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.6) 25%, transparent 30%);transform:translateX(-100%);transition:transform 0.6s ease;z-index:2;pointer-events:none;"></div>
                    <div class="gc-img" style="width:100%;height:220px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover;"></div>
                    <div class="gc-content" style="padding:30px;flex-grow:1;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,0.4);backdrop-filter:blur(20px);">
                        <div>
                            <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:#111;margin-bottom:15px;">Local Business Ads</h3>
                            <ul style="font-family:'Outfit',sans-serif;font-size:1rem;color:#444;line-height:1.8;padding-left:20px;">
                                <li>Hyper-targeted Meta & Google Campaigns</li>
                                <li>Custom Landing Page Conversion Tuning</li>
                                <li>Direct ROI Tracking</li>
                            </ul>
                        </div>
                        <div style="font-family:'Outfit',sans-serif;font-weight:700;color:#C8A96E;text-transform:uppercase;letter-spacing:1px;font-size:0.85rem;margin-top:20px;">Explore Service &rarr;</div>
                    </div>
                </div>

                <!-- Card 2: SEO -->
                <div class="god-card" style="position:relative;border-radius:24px;overflow:hidden;background:linear-gradient(145deg, #F9F9F9, #EBEBEB);border:1px solid rgba(255,255,255,0.8);box-shadow:0 20px 40px rgba(0,0,0,0.06);display:flex;flex-direction:column;min-height:480px;cursor:pointer;transition:transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;">
                    <div class="god-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.6) 25%, transparent 30%);transform:translateX(-100%);transition:transform 0.6s ease;z-index:2;pointer-events:none;"></div>
                    <div class="gc-img" style="width:100%;height:220px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover;"></div>
                    <div class="gc-content" style="padding:30px;flex-grow:1;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,0.4);backdrop-filter:blur(20px);">
                        <div>
                            <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:#111;margin-bottom:15px;">Google SEO</h3>
                            <ul style="font-family:'Outfit',sans-serif;font-size:1rem;color:#444;line-height:1.8;padding-left:20px;">
                                <li>Rank #1 in Your City</li>
                                <li>Google My Business Optimization</li>
                                <li>High-Authority Backlink Building</li>
                            </ul>
                        </div>
                        <div style="font-family:'Outfit',sans-serif;font-weight:700;color:#C8A96E;text-transform:uppercase;letter-spacing:1px;font-size:0.85rem;margin-top:20px;">Explore Service &rarr;</div>
                    </div>
                </div>

                <!-- Card 3: Automation -->
                <div class="god-card" style="position:relative;border-radius:24px;overflow:hidden;background:linear-gradient(145deg, #F9F9F9, #EBEBEB);border:1px solid rgba(255,255,255,0.8);box-shadow:0 20px 40px rgba(0,0,0,0.06);display:flex;flex-direction:column;min-height:480px;cursor:pointer;transition:transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;">
                    <div class="god-glare" style="position:absolute;inset:0;background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.6) 25%, transparent 30%);transform:translateX(-100%);transition:transform 0.6s ease;z-index:2;pointer-events:none;"></div>
                    <div class="gc-img" style="width:100%;height:220px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover;"></div>
                    <div class="gc-content" style="padding:30px;flex-grow:1;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,0.4);backdrop-filter:blur(20px);">
                        <div>
                            <h3 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:#111;margin-bottom:15px;">CRM & Automation</h3>
                            <ul style="font-family:'Outfit',sans-serif;font-size:1rem;color:#444;line-height:1.8;padding-left:20px;">
                                <li>Instant SMS/Email Lead Routing</li>
                                <li>Missed Call Text-Back System</li>
                                <li>24/7 Automated Nurturing</li>
                            </ul>
                        </div>
                        <div style="font-family:'Outfit',sans-serif;font-weight:700;color:#C8A96E;text-transform:uppercase;letter-spacing:1px;font-size:0.85rem;margin-top:20px;">Explore Service &rarr;</div>
                    </div>
                </div>
            </div>
            
            <style>
                .god-card:hover { transform: translateY(-10px); box-shadow:0 30px 60px rgba(0,0,0,0.12); }
                .god-card:hover .god-glare { transform:translateX(100%); }
                .god-card:hover img { transform:scale(1.05); }
                @keyframes pulse { 0% { box-shadow:0 0 0 0 rgba(200,169,110,0.7); } 70% { box-shadow:0 0 0 10px rgba(200,169,110,0); } 100% { box-shadow:0 0 0 0 rgba(200,169,110,0); } }
            </style>
`;
html = html.replace(/<div class="arsenal-grid"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, newArsenalCards + '\n        </div>\n    </section>');

// 4. Delete Blueprint section (third text section)
html = html.replace(/<section class="blueprint-section"[\s\S]*?<\/section>/, '');

// 5. Fix 85 Lakhs+ Contrast 
// The user said: "in 85 lakhs+ revenue generated this quarter the other text then 85 lakh is dark and cannot be seen"
// The HTML for the other text: "Revenue Generated This Quarter". I must change its color to #FFF.
html = html.replace(/Revenue Generated This Quarter<\/p>/, 'Revenue Generated This Quarter</p>').replace(/color:var\(--rf-text\)/g, 'color:#FFF');
// Also, in the parallax break, ensure it's fully white text.
html = html.replace(/color:var\(--text-dark, #1A1C20\)/g, 'color:#FFF'); 

// Apply to disk
fs.writeFileSync('public/index.html', html);


// 6. Clean main.js from Lenis
let js = fs.readFileSync('public/js/main.js', 'utf8');

// Strip all Lenis logic
js = js.replace(/if\(typeof Lenis !== 'undefined'\)\{[\s\S]*?window\._lenis\.start\(\);\s*\}\s*\},400\);\s*\};/g, '');
js = js.replace(/window\._lenis = null;/g, '');
js = js.replace(/if\(window\._lenis\) window\._lenis\.stop\(\);/g, '');
js = js.replace(/if\(window\._lenis\) window\._lenis\.start\(\);/g, '');
js = js.replace(/if\(window\._lenis\) window\._lenis\.scrollTo\(0,\{immediate:true\}\);/g, '');

fs.writeFileSync('public/js/main.js', js);
console.log('Ultimate God-Level UI applied.');
