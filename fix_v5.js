const fs = require('fs');

let srv = fs.readFileSync('public/services.html', 'utf8');

// 1. FIX SCROLLING BUGS: Remove the broken global translateZ which broke the header and cursor
srv = srv.replace(/\/\* 90FPS SCROLLING OPTIMIZATIONS \*\/[\s\S]*?perspective: 1000px;\s*\}/, '/* Removed global translateZ to fix header and cursor fixed positioning */');


// 2. FIX SECOND SECTION LIGHT MODE GRAPHICS (process-3d-card)
// We remove the hardcoded dark background and replace it with proper CSS classes adapting to themes
srv = srv.replace(/style="background: rgba\(15, 8, 25, 0\.5\); border: 1px solid rgba\(255,255,255,0\.05\); border-radius: 30px; padding: 40px; box-shadow: 0 20px 40px rgba\(0,0,0,0\.2\); transition: transform 0\.4s cubic-bezier\(0\.16, 1, 0\.3, 1\), box-shadow 0\.4s ease;[^"]*"/g, '');

const processCss = `
        /* PROCESS CARDS LIGHT/DARK ADAPTIVE 3D */
        .process-3d-card {
            background: var(--rf-surface);
            border: 1px solid rgba(212,175,55,0.2);
            border-radius: 30px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        .process-3d-card::before {
            content: '';
            position: absolute;
            top: -50px; right: -50px;
            width: 150px; height: 150px;
            background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transition: 0.4s ease;
        }
        .process-3d-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(212,175,55,0.2);
            border-color: rgba(212,175,55,0.6);
        }
        .process-3d-card:hover::before {
            transform: scale(1.5);
            background: radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%);
        }
        [data-theme="light"] .process-3d-card h3 { color: #000 !important; }
        [data-theme="light"] .process-3d-card p { color: #444 !important; }
`;
if(!srv.includes('PROCESS CARDS LIGHT/DARK ADAPTIVE 3D')) {
    srv = srv.replace(/<\/style>/, processCss + '\n    </style>');
}


// 3. FIX MARKETING STACK "WHITE BOX" AND UGLINESS
// We will replace the entire bento section again to ensure NO white boxes exist, using strictly adaptive CSS instead of inline styles.
const bentoSectionRegex = /<section class="bento-section"[\s\S]*?<\/section>/;

const newBentoHtml = `
        <section class="bento-section" style="padding: 100px 5%; background: var(--rf-bg); position: relative; z-index: 5;">
            <div class="bento-header reveal-up" style="text-align: center; margin-bottom: 60px;">
                <h2 data-cms="bento_header_title" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 5vw, 5rem); color: var(--rf-text); font-weight: 700; margin-bottom: 15px;">Our Marketing Stack.</h2>
                <p style="color: var(--rf-muted); font-size: 1.2rem; max-width: 600px; margin: 0 auto;" data-cms="bento_header_sub">We use world-class marketing tools to grow your business effortlessly.</p>
            </div>

            <div class="bento-grid">
                
                <div class="bento-card tilt-card gpu-accel reveal-up span-2x2" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1">
                    <div class="card-glow" style="background: radial-gradient(circle, rgba(0,85,255,0.15), transparent 70%);"></div>
                    <div class="bc-icon" style="color: #4A90E2; background: rgba(0, 85, 255, 0.1); border-color: rgba(0,85,255,0.2);"><i class="ri-facebook-circle-fill"></i></div>
                    <div class="bc-content">
                        <h3 class="bc-title" data-cms="bento_c1_title">Facebook & Instagram Ads</h3>
                        <p class="bc-desc" data-cms="bento_c1_desc">We run high-converting ads on Facebook and Instagram to bring you ready-to-buy customers every single day.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1">
                    <div class="card-glow" style="background: radial-gradient(circle, rgba(234,67,53,0.15), transparent 70%);"></div>
                    <div class="bc-icon" style="color: #EA4335; background: rgba(234, 67, 53, 0.1); border-color: rgba(234,67,53,0.2);"><i class="ri-google-fill"></i></div>
                    <div class="bc-content">
                        <h3 class="bc-title" data-cms="bento_c2_title">Google Search Ads</h3>
                        <p class="bc-desc" data-cms="bento_c2_desc">We put your business at the #1 spot on Google when people actively search for your services.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1">
                    <div class="card-glow" style="background: radial-gradient(circle, rgba(255,79,0,0.15), transparent 70%);"></div>
                    <div class="bc-icon" style="color: #FF4F00; background: rgba(255, 79, 0, 0.1); border-color: rgba(255,79,0,0.2);"><i class="ri-thunderstorms-fill"></i></div>
                    <div class="bc-content">
                        <h3 class="bc-title" data-cms="bento_c3_title">Instant Lead Alerts</h3>
                        <p class="bc-desc" data-cms="bento_c3_desc">We connect all your tools so every new lead gets an instant automatic text message and email.</p>
                    </div>
                </div>

                <div class="bento-card tilt-card gpu-accel reveal-up span-2x2-alt" data-tilt data-tilt-max="5" data-tilt-speed="1000" data-tilt-glare="true" data-tilt-max-glare="0.1">
                    <div class="card-glow" style="background: radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%); width: 300px; height: 300px; right: -100px; bottom: -100px; top: auto;"></div>
                    <div class="bc-content" style="flex-direction: row; align-items: center; gap: 30px; padding: 0;">
                        <div class="bc-icon" style="width: 80px; height: 80px; font-size: 2.5rem; margin: 0; flex-shrink: 0;"><i class="ri-line-chart-fill"></i></div>
                        <div>
                            <h3 class="bc-title" data-cms="bento_c4_title">Simple Sales Tracking</h3>
                            <p class="bc-desc" data-cms="bento_c4_desc" style="max-width: 600px;">We build a simple tracking dashboard so you can see exactly how much money your ads are making in real time.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
`;

