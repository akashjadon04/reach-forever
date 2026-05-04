const fs = require('fs');

// 1. INDEX.HTML FIXES (Already done in previous step, but let's re-verify)
let idx = fs.readFileSync('public/index.html', 'utf8');
idx = idx.replace(/&#8377;85 Lakh\+/, '&#8377;85,00,000+');
idx = idx.replace(/Revenue Generated for Local Clients This Quarter/, 'Revenue Generated for our clients');
idx = idx.replace(/<div class="audio-indicator" id="audioIndicator" style="([^"]*)color:\s*var\(--rf-text\);/g, '<div class="audio-indicator" id="audioIndicator" style="$1color: #FFF !important;');
fs.writeFileSync('public/index.html', idx);


// 2. SERVICES.HTML PERFECT SURGICAL OVERHAUL
let srv = fs.readFileSync('public/services.html', 'utf8');

// Nav Active State Fix
srv = srv.replace(/<a href="index\.html" class="nav-pill active">Home<\/a>/, '<a href="index.html" class="nav-pill">Home</a>');
srv = srv.replace(/<a href="services\.html" class="nav-pill">Services<\/a>/, '<a href="services.html" class="nav-pill active">Services</a>');

// Hero Fix & Alignment
srv = srv.replace(/<section class="hero-massive">/, '<section class="services-hero">');
// Ensure CSS matches and solves overlap
srv = srv.replace(/\.services-hero \{ padding-top: 180px !important;\s*position: relative;\s*width: 100%;\s*height: 100vh;\s*min-height: 800px;\s*display: flex;\s*align-items: center;\s*justify-content: center;\s*background: var\(--rf-bg\);\s*\}/, 
    `.services-hero { padding-top: max(120px, 15vh) !important; padding-bottom: 50px; position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--rf-bg); z-index: 1; }`
);
// Hero Title Animation Hook
srv = srv.replace(/<h1 class="hero-title" data-cms="srv_hero_title">The Arsenal of <br><span>Digital Dominance\.<\/span><\/h1>/, 
    `<h1 class="hero-title" data-cms="srv_hero_title">The Arsenal of <br><span id="hero-flip-text" style="color: var(--accent-olive); font-style: italic; display: inline-block;">Digital Dominance.</span></h1>`
);


// 3. HORIZONTAL SCROLL REPLACEMENT (Targeting ONLY .marketing-section)
const newProcessSection = `
        <section class="marketing-section" id="marketing" style="padding: 100px 5%; background: var(--rf-bg); position: relative; z-index: 5;">
            <div class="container text-center" style="margin-bottom: 60px;">
                <span class="tag-pill reveal-up" data-cms="mkt_tag" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: rgba(15, 8, 25, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-gold); box-shadow: 0 10px 30px rgba(0,0,0,0.04); margin-bottom: 20px;"><i class="ri-flashlight-fill"></i> Client Acquisition System</span>
                <h2 class="title-lg reveal-up" data-cms="mkt_header_title" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 5vw, 5rem); margin-bottom: 15px; font-weight: 700; color: var(--rf-text);">How we flood your business with <span style="color: var(--accent-olive); font-style: italic;">buyers.</span></h2>
                <p data-cms="mkt_header_sub" style="font-size: 1.2rem; color: var(--rf-muted); max-width: 600px; margin: 0 auto;">A seamless, high-performance vertical system designed to capture, convert, and retain high-ticket local customers.</p>
            </div>

            <div class="container" style="max-width: 1200px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; position: relative;">
                
                <div class="process-3d-card reveal-up" style="background: rgba(15, 8, 25, 0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 30px 60px rgba(212,175,55,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)';">
                    <div style="font-size: 3rem; color: #0055FF; margin-bottom: 20px;"><i class="ri-facebook-circle-fill"></i></div>
                    <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--rf-text); margin-bottom: 15px;">Targeted Local Traffic</h3>
                    <p style="color: var(--rf-muted); line-height: 1.6; font-size: 1.1rem;">We deploy aggressive Meta and Google Ads in your specific city radius. We hyper-target users who match the exact demographic of your best paying customers.</p>
                </div>

                <div class="process-3d-card reveal-up" style="background: rgba(15, 8, 25, 0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease; transition-delay: 0.1s;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 30px 60px rgba(212,175,55,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)';">
                    <div style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 20px;"><i class="ri-vip-diamond-fill"></i></div>
                    <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--rf-text); margin-bottom: 15px;">High-Ticket Conversion</h3>
                    <p style="color: var(--rf-muted); line-height: 1.6; font-size: 1.1rem;">Traffic is useless if it doesn't convert. We funnel traffic into high-converting landing pages built with luxury UX design to build immediate trust.</p>
                </div>

                <div class="process-3d-card reveal-up" style="background: rgba(15, 8, 25, 0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease; transition-delay: 0.2s;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 30px 60px rgba(212,175,55,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)';">
                    <div style="font-size: 3rem; color: #14B8A6; margin-bottom: 20px;"><i class="ri-robot-2-fill"></i></div>
                    <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--rf-text); margin-bottom: 15px;">Automated Follow-Up</h3>
                    <p style="color: var(--rf-muted); line-height: 1.6; font-size: 1.1rem;">The moment a lead opts in, our system instantly follows up via SMS and Email, warming them up and booking them directly onto your calendar.</p>
                </div>

            </div>
        </section>
`;

