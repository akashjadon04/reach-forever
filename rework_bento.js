const fs = require('fs');

let srv = fs.readFileSync('public/services.html', 'utf8');

// The bento-grid is currently broken due to malformed class attributes.
// Let's completely replace the entire <section class="bento-section"> block.

const newBentoSection = `
        <section class="bento-section" style="padding: 100px 5%; background: var(--rf-bg); position: relative; z-index: 5;">
            <div class="bento-header reveal-up" style="text-align: center; margin-bottom: 60px;">
                <h2 data-cms="bento_header_title" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 5vw, 5rem); color: var(--rf-text); font-weight: 700; margin-bottom: 15px;">Our Marketing Stack.</h2>
                <p style="color: var(--rf-muted); font-size: 1.2rem; max-width: 600px; margin: 0 auto;" data-cms="bento_header_sub">We use world-class marketing tools to grow your business effortlessly.</p>
            </div>

            <div class="bento-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare="true" data-tilt-max-glare="0.3" style="position: relative; border-radius: 30px; overflow: hidden; min-height: 350px; display: flex; align-items: flex-end; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); grid-column: span 2;">
                    <img src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200&q=100" alt="Facebook Ads" class="bc-bg-img" data-cms="bento_c1_img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: transform 0.5s ease;">
                    <div class="bento-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,8,25,0.95) 0%, rgba(15,8,25,0.4) 60%, transparent 100%); z-index: 2;"></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%;">
                        <div class="bc-icon" style="width: 50px; height: 50px; background: rgba(0, 85, 255, 0.2); backdrop-filter: blur(10px); color: #4A90E2; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; border: 1px solid rgba(0,85,255,0.3);"><i class="ri-facebook-circle-fill"></i></div>
                        <h3 class="bc-title" data-cms="bento_c1_title" style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: #FFF; margin-bottom: 10px; font-weight: 700;">Facebook & Instagram Ads</h3>
                        <p class="bc-desc" data-cms="bento_c1_desc" style="color: rgba(255,255,255,0.8); font-family: 'Outfit', sans-serif; font-size: 1.1rem; line-height: 1.5; max-width: 500px;">We run high-converting ads on Facebook and Instagram to bring you ready-to-buy customers every single day.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare="true" data-tilt-max-glare="0.3" style="position: relative; border-radius: 30px; overflow: hidden; min-height: 350px; display: flex; align-items: flex-end; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05);">
                    <img src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&q=100" alt="Google Search" class="bc-bg-img" data-cms="bento_c2_img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: transform 0.5s ease;">
                    <div class="bento-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,8,25,0.95) 0%, rgba(15,8,25,0.4) 60%, transparent 100%); z-index: 2;"></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%;">
                        <div class="bc-icon" style="width: 50px; height: 50px; background: rgba(234, 67, 53, 0.2); backdrop-filter: blur(10px); color: #EA4335; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; border: 1px solid rgba(234,67,53,0.3);"><i class="ri-google-fill"></i></div>
                        <h3 class="bc-title" data-cms="bento_c2_title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #FFF; margin-bottom: 10px; font-weight: 700;">Google Search Ads</h3>
                        <p class="bc-desc" data-cms="bento_c2_desc" style="color: rgba(255,255,255,0.8); font-family: 'Outfit', sans-serif; font-size: 1rem; line-height: 1.5;">We put your business at the #1 spot on Google when people actively search for your services.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare="true" data-tilt-max-glare="0.3" style="position: relative; border-radius: 30px; overflow: hidden; min-height: 350px; display: flex; align-items: flex-end; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05);">
                    <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&q=100" alt="Automation" class="bc-bg-img" data-cms="bento_c3_img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: transform 0.5s ease;">
                    <div class="bento-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,8,25,0.95) 0%, rgba(15,8,25,0.4) 60%, transparent 100%); z-index: 2;"></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%;">
                        <div class="bc-icon" style="width: 50px; height: 50px; background: rgba(255, 79, 0, 0.2); backdrop-filter: blur(10px); color: #FF4F00; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; border: 1px solid rgba(255,79,0,0.3);"><i class="ri-thunderstorms-fill"></i></div>
                        <h3 class="bc-title" data-cms="bento_c3_title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #FFF; margin-bottom: 10px; font-weight: 700;">Instant Lead Alerts</h3>
                        <p class="bc-desc" data-cms="bento_c3_desc" style="color: rgba(255,255,255,0.8); font-family: 'Outfit', sans-serif; font-size: 1rem; line-height: 1.5;">We connect all your tools so every new lead gets an instant automatic text message and email.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare="true" data-tilt-max-glare="0.3" style="position: relative; border-radius: 30px; overflow: hidden; min-height: 350px; display: flex; align-items: flex-end; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); grid-column: span 2;">
                    <img src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200&q=100" alt="CRM" class="bc-bg-img" data-cms="bento_c4_img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: transform 0.5s ease;">
                    <div class="bento-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,8,25,0.95) 0%, rgba(15,8,25,0.4) 60%, transparent 100%); z-index: 2;"></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%; display: flex; align-items: center; gap: 30px;">
                        <div class="bc-icon" style="width: 70px; height: 70px; background: rgba(212, 175, 55, 0.2); backdrop-filter: blur(10px); color: var(--accent-gold); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0; border: 1px solid rgba(212,175,55,0.3); flex-shrink: 0;"><i class="ri-line-chart-fill"></i></div>
                        <div>
                            <h3 class="bc-title" data-cms="bento_c4_title" style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: #FFF; margin-bottom: 10px; font-weight: 700;">Simple Sales Tracking</h3>
                            <p class="bc-desc" data-cms="bento_c4_desc" style="color: rgba(255,255,255,0.8); font-family: 'Outfit', sans-serif; font-size: 1.1rem; line-height: 1.5;">We build a simple tracking dashboard so you can see exactly how much money your ads are making in real time.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
`;