srv = srv.replace(bentoSectionRegex, newBentoHtml);

const bentoCss = `
        /* PREMIUM BENTO CARDS ADAPTIVE 3D */
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .bento-card {
            background: var(--rf-surface) !important;
            border-radius: 30px !important;
            min-height: 300px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            padding: 40px !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
            border: 1px solid rgba(212,175,55,0.2) !important;
            transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease !important;
            position: relative !important;
            overflow: hidden !important;
        }
        .bento-card.span-2x2 { grid-column: span 2; }
        .bento-card.span-2x2-alt { grid-column: span 2; justify-content: center !important; }
        
        .bento-card:hover {
            box-shadow: 0 30px 60px rgba(212,175,55,0.15) !important;
            border-color: rgba(212,175,55,0.5) !important;
        }
        
        .card-glow {
            position: absolute;
            top: -50px; right: -50px;
            width: 150px; height: 150px;
            border-radius: 50%;
            pointer-events: none;
            transition: 0.5s ease;
        }
        .bento-card:hover .card-glow { transform: scale(1.5); }
        
        .bento-card .bc-icon {
            width: 60px; height: 60px;
            border-radius: 15px;
            display: flex; align-items: center; justify-content: center;
            font-size: 2rem; margin-bottom: 20px;
            border: 1px solid rgba(212,175,55,0.2);
            color: var(--accent-gold); background: rgba(212, 175, 55, 0.1);
        }
        
        .bento-card .bc-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 2.2rem;
            color: var(--rf-text) !important;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .bento-card .bc-desc {
            font-family: 'Outfit', sans-serif;
            font-size: 1.1rem;
            line-height: 1.5;
            color: var(--rf-muted) !important;
        }
        
        /* Ensure no white boxes in light mode */
        [data-theme="light"] .bento-card {
            background: #FFFFFF !important;
            border-color: rgba(0,0,0,0.1) !important;
        }
        [data-theme="light"] .bento-card:hover {
            border-color: rgba(212,175,55,0.8) !important;
        }
        [data-theme="light"] .bento-card .bc-title { color: #000 !important; }
        [data-theme="light"] .bento-card .bc-desc { color: #444 !important; }
`;

if(!srv.includes('PREMIUM BENTO CARDS ADAPTIVE 3D')) {
    srv = srv.replace(/<\/style>/, bentoCss + '\n    </style>');
}

fs.writeFileSync('public/services.html', srv);
console.log('Master fixes applied: Jitter, Header, Cursor, Light Mode graphics, and White Boxes resolved.');
