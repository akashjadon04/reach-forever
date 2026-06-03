const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;">
    <title>Reach Forever | Omnichannel Revenue Architecture</title>
    
    <meta name="description" content="Reach Forever engineers predictable revenue systems, high-ROI local ads, and automated websites for elite businesses.">
    <meta name="theme-color" content="#030303">
    
    <link rel="preload" href="assets/logo.png" as="image">
    <link rel="preload" href="assets/video_1.mp4" as="video">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Reach Forever",
      "image": "https://reachforever.in/assets/logo.png",
      "url": "https://reachforever.in/",
      "telephone": "+91-81466-52870",
      "priceRange": "$$$$"
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">

    <style>
        :root {
            --bg: #030303;
            --surface: #0A0A0A;
            --surface-glass: rgba(15, 15, 15, 0.6);
            --border: rgba(255, 255, 255, 0.08);
            --accent: #E0E0E0;
            --gold: #D4AF37;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-x: hidden; background: var(--bg); color: #FFF; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        
        ::selection { background: var(--gold); color: #000; }

        /* HEADER */
        .glass-header {
            position: fixed; top: 0; left: 0; width: 100%; height: 80px; z-index: 9999;
            background: var(--surface-glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;
            padding: 0 5%; will-change: transform; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .header-logo { height: 35px; will-change: transform; transition: 0.3s; }
        .header-logo:hover { transform: scale(1.05); }
        .nav-links { display: flex; gap: 30px; }
        .nav-link { 
            color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.9rem; font-weight: 500; 
            letter-spacing: 0.5px; transition: color 0.3s; position: relative; 
        }
        .nav-link:hover { color: #FFF; }
        .nav-link::after {
            content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 1px;
            background: #FFF; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* HERO SECTION */
        .hero {
            position: relative; min-height: 100vh; padding-top: 100px; display: grid; grid-template-columns: 1fr 1fr;
            align-items: center; padding-left: 8%; padding-right: 5%; overflow: hidden;
        }
        .hero-bg-glow {
            position: absolute; top: 20%; left: 10%; width: 50vw; height: 50vw;
            background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%);
            filter: blur(80px); z-index: 0; pointer-events: none;
        }
        .hero-content { z-index: 2; position: relative; }
        .hero-tag {
            display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; 
            background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 100px;
            font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; color: var(--gold); margin-bottom: 30px;
        }
        .hero-tag i { animation: pulse 2s infinite; }
        @keyframes pulse { 0% {opacity:0.5;} 50% {opacity:1;} 100% {opacity:0.5;} }
        
        .hero-title {
            font-size: clamp(3.5rem, 6vw, 6rem); font-weight: 800; line-height: 1.05; letter-spacing: -2px; margin-bottom: 30px;
        }
        .hero-title span {
            background: linear-gradient(135deg, #FFF 0%, rgba(255,255,255,0.4) 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-desc {
            font-size: 1.15rem; line-height: 1.6; color: rgba(255,255,255,0.6); max-width: 500px; margin-bottom: 40px;
        }
        
        .btn-magnetic {
            display: inline-flex; align-items: center; justify-content: center; padding: 18px 40px;
            background: #FFF; color: #000; font-weight: 700; border-radius: 100px; text-decoration: none;
            font-size: 1rem; transition: transform 0.1s; will-change: transform; position: relative; overflow: hidden;
        }
        .btn-magnetic::before {
            content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--gold), #FFF);
            opacity: 0; transition: opacity 0.3s; z-index: 0;
        }
        .btn-magnetic:hover::before { opacity: 1; }
        .btn-magnetic span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

        /* IPHONE MOCKUP */
        .hero-visual { z-index: 2; position: relative; display: flex; justify-content: center; align-items: center; }
        .iphone-mockup {
            width: 320px; height: 650px; background: #000; border-radius: 45px; padding: 12px;
            box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(255,255,255,0.1);
            position: relative; transform: rotate(-5deg) translateY(20px); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform;
        }
        .iphone-mockup:hover { transform: rotate(0deg) translateY(0); }
        .iphone-screen {
            width: 100%; height: 100%; border-radius: 35px; background: #111; overflow: hidden; position: relative;
        }
        .iphone-notch {
            position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 30px;
            background: #000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; z-index: 10;
        }
        .iphone-video { width: 100%; height: 100%; object-fit: cover; }
        .iphone-overlay {
            position: absolute; bottom: 30px; left: 20px; right: 20px; padding: 15px;
            background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 15px;
            cursor: pointer; transition: 0.3s;
        }
        .iphone-overlay:hover { background: rgba(0,0,0,0.7); border-color: rgba(255,255,255,0.3); }
        
        /* APPLE SCROLL SEQUENCE */
        .scroll-engine {
            position: relative; height: 400vh; background: #000; border-top: 1px solid var(--border);
        }
        .scroll-sticky {
            position: sticky; top: 0; width: 100%; height: 100vh; overflow: hidden;
            display: flex; align-items: center; justify-content: center; perspective: 1000px;
        }
        .se-graphic {
            width: 80vmin; height: 80vmin; will-change: transform; transform: scale(0.8) translateZ(-200px);
            position: relative; display: flex; align-items: center; justify-content: center;
        }
        /* Intricate Inline SVG Machine */
        .se-node { stroke: rgba(255,255,255,0.1); stroke-width: 1; fill: none; will-change: stroke-dashoffset, transform; }
        .se-glow { fill: url(#glowGradient); opacity: 0.5; mix-blend-mode: screen; transition: opacity 0.3s; }
        
        .se-text-layer {
            position: absolute; inset: 0; pointer-events: none;
        }
        .se-text {
            position: absolute; width: 100%; text-align: center; top: 50%; transform: translateY(-50%);
            opacity: 0; will-change: opacity, transform;
        }
        .se-text h3 { font-size: clamp(2rem, 4vw, 4rem); font-weight: 800; letter-spacing: -1px; margin-bottom: 15px; }
        .se-text p { font-size: 1.2rem; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto; }

        /* EVERYWHERE ONLINE: LIQUID MESH */
        .liquid-section {
            position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center;
            overflow: hidden; padding: 100px 5%; border-top: 1px solid var(--border); background: #000;
        }
        .liquid-bg {
            position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none;
        }
        .liquid-blob {
            position: absolute; border-radius: 50%; filter: blur(120px); will-change: transform, background;
            transition: background 1s ease;
        }
        .blob-1 { top: -10%; left: -10%; width: 60vw; height: 60vw; background: rgba(228, 64, 95, 0.4); animation: drift 20s infinite alternate; }
        .blob-2 { bottom: -10%; right: -10%; width: 50vw; height: 50vw; background: rgba(24, 119, 242, 0.4); animation: drift 25s infinite alternate-reverse; }
        
        @keyframes drift {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(10%, 5%) scale(1.1); }
            100% { transform: translate(-5%, 15%) scale(0.9); }
        }

        .liquid-content { position: relative; z-index: 2; width: 100%; max-width: 1400px; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        
        .lq-text h2 { font-size: clamp(3rem, 5vw, 5rem); font-weight: 800; line-height: 1; margin-bottom: 20px; }
        .lq-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
        
        .lq-card {
            background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 24px; padding: 25px;
            display: flex; align-items: center; gap: 15px; cursor: pointer; transition: all 0.3s;
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        }
        .lq-card:hover, .lq-card.active {
            background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); transform: translateY(-5px);
        }

        /* 3D GLASS PEDESTAL CYLINDER */
        .pedestal-wrapper {
            position: relative; width: 100%; height: 500px; display: flex; justify-content: center; align-items: center; perspective: 1200px;
        }
        .cylinder-carousel {
            width: 250px; height: 400px; position: relative; transform-style: preserve-3d; animation: rotateCyl 25s infinite linear;
        }
        @keyframes rotateCyl { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-360deg); } }
        .cylinder-face {
            position: absolute; width: 100%; height: 100%; border-radius: 24px; overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 30px 60px rgba(0,0,0,0.5);
            backface-visibility: hidden; background: #000;
        }
        .cylinder-face img { width: 100%; height: 100%; object-fit: cover; }
        .glass-pedestal {
            position: absolute; bottom: -50px; left: 50%; transform: translateX(-50%) rotateX(75deg);
            width: 400px; height: 400px; border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
            border: 2px solid rgba(255,255,255,0.05); box-shadow: 0 0 50px rgba(255,255,255,0.1);
        }

        /* HOLOGRAPHIC SMART CARDS */
        .services-section { padding: 120px 5%; position: relative; background: #050505; border-top: 1px solid var(--border); }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-header h2 { font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 800; margin-bottom: 20px; }
        
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; max-width: 1400px; margin: 0 auto; perspective: 1200px; }
        
        .holo-card {
            position: relative; height: 450px; background: var(--surface); border: 1px solid var(--border);
            border-radius: 30px; padding: 40px; display: flex; flex-direction: column; overflow: hidden;
            transform-style: preserve-3d; transition: border-color 0.3s; will-change: transform;
        }
        .holo-card:hover { border-color: rgba(255,255,255,0.3); }
        
        /* 3D Glare & Graphic */
        .holo-glare {
            position: absolute; inset: 0; background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%);
            opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 10;
        }
        .holo-card:hover .holo-glare { opacity: 1; }
        
        .holo-graphic {
            flex: 1; display: flex; align-items: center; justify-content: center; position: relative;
            transform: translateZ(50px); /* Pops out in 3D */ pointer-events: none;
        }
        /* Dynamic SVG Drawing */
        .holo-svg-path { stroke-dasharray: 1000; stroke-dashoffset: 1000; transition: stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1); }
        .holo-card:hover .holo-svg-path { stroke-dashoffset: 0; }
        
        .holo-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 15px; transform: translateZ(30px); }
        .holo-desc { font-size: 1rem; color: rgba(255,255,255,0.6); line-height: 1.6; transform: translateZ(20px); }

        /* REELS MODAL */
        .reels-modal {
            position: fixed; inset: 0; background: rgba(0,0,0,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            z-index: 99999; display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: 0.4s;
        }
        .reels-modal.active { opacity: 1; pointer-events: auto; }
        .rm-close {
            position: absolute; top: 30px; right: 30px; width: 50px; height: 50px; background: rgba(255,255,255,0.1);
            border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
            cursor: pointer; transition: 0.3s;
        }
        .rm-close:hover { background: #FFF; color: #000; }
        .rm-container { width: 360px; height: 80vh; background: #000; border-radius: 30px; overflow: hidden; position: relative; }
        .rm-video { width: 100%; height: 100%; object-fit: cover; }

        /* FOOTER */
        .premium-footer {
            background: #000; border-top: 1px solid var(--border); padding: 80px 5% 40px; text-align: center;
        }
        .footer-logo { height: 40px; margin-bottom: 20px; opacity: 0.5; transition: 0.3s; }
        .footer-logo:hover { opacity: 1; }
        .footer-tag { font-size: 0.9rem; color: rgba(255,255,255,0.4); letter-spacing: 2px; text-transform: uppercase; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
            .hero { grid-template-columns: 1fr; text-align: center; padding: 120px 5% 60px; gap: 60px; }
            .hero-desc { margin: 0 auto 40px; }
            .liquid-content { grid-template-columns: 1fr; text-align: center; }
            .se-text h3 { font-size: 2rem; }
            .pedestal-wrapper { height: 350px; }
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header class="glass-header" id="header">
        <img src="assets/logo.png" alt="Reach Forever" class="header-logo">
        <nav class="nav-links">
            <a href="#" class="nav-link" onclick="window.scrollTo(0, document.getElementById('scrollEngine').offsetTop)">Architecture</a>
            <a href="#" class="nav-link" onclick="window.scrollTo(0, document.querySelector('.services-section').offsetTop)">Systems</a>
        </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
        <div class="hero-bg-glow"></div>
        <div class="hero-content">
            <div class="hero-tag"><i class="ri-flashlight-fill"></i> OMNICHANNEL REVENUE ARCHITECTURE</div>
            <h1 class="hero-title">WE ENGINEER <span>PREDICTABLE</span> REVENUE.</h1>
            <p class="hero-desc">We build enterprise-grade sales engines, automated lead-capture systems, and high-ROI local ads that flood your business with high-ticket clients.</p>
            <a href="#" class="btn-magnetic" id="heroBtn"><span>Start Your Audit <i class="ri-arrow-right-line"></i></span></a>
        </div>
        
        <div class="hero-visual">
            <div class="iphone-mockup" id="iphoneHero">
                <div class="iphone-notch"></div>
                <div class="iphone-screen">
                    <video class="iphone-video" id="heroVideoAd" src="assets/video_1.mp4" autoplay loop muted playsinline></video>
                    <div class="iphone-overlay" onclick="openReelsModal()">
                        <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                            <i class="ri-play-fill" style="color: #FFF; font-size: 1.2rem;"></i>
                        </div>
                        <div>
                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6); font-weight: 500;">LIVE PROOF</div>
                            <div style="font-size: 1rem; color: #FFF; font-weight: 700;">Client Reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Apple-Style Scroll Sequence -->
    <section class="scroll-engine" id="scrollEngine">
        <div class="scroll-sticky">
            <!-- Centerpiece Graphic -->
            <div class="se-graphic" id="seGraphic">
                <svg viewBox="0 0 800 800" width="100%" height="100%">
                    <defs>
                        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="rgba(212,175,55,1)" />
                            <stop offset="100%" stop-color="rgba(212,175,55,0)" />
                        </radialGradient>
                    </defs>
                    <!-- Core Ring -->
                    <circle cx="400" cy="400" r="200" class="se-node" id="seRing" stroke-dasharray="1256" stroke-dashoffset="1256" stroke-width="2" />
                    <!-- Nodes -->
                    <circle cx="400" cy="200" r="10" fill="#D4AF37" class="se-glow" id="seNode1" opacity="0"/>
                    <circle cx="600" cy="400" r="10" fill="#1877F2" class="se-glow" id="seNode2" opacity="0"/>
                    <circle cx="200" cy="400" r="10" fill="#E4405F" class="se-glow" id="seNode3" opacity="0"/>
                    
                    <!-- Connecting Lines -->
                    <path d="M 400 200 L 600 400 L 400 600 L 200 400 Z" class="se-node" id="sePath" stroke-dasharray="1132" stroke-dashoffset="1132" />
                </svg>
            </div>
            
            <!-- Text Layers -->
            <div class="se-text-layer">
                <div class="se-text" id="seText1">
                    <h3>1. Automated Capture</h3>
                    <p>We build high-converting landing pages that transform cold traffic into booked appointments instantly.</p>
                </div>
                <div class="se-text" id="seText2">
                    <h3>2. Precision Targeting</h3>
                    <p>Using proprietary local ad strategies on Meta and Google, we position you exactly where your buyers are looking.</p>
                </div>
                <div class="se-text" id="seText3">
                    <h3>3. Predictable Growth</h3>
                    <p>Every node is interconnected. Tracking, CRM integration, and retargeting create a frictionless revenue machine.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Liquid Mesh / Everywhere Online -->
    <section class="liquid-section">
        <div class="liquid-bg">
            <div class="liquid-blob blob-1" id="liqBlob1"></div>
            <div class="liquid-blob blob-2" id="liqBlob2"></div>
        </div>
        
        <div class="liquid-content">
            <div class="lq-left">
                <div class="lq-text">
                    <h2 id="lqTitle">Everywhere Online.</h2>
                    <p style="font-size: 1.1rem; color: rgba(255,255,255,0.7); line-height: 1.6;">We build Omnipresence. Select a channel to view active client architectures and local saturation models.</p>
                </div>
                
                <div class="lq-controls">
                    <div class="lq-card active" onclick="switchLiquid('ig')">
                        <i class="ri-instagram-fill" style="font-size: 2rem; color: #E4405F;"></i>
                        <div><strong style="display:block; font-size:1.1rem;">Instagram</strong><span style="font-size:0.85rem; color:rgba(255,255,255,0.5)">Visual Growth</span></div>
                    </div>
                    <div class="lq-card" onclick="switchLiquid('fb')">
                        <i class="ri-facebook-circle-fill" style="font-size: 2rem; color: #1877F2;"></i>
                        <div><strong style="display:block; font-size:1.1rem;">Facebook</strong><span style="font-size:0.85rem; color:rgba(255,255,255,0.5)">Local Ads</span></div>
                    </div>
                    <div class="lq-card" onclick="switchLiquid('go')">
                        <i class="ri-google-fill" style="font-size: 2rem; color: #F4B400;"></i>
                        <div><strong style="display:block; font-size:1.1rem;">Google</strong><span style="font-size:0.85rem; color:rgba(255,255,255,0.5)">Search Intent</span></div>
                    </div>
                    <div class="lq-card" onclick="switchLiquid('web')">
                        <i class="ri-window-line" style="font-size: 2rem; color: #00FFCC;"></i>
                        <div><strong style="display:block; font-size:1.1rem;">Websites</strong><span style="font-size:0.85rem; color:rgba(255,255,255,0.5)">Conversion</span></div>
                    </div>
                </div>
            </div>
            
            <div class="lq-right">
                <div class="pedestal-wrapper">
                    <div class="glass-pedestal"></div>
                    <div class="cylinder-carousel">
                        <div class="cylinder-face" style="transform:rotateY(0deg) translateZ(200px)"><img src="assets/ig_1.png" id="cyl-1"></div>
                        <div class="cylinder-face" style="transform:rotateY(60deg) translateZ(200px)"><img src="assets/ig_2.png" id="cyl-2"></div>
                        <div class="cylinder-face" style="transform:rotateY(120deg) translateZ(200px)"><img src="assets/ig_3.png" id="cyl-3"></div>
                        <div class="cylinder-face" style="transform:rotateY(180deg) translateZ(200px)"><img src="assets/ig_4.png" id="cyl-4"></div>
                        <div class="cylinder-face" style="transform:rotateY(240deg) translateZ(200px)"><img src="assets/ig_5.png" id="cyl-5"></div>
                        <div class="cylinder-face" style="transform:rotateY(300deg) translateZ(200px)"><img src="assets/ig_6.png" id="cyl-6"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Holographic Services -->
    <section class="services-section">
        <div class="section-header">
            <h2>The Systems.</h2>
            <p style="font-size:1.1rem; color:rgba(255,255,255,0.6);">Precision-engineered modules that form your revenue machine.</p>
        </div>
        
        <div class="services-grid">
            <!-- Card 1: Ads -->
            <div class="holo-card">
                <div class="holo-glare"></div>
                <div class="holo-graphic">
                    <svg viewBox="0 0 200 150" width="100%" height="150" style="overflow:visible">
                        <circle cx="100" cy="75" r="40" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
                        <circle cx="100" cy="75" r="60" stroke="rgba(255,255,255,0.05)" stroke-width="1" fill="none"/>
                        <path class="holo-svg-path" d="M100 35 A40 40 0 0 1 140 75 A40 40 0 0 1 100 115 A40 40 0 0 1 60 75 A40 40 0 0 1 100 35" stroke="#1877F2" stroke-width="4" fill="none" stroke-linecap="round"/>
                        <circle cx="100" cy="75" r="5" fill="#FFF"/>
                    </svg>
                </div>
                <h3 class="holo-title">Omnipresent Ads</h3>
                <p class="holo-desc">We deploy hyper-targeted Meta & Google campaigns that dominate your local radius, putting you in front of ready-to-buy customers instantly.</p>
            </div>
            
            <!-- Card 2: Websites -->
            <div class="holo-card">
                <div class="holo-glare"></div>
                <div class="holo-graphic">
                    <svg viewBox="0 0 200 150" width="100%" height="150" style="overflow:visible">
                        <rect x="30" y="30" width="140" height="90" rx="10" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
                        <line x1="30" y1="50" x2="170" y2="50" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                        <path class="holo-svg-path" d="M 50 80 L 150 80 M 50 100 L 120 100" stroke="#D4AF37" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                </div>
                <h3 class="holo-title">Automated Websites</h3>
                <p class="holo-desc">Lightning-fast, conversion-optimized architectures engineered with one goal: to turn clicks into booked appointments while you sleep.</p>
            </div>
            
            <!-- Card 3: SEO -->
            <div class="holo-card">
                <div class="holo-glare"></div>
                <div class="holo-graphic">
                    <svg viewBox="0 0 200 150" width="100%" height="150" style="overflow:visible">
                        <line x1="30" y1="130" x2="170" y2="130" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                        <line x1="30" y1="20" x2="30" y2="130" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                        <path class="holo-svg-path" d="M 40 120 L 80 80 L 120 90 L 160 30" stroke="#00FFCC" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="160" cy="30" r="6" fill="#FFF"/>
                    </svg>
                </div>
                <h3 class="holo-title">Search Dominance</h3>
                <p class="holo-desc">We structure your digital footprint to conquer Google's local rankings, ensuring you are the undisputed #1 choice when people search for your services.</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="premium-footer">
        <img src="assets/logo.png" class="footer-logo" alt="Reach Forever">
        <p class="footer-tag">Engineering Predictable Revenue.</p>
        <div style="margin-top: 40px; font-size: 0.8rem; color: rgba(255,255,255,0.3);">
            &copy; 2026 Reach Forever. All rights reserved. | Precision Coded.
        </div>
    </footer>

    <!-- Reels Modal Container -->
    <div class="reels-modal" id="reelsModal">
        <div class="rm-close" onclick="closeReelsModal()"><i class="ri-close-line"></i></div>
        <div class="rm-container">
            <video class="rm-video" id="rmVideo" controls playsinline></video>
        </div>
    </div>

    <!-- Core Engine Scripts -->
    <script>
        // 1. MAGNETIC BUTTON
        const btn = document.getElementById('heroBtn');
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) * 0.3;
            const y = (e.clientY - rect.top - rect.height/2) * 0.3;
            btn.style.transform = \`translate(\${x}px, \${y}px)\`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });

        // 2. APPLE-STYLE SCROLL SCRUBBER (NATIVE RAF)
        const seqSection = document.getElementById('scrollEngine');
        const seqRing = document.getElementById('seRing');
        const seqPath = document.getElementById('sePath');
        const nodes = [document.getElementById('seNode1'), document.getElementById('seNode2'), document.getElementById('seNode3')];
        const texts = [document.getElementById('seText1'), document.getElementById('seText2'), document.getElementById('seText3')];
        const graphic = document.getElementById('seGraphic');

        let ticking = false;

        function updateScrollEngine() {
            const rect = seqSection.getBoundingClientRect();
            const start = rect.top; 
            const h = rect.height - window.innerHeight;
            
            if (start <= 0 && start >= -h) {
                // Calculate progress from 0 to 1
                const progress = Math.abs(start) / h;
                
                // Animate Graphic Scale & Rotate
                const scale = 0.8 + (progress * 0.4); // 0.8 -> 1.2
                const rot = progress * 90; // 0 -> 90deg
                graphic.style.transform = \`scale(\${scale}) rotate(\${rot}deg) translateZ(0)\`;

                // Animate SVG Paths
                seqRing.style.strokeDashoffset = 1256 - (progress * 1256);
                seqPath.style.strokeDashoffset = 1132 - (progress * 1132);

                // Animate Texts & Nodes based on segments
                texts.forEach(t => t.style.opacity = 0);
                nodes.forEach(n => n.style.opacity = 0);

                if (progress > 0.1 && progress < 0.35) {
                    texts[0].style.opacity = (progress - 0.1) * 4;
                    nodes[0].style.opacity = 1;
                } else if (progress >= 0.35 && progress < 0.65) {
                    texts[1].style.opacity = (progress - 0.35) * 4;
                    nodes[1].style.opacity = 1;
                } else if (progress >= 0.65 && progress < 0.95) {
                    texts[2].style.opacity = (progress - 0.65) * 4;
                    nodes[2].style.opacity = 1;
                }
            } else if (start > 0) {
                // Before section
                graphic.style.transform = 'scale(0.8) rotate(0deg) translateZ(0)';
                seqRing.style.strokeDashoffset = 1256;
                seqPath.style.strokeDashoffset = 1132;
            } else {
                // After section
                graphic.style.transform = 'scale(1.2) rotate(90deg) translateZ(0)';
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollEngine);
                ticking = true;
            }
        }, {passive: true});

        // 3. LIQUID MESH CONTROLLER
        window.switchLiquid = function(type) {
            // Update Active State
            document.querySelectorAll('.lq-card').forEach(c => c.classList.remove('active'));
            event.currentTarget.classList.add('active');

            const b1 = document.getElementById('liqBlob1');
            const b2 = document.getElementById('liqBlob2');
            
            // Swap Cylinders
            const map = {ig:'ig', fb:'fb', go:'gl', web:'wb'};
            const prefix = map[type];
            for(let i=1; i<=6; i++) {
                const img = document.getElementById('cyl-'+i);
                if(img) img.src = 'assets/'+prefix+'_'+i+'.png';
            }

            // Swap Liquid Colors
            if(type === 'ig') { b1.style.background = 'rgba(228,64,95,0.4)'; b2.style.background = 'rgba(253,29,29,0.4)'; }
            if(type === 'fb') { b1.style.background = 'rgba(24,119,242,0.4)'; b2.style.background = 'rgba(0,85,255,0.4)'; }
            if(type === 'go') { b1.style.background = 'rgba(244,180,0,0.4)'; b2.style.background = 'rgba(219,68,55,0.4)'; }
            if(type === 'web') { b1.style.background = 'rgba(0,255,204,0.4)'; b2.style.background = 'rgba(0,136,255,0.4)'; }
        };

        // 4. 3D HOLOGRAPHIC CARDS
        document.querySelectorAll('.holo-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate Rotation
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
                
                // Update Glare Position
                card.style.setProperty('--mouse-x', \`\${(x / rect.width) * 100}%\`);
                card.style.setProperty('--mouse-y', \`\${(y / rect.height) * 100}%\`);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        // 5. REELS MODAL (Using hardcoded assets array for robustness)
        const videos = [
            'assets/video_1.mp4', 'assets/video_2.mp4', 'assets/video_3.mp4',
            'assets/video_4.mp4', 'assets/video_5.mp4', 'assets/video_6.mp4'
        ];
        
        window.openReelsModal = function() {
            const rm = document.getElementById('reelsModal');
            const v = document.getElementById('rmVideo');
            const hero = document.getElementById('heroVideoAd');
            
            if(hero) hero.pause();
            
            // Randomly select a video
            const rand = videos[Math.floor(Math.random() * videos.length)];
            v.src = rand;
            
            rm.classList.add('active');
            document.body.style.overflow = 'hidden';
            v.play().catch(()=>{});
        };
        
        window.closeReelsModal = function() {
            const rm = document.getElementById('reelsModal');
            const v = document.getElementById('rmVideo');
            const hero = document.getElementById('heroVideoAd');
            
            rm.classList.remove('active');
            document.body.style.overflow = 'auto';
            v.pause();
            
            if(hero) hero.play().catch(()=>{});
        };
        
        // Hide header on scroll down, show on scroll up
        let lastScroll = 0;
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            const curr = window.scrollY;
            if(curr > 100 && curr > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScroll = curr;
        }, {passive:true});

    </script>
</body>
</html>`;

fs.writeFileSync('public/index.html', html);
console.log('Successfully generated the God-Level Architecture for index.html.');
