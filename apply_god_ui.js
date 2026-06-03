const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Hero Rewrite
const heroStartStr = '<div class="hero-text" id="hero-text-module"';
const heroEndStr = '<div class="hero-visuals"';
const heroStartIndex = html.indexOf(heroStartStr);
const heroEndIndex = html.indexOf(heroEndStr, heroStartIndex);

if (heroStartIndex !== -1 && heroEndIndex !== -1) {
    const newHeroText = `
            <div class="hero-text" id="hero-text-module" style="position:relative;z-index:5;padding-right:20px;">
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
    html = html.substring(0, heroStartIndex) + newHeroText + html.substring(heroEndIndex);
}

// 2. Arsenal Section Rewrite
const arsStartStr = '<div class="ars-container"';
const arsEndStr = '</section>'; // End of arsenal section
const arsStartIndex = html.indexOf(arsStartStr);
const arsEndIndex = html.indexOf(arsEndStr, arsStartIndex);

if (arsStartIndex !== -1 && arsEndIndex !== -1) {
    const newArsenalCards = `
            <div class="ars-container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px;width:100%;z-index:10;position:relative;margin-top:50px;">
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
        </div>
`;
    html = html.substring(0, arsStartIndex) + newArsenalCards + html.substring(arsEndIndex);
}

// 3. Delete Blueprint and Parallax sections
const pxStartStr = '<section class="parallax-break"';
const pxStartIndex = html.indexOf(pxStartStr);
if (pxStartIndex !== -1) {
    const pxEndIndex = html.indexOf('</section>', pxStartIndex) + 10;
    html = html.substring(0, pxStartIndex) + html.substring(pxEndIndex);
}

const bpStartStr = '<section class="blueprint-section"';
const bpStartIndex = html.indexOf(bpStartStr);
if (bpStartIndex !== -1) {
    const bpEndIndex = html.indexOf('</section>', bpStartIndex) + 10;
    html = html.substring(0, bpStartIndex) + html.substring(bpEndIndex);
}

fs.writeFileSync('public/index.html', html);
console.log('UI Overhaul Script executed cleanly.');