// Extract and replace the entire broken bento-section
const bentoSectionRegex = /<section class="bento-section">[\s\S]*?<\/section>/;
srv = srv.replace(bentoSectionRegex, newBentoSection);


// Light mode adaptability for the bento overlays (Since we use #FFF for text, the overlay must be dark even in light mode to preserve contrast over images).
// I will ensure light mode doesn't break the text contrast by using a hardcoded dark overlay regardless of theme. The above HTML already does this (rgba(15,8,25,0.95)).


// Fix the mobile grid for the new bento cards
const newMobileCss = `
        /* BENTO GRID MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
            .bento-card { grid-column: span 1 !important; flex-direction: column; align-items: flex-start; text-align: left; padding: 20px !important; min-height: 300px !important; }
            .bento-card.span-2x2, .bento-card.span-2x1 { grid-column: span 1 !important; }
            .bento-card .bc-content { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
        }
        /* Hover Effects */
        .bento-card:hover .bc-bg-img { transform: scale(1.08); }
`;
if (!srv.includes('BENTO GRID MOBILE OPTIMIZATION')) {
    srv = srv.replace(/<\/style>/, newMobileCss + '\n    </style>');
}

// Add an ultra-smooth background overlay for dev-section MacBook Focus to make it incredibly premium
const devSectionGlowCss = `
        /* PREMIUM DEV SECTION BLUR GRAPHICS */
        .sc-visuals { position: relative; }
        .sc-visuals::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(212,175,55,0.1), transparent 70%); z-index: 0; pointer-events: none; transition: 0.5s ease; }
        .sc-visuals[data-active="insta"]::after { background: radial-gradient(circle at center, rgba(228,64,95,0.15), transparent 70%); }
        .sc-visuals[data-active="fb"]::after { background: radial-gradient(circle at center, rgba(0,85,255,0.15), transparent 70%); }
`;
if (!srv.includes('PREMIUM DEV SECTION BLUR GRAPHICS')) {
    srv = srv.replace(/<\/style>/, devSectionGlowCss + '\n    </style>');
}


fs.writeFileSync('public/services.html', srv);
console.log('Marketing stack perfectly reworked with extreme 3D graphics and ultra-simple language.');
