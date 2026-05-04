const fs = require('fs');

let srv = fs.readFileSync('public/services.html', 'utf8');

// 1. PERFORMANCE: KILL PARTICLES AND BLURS FOR 90FPS SCROLLING
// Disable particles completely in services.html to guarantee 90FPS scroll (Services page is too heavy for particles)
srv = srv.replace(/function animateParticles\(\) \{/, 'function animateParticles() { return; // DISABLED FOR 90FPS PERFORMANCE');
// Replace heavy blur effects with flat fallbacks for massive scroll performance boost
srv = srv.replace(/backdrop-filter: blur\([^\)]+\);?/g, ''); 

// Also disable ambient glow animation as it triggers continuous paints
const scrollPerfCss = `
        /* 90FPS SCROLLING OPTIMIZATIONS */
        body, .main-wrapper { 
            will-change: transform; 
            transform: translateZ(0); 
            backface-visibility: hidden;
            perspective: 1000px;
        }
        .ambient-glow { animation: none !important; opacity: 0.3; } /* Kill heavy paint loop */
`;
if (!srv.includes('90FPS SCROLLING OPTIMIZATIONS')) {
    srv = srv.replace(/<\/style>/, scrollPerfCss + '\n    </style>');
}

// 2. REBUILD MARKETING STACK: OPAQUE, 3D, GOLDEN SHADOWS (No photos, no white boxes)
const newBentoSection = `
        <section class="bento-section" style="padding: 100px 5%; background: var(--rf-bg); position: relative; z-index: 5;">
            <div class="bento-header reveal-up" style="text-align: center; margin-bottom: 60px;">
                <h2 data-cms="bento_header_title" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 5vw, 5rem); color: var(--rf-text); font-weight: 700; margin-bottom: 15px;">Our Marketing Stack.</h2>
                <p style="color: var(--rf-muted); font-size: 1.2rem; max-width: 600px; margin: 0 auto;" data-cms="bento_header_sub">We use world-class marketing tools to grow your business effortlessly.</p>
            </div>

            <div class="bento-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1" style="background: linear-gradient(145deg, #150F22, #0A0512) !important; border-radius: 30px; min-height: 300px; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; box-shadow: 0 20px 40px rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2); transition: transform 0.4s ease, box-shadow 0.4s ease; grid-column: span 2; position: relative; overflow: hidden;" onmouseover="this.style.boxShadow='0 30px 60px rgba(212,175,55,0.15)', this.style.borderColor='rgba(212,175,55,0.5)';" onmouseout="this.style.boxShadow='0 20px 40px rgba(212,175,55,0.05)', this.style.borderColor='rgba(212,175,55,0.2)';">
                    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(0,85,255,0.2), transparent 70%); border-radius: 50%; pointer-events: none;"></div>
                    <div class="bc-icon" style="width: 60px; height: 60px; background: rgba(0, 85, 255, 0.1); color: #4A90E2; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 20px; border: 1px solid rgba(0,85,255,0.2); box-shadow: inset 0 0 10px rgba(0,85,255,0.1);"><i class="ri-facebook-circle-fill"></i></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%;">
                        <h3 class="bc-title" data-cms="bento_c1_title" style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: #FFF !important; margin-bottom: 10px; font-weight: 700;">Facebook & Instagram Ads</h3>
                        <p class="bc-desc" data-cms="bento_c1_desc" style="color: rgba(255,255,255,0.7) !important; font-family: 'Outfit', sans-serif; font-size: 1.1rem; line-height: 1.5; max-width: 500px;">We run high-converting ads on Facebook and Instagram to bring you ready-to-buy customers every single day.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1" style="background: linear-gradient(145deg, #150F22, #0A0512) !important; border-radius: 30px; min-height: 300px; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; box-shadow: 0 20px 40px rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2); transition: transform 0.4s ease, box-shadow 0.4s ease; position: relative; overflow: hidden;" onmouseover="this.style.boxShadow='0 30px 60px rgba(212,175,55,0.15)', this.style.borderColor='rgba(212,175,55,0.5)';" onmouseout="this.style.boxShadow='0 20px 40px rgba(212,175,55,0.05)', this.style.borderColor='rgba(212,175,55,0.2)';">
                    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(234,67,53,0.2), transparent 70%); border-radius: 50%; pointer-events: none;"></div>
                    <div class="bc-icon" style="width: 60px; height: 60px; background: rgba(234, 67, 53, 0.1); color: #EA4335; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 20px; border: 1px solid rgba(234,67,53,0.2); box-shadow: inset 0 0 10px rgba(234,67,53,0.1);"><i class="ri-google-fill"></i></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%;">
                        <h3 class="bc-title" data-cms="bento_c2_title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #FFF !important; margin-bottom: 10px; font-weight: 700;">Google Search Ads</h3>
                        <p class="bc-desc" data-cms="bento_c2_desc" style="color: rgba(255,255,255,0.7) !important; font-family: 'Outfit', sans-serif; font-size: 1rem; line-height: 1.5;">We put your business at the #1 spot on Google when people actively search for your services.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1" style="background: linear-gradient(145deg, #150F22, #0A0512) !important; border-radius: 30px; min-height: 300px; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; box-shadow: 0 20px 40px rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2); transition: transform 0.4s ease, box-shadow 0.4s ease; position: relative; overflow: hidden;" onmouseover="this.style.boxShadow='0 30px 60px rgba(212,175,55,0.15)', this.style.borderColor='rgba(212,175,55,0.5)';" onmouseout="this.style.boxShadow='0 20px 40px rgba(212,175,55,0.05)', this.style.borderColor='rgba(212,175,55,0.2)';">
                    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,79,0,0.2), transparent 70%); border-radius: 50%; pointer-events: none;"></div>
                    <div class="bc-icon" style="width: 60px; height: 60px; background: rgba(255, 79, 0, 0.1); color: #FF4F00; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 20px; border: 1px solid rgba(255,79,0,0.2); box-shadow: inset 0 0 10px rgba(255,79,0,0.1);"><i class="ri-thunderstorms-fill"></i></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%;">
                        <h3 class="bc-title" data-cms="bento_c3_title" style="font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: #FFF !important; margin-bottom: 10px; font-weight: 700;">Instant Lead Alerts</h3>
                        <p class="bc-desc" data-cms="bento_c3_desc" style="color: rgba(255,255,255,0.7) !important; font-family: 'Outfit', sans-serif; font-size: 1rem; line-height: 1.5;">We connect all your tools so every new lead gets an instant automatic text message and email.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1" style="background: linear-gradient(145deg, #241D12, #120A05) !important; border-radius: 30px; min-height: 250px; display: flex; align-items: center; padding: 40px; box-shadow: 0 20px 40px rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); transition: transform 0.4s ease, box-shadow 0.4s ease; grid-column: span 2; position: relative; overflow: hidden;" onmouseover="this.style.boxShadow='0 30px 60px rgba(212,175,55,0.25)', this.style.borderColor='rgba(212,175,55,0.6)';" onmouseout="this.style.boxShadow='0 20px 40px rgba(212,175,55,0.1)', this.style.borderColor='rgba(212,175,55,0.3)';">
                    <div style="position: absolute; right: -100px; bottom: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%); border-radius: 50%; pointer-events: none;"></div>
                    <div class="bc-content" style="position: relative; z-index: 3; width: 100%; display: flex; align-items: center; gap: 30px;">
                        <div class="bc-icon" style="width: 80px; height: 80px; background: rgba(212, 175, 55, 0.1); color: var(--accent-gold); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0; border: 1px solid rgba(212,175,55,0.3); flex-shrink: 0; box-shadow: inset 0 0 20px rgba(212,175,55,0.15);"><i class="ri-line-chart-fill"></i></div>
                        <div>
                            <h3 class="bc-title" data-cms="bento_c4_title" style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: #FFF !important; margin-bottom: 10px; font-weight: 700;">Simple Sales Tracking</h3>
                            <p class="bc-desc" data-cms="bento_c4_desc" style="color: rgba(255,255,255,0.7) !important; font-family: 'Outfit', sans-serif; font-size: 1.1rem; line-height: 1.5; max-width: 600px;">We build a simple tracking dashboard so you can see exactly how much money your ads are making in real time.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
`;

const bentoSectionRegex = /<section class="bento-section"[\s\S]*?<\/section>/;
srv = srv.replace(bentoSectionRegex, newBentoSection);


fs.writeFileSync('public/services.html', srv);
console.log('Services page deeply optimized for scrolling and Marketing Stack rebuilt in solid opaque 3D luxury gold.');