// Extract everything from <section class="marketing-section" id="marketing"> down to its closing </section>
const marketingSectionRegex = /<section class="marketing-section" id="marketing">[\s\S]*?<\/section>/;
srv = srv.replace(marketingSectionRegex, newProcessSection);

// Remove the GSAP horizontal scroll script
srv = srv.replace(/let hsWrapper = document\.getElementById\('horizontalWrapper'\);[\s\S]*?hsWrapper\.offsetWidth - window\.innerWidth\s*\}\s*\);\s*\}/, '');


// 4. FOUNDER SECTION (ANSH KHATRI)
const anshSection = `
        <section class="founder-section reveal-up" style="padding: 100px 5%; background: var(--rf-bg); position: relative; z-index: 6;">
            <div class="container" style="max-width: 1300px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; background: rgba(15,8,25,0.3); padding: 50px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 30px 60px rgba(0,0,0,0.2);">
                <div class="founder-img" style="position: relative; width: 100%; height: 600px; border-radius: 30px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2);">
                    <img src="https://images.pexels.com/photos/8372620/pexels-photo-8372620.jpeg?auto=compress&cs=tinysrgb&w=1200&q=100" alt="Ansh Khatri CEO" style="width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.9);">
                    <div style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                        <h4 style="color: #FFF; font-size: 1.5rem; font-family: 'Cormorant Garamond', serif; margin-bottom: 5px;">Ansh Khatri</h4>
                        <p style="color: var(--accent-gold); font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Founder & CEO</p>
                    </div>
                </div>
                <div class="founder-content">
                    <span class="tag-pill" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: rgba(212,175,55,0.1); border-radius: 100px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-gold); margin-bottom: 20px;"><i class="ri-vip-crown-fill"></i> The Mastermind</span>
                    <h2 style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 5vw, 4.5rem); color: var(--rf-text); line-height: 1.1; margin-bottom: 30px;">Architecting Viral <span style="color: var(--accent-olive); font-style: italic;">Growth.</span></h2>
                    <p style="font-size: 1.2rem; color: var(--rf-muted); line-height: 1.7; margin-bottom: 20px;">Ansh Khatri doesn't just run agencies; he builds local empires. With a deep mastery of consumer psychology and aggressive performance marketing, Ansh has scaled Reach Forever into the premier growth partner for high-end local businesses in Punjab.</p>
                    <p style="font-size: 1.2rem; color: var(--rf-muted); line-height: 1.7; margin-bottom: 40px;">His philosophy is simple: If your marketing isn't generating a massive, measurable ROI, it's a waste of time. He engineers every campaign to dominate competitors and flood your calendar with buyers.</p>
                    <div style="display: flex; gap: 30px; align-items: center;">
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-family: 'Cormorant Garamond', serif; font-size: 3rem; color: var(--rf-text); font-weight: 700; line-height: 1;">&#8377;85L+</span>
                            <span style="font-size: 0.9rem; color: var(--rf-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 5px;">Client Revenue Generated</span>
                        </div>
                        <div style="width: 1px; height: 60px; background: rgba(255,255,255,0.1);"></div>
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-family: 'Cormorant Garamond', serif; font-size: 3rem; color: var(--rf-text); font-weight: 700; line-height: 1;">100%</span>
                            <span style="font-size: 0.9rem; color: var(--rf-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 5px;">Growth Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;
// Inject Ansh Khatri BEFORE .bento-section (so it's after dev-section MacBook)
srv = srv.replace(/(<section class="bento-section">)/, anshSection + '\n$1');


// 5. TECHNICAL STACK -> DIGITAL MARKETING STACK (3D TILES)
srv = srv.replace(/<h2 data-cms="bento_header_title">Our Technical Stack\.<\/h2>/, '<h2 data-cms="bento_header_title">Our Marketing Stack.</h2>');
srv = srv.replace(/<p[^>]*data-cms="bento_header_sub"[^>]*>We use the best technology in the world to make sure your business runs perfectly\.<\/p>/, '<p style="color: var(--rf-muted); font-size: 1.1rem; max-width: 600px; margin: 10px auto 0;" data-cms="bento_header_sub">We deploy elite, enterprise-grade marketing technology to scale your business aggressively.</p>');

// Add hover 3D to existing bento cards
srv = srv.replace(/<div class="bento-card span-2x2 reveal-up">/g, '<div class="bento-card span-2x2 reveal-up" style="transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;" onmouseover="this.style.transform=\'translateY(-8px) scale(1.02)\'; this.style.boxShadow=\'0 30px 60px rgba(0,85,255,0.2)\';" onmouseout="this.style.transform=\'translateY(0) scale(1)\'; this.style.boxShadow=\'none\';">');
srv = srv.replace(/<div class="bento-card span-1x2 reveal-up">/g, '<div class="bento-card span-1x2 reveal-up" style="transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;" onmouseover="this.style.transform=\'translateY(-8px) scale(1.02)\'; this.style.boxShadow=\'0 30px 60px rgba(212,175,55,0.2)\';" onmouseout="this.style.transform=\'translateY(0) scale(1)\'; this.style.boxShadow=\'none\';">');
srv = srv.replace(/<div class="bento-card span-2x1 reveal-up">/g, '<div class="bento-card span-2x1 reveal-up" style="transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;" onmouseover="this.style.transform=\'translateY(-8px) scale(1.02)\'; this.style.boxShadow=\'0 30px 60px rgba(138,43,226,0.2)\';" onmouseout="this.style.transform=\'translateY(0) scale(1)\'; this.style.boxShadow=\'none\';">');

// We need to replace the content of the bento-cards to be Marketing Stack. 
// Instead of complex nested regex, let's just do targeted string replaces for the text.
srv = srv.replace(/>Custom Coding by Akash</g, '>Meta Advertising Ecosystem<');
srv = srv.replace(/>We refuse to use cheap, slow templates. Our lead developer, Akash Jadon, writes clean, custom code using modern tools like React and Node.js. This means your website will be faster, safer, and completely unique to your brand.</g, '>We utilize advanced Facebook and Instagram ad infrastructure. Using custom audiences, pixel tracking, and aggressive retargeting, we put your brand in front of high-value local customers exactly when they are most likely to buy.<');
srv = srv.replace(/>Lead Automation</g, '>Google Search Intent<');
srv = srv.replace(/>When a customer fills out a form, our system instantly sends them an automatic email or text. You never miss a lead, even if you are sleeping.</g, '>We capture people actively searching for your services. We dominate the top of Google search results in your specific city.<');
srv = srv.replace(/>Lightning Fast Hosting</g, '>Zapier Automation<');
srv = srv.replace(/>If a website takes more than 3 seconds to load, 50% of people will leave. We put your site on premium servers so it loads instantly.</g, '>We connect all your tools together. When a lead comes in, it instantly triggers SMS, emails, and CRM updates without you lifting a finger.<');
srv = srv.replace(/>Luxury UI\/UX Design</g, '>Elite CRM Pipelines<');
srv = srv.replace(/>People trust things that look expensive. We design your digital presence to make you look like the absolute premium option in your market.</g, '>We build custom HighLevel pipelines to track every single rupee. You will know exactly where every lead is in the buying journey.<');


// 6. HERO TEXT ANIMATION INJECTION (90 FPS)
const heroAnimScript = `
        // Hero Text Flipping (90 FPS Hardware Accelerated)
        const flipTextElement = document.getElementById('hero-flip-text');
        if(flipTextElement) {
            const words = ["Digital Dominance.", "Viral Growth.", "Local Empires."];
            let currentWord = 0;
            setInterval(() => {
                flipTextElement.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                flipTextElement.style.opacity = "0";
                flipTextElement.style.transform = "translateY(-10px)";
                
                setTimeout(() => {
                    currentWord = (currentWord + 1) % words.length;
                    flipTextElement.innerText = words[currentWord];
                    flipTextElement.style.transform = "translateY(10px)";
                    
                    // Force reflow
                    void flipTextElement.offsetWidth;
                    
                    flipTextElement.style.opacity = "1";
                    flipTextElement.style.transform = "translateY(0)";
                }, 400);
            }, 3000);
        }
`;
srv = srv.replace(/(if\(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined'\) \{)/, heroAnimScript + '\n$1');

// 7. FIX MOBILE SPACING
const srvMobileCss = `
        /* MOBILE PERFORMANCE AND LAYOUT FIXES */
        @media (max-width: 1024px) {
            .founder-section .container { grid-template-columns: 1fr !important; padding: 30px !important; }
            .founder-img { height: 400px !important; }
            .marketing-section .container { display: flex !important; flex-direction: column !important; }
        }
`;
if (!srv.includes('MOBILE PERFORMANCE AND LAYOUT FIXES')) {
    srv = srv.replace(/<\/style>/, srvMobileCss + '\n    </style>');
}

fs.writeFileSync('public/services.html', srv);
console.log('Surgical fix applied successfully.');
