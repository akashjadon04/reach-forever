/**
 * ============================================================================
 * ZYROVA DIGITAL : ENTERPRISE INTERACTIVE ENGINE (APPLE-TIER BUILD)
 * Project: Reach Forever - Premium Digital Marketing
 * Version: 11.1.0 (Synchronized Loader Edition)
 * Architecture: ES6 Classes, WebGL, Canvas API, Spring Physics, GSAP ScrollTrigger
 * ============================================================================
 */

'use strict';

console.log("%c Zyrova Digital Engine Initialized | Reach Forever ", "background: #D4AF37; color: #000; font-weight: bold; padding: 4px;");

// ============================================================================
// MODULE 1: BLAZING FAST PRELOADER
// ============================================================================
class ZyrovaPreloader {
    constructor() {
        this.plScreen = document.getElementById('preloader');
        this.plBar = document.getElementById('pl-bar');
        this.plPercent = document.getElementById('pl-percent');
        this.isDataLoaded = false; // ADDED: Flag for CMS to trigger
        this.init();
    }

    init() {
        if (!this.plScreen) return;
        
        let progress = 0;
        this.interval = setInterval(() => { // ADDED: Saved to this.interval
            progress += Math.floor(Math.random() * 20) + 10;
            
            // ADDED: Hold at 90% until backend wakes up and sends data
            if (progress >= 90 && !this.isDataLoaded) progress = 90;
            if (progress > 100) progress = 100;

            if (this.plPercent) this.plPercent.innerText = `${progress}%`;
            if (this.plBar) this.plBar.style.width = `${progress}%`;

            // ADDED: Only complete if data is fully loaded
            if (progress === 100 && this.isDataLoaded) {
                clearInterval(this.interval);
                this.complete();
            }
        }, 50); 
    }

    complete() {
        if(typeof gsap === 'undefined') {
            if(this.plScreen) this.plScreen.style.display = 'none';
            return;
        }
        const tl = gsap.timeline();
        tl.to(this.plBar, { width: '100%', duration: 0.3, ease: "power3.inOut" })
          .to(this.plPercent, { opacity: 0, duration: 0.2 })
          .to('.pl-logo span', { y: "0%", duration: 0.6, ease: "power4.out" })
          .to('.pl-logo span', { y: "-100%", duration: 0.5, delay: 0.2, ease: "power3.in" })
          .to(this.plScreen, { yPercent: -100, duration: 0.8, ease: "power4.inOut" })
          .set(this.plScreen, { display: "none" })
          .from(".reveal-up", { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.2");
    }
}

// ============================================================================
// MODULE 2: HOOKE'S LAW SPRING PHYSICS (LUXURY CURSOR & MAGNETS)
// ============================================================================
class SpringPhysics {
    constructor(mass = 1, tension = 120, friction = 14) {
        this.m = mass; this.k = tension; this.b = friction;
        this.val = 0; this.target = 0; this.vel = 0;
    }
    update(dt) {
        const force = -this.k * (this.val - this.target);
        const damping = -this.b * this.vel;
        const acc = (force + damping) / this.m;
        this.vel += acc * dt; this.val += this.vel * dt;
        return this.val;
    }
}

class LuxuryCursor {
    constructor() {
        this.dot = document.getElementById("cursorDot");
        this.ring = document.getElementById("cursorRing");
        if (!this.dot || !this.ring || window.innerWidth <= 1024) return;

        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.springX = new SpringPhysics(1, 140, 16);
        this.springY = new SpringPhysics(1, 140, 16);
        this.springX.val = this.mouse.x; this.springY.val = this.mouse.y;
        this.lastTime = performance.now();
        this.init();
    }

    init() {
        window.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX; this.mouse.y = e.clientY;
            gsap.set(this.dot, { x: this.mouse.x, y: this.mouse.y });
        });

        const render = (time) => {
            const dt = Math.min((time - this.lastTime) / 1000, 0.016);
            this.lastTime = time;
            this.springX.target = this.mouse.x; this.springY.target = this.mouse.y;
            gsap.set(this.ring, { x: this.springX.update(dt), y: this.springY.update(dt) });
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        this.bindMagnets();
    }

    bindMagnets() {
        document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
            const inner = wrap.querySelector('.magnetic-inner');
            if(!inner) return;
            wrap.addEventListener('mouseenter', () => document.body.classList.add("hover-magnetic"));
            wrap.addEventListener('mouseleave', () => document.body.classList.remove("hover-magnetic"));
            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = (e.clientX - rect.left) - rect.width / 2;
                const y = (e.clientY - rect.top) - rect.height / 2;
                gsap.to(inner, { x: x * 0.2, y: y * 0.2, duration: 0.8, ease: "power3.out", overwrite: "auto" });
                gsap.to(this.ring, { x: e.clientX + x * 0.2, y: e.clientY + y * 0.2, duration: 0.2});
            });
            wrap.addEventListener('mouseleave', () => {
                gsap.to(inner, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
            });
        });

        // Hover states for videos
        document.querySelectorAll('.hover-video, .iphone-mockup, .swiper-slide-reel').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add("hover-video"));
            el.addEventListener('mouseleave', () => document.body.classList.remove("hover-video"));
        });
    }
}

// ============================================================================
// MODULE 3: KINEMATIC SCROLL VELOCITY ENGINE (MARQUEE ONLY)
// ============================================================================
class ScrollVelocityEngine {
    constructor() {
        this.tracks = document.querySelectorAll('.marquee-track');
        if(this.tracks.length === 0) return;
        this.lastY = window.scrollY; 
        this.velocity = 0;
        this.isScrollingDown = true; 
        this.baseSpeed = 0.3;
        this.init();
    }

    init() {
        this.tracks.forEach(track => gsap.to(track, { xPercent: -50, repeat: -1, duration: 40, ease: "linear" }).totalProgress(0.5));

        const render = () => {
            const currentY = window.scrollY;
            const deltaY = currentY - this.lastY;
            this.isScrollingDown = deltaY > 0;
            this.velocity = Math.min(Math.max(deltaY, -40), 40); 
            this.lastY = currentY;
            
            const skewAmount = this.velocity * 0.15;
            const moveAmount = this.isScrollingDown ? -this.baseSpeed - (this.velocity * 0.03) : this.baseSpeed - (this.velocity * 0.03);
            
            this.tracks.forEach(track => {
                gsap.set(track, { x: `+=${moveAmount}`, skewX: skewAmount });
                gsap.to(track, { skewX: 0, duration: 0.6, ease: "power2.out" });
            });

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}

// ============================================================================
// MODULE 4: THREE.JS WEBGL LUXURY FLUID SWARM
// ============================================================================
class LuxuryFluidWebGL {
    constructor() {
        this.container = document.getElementById('particle-canvas');
        if (!this.container || typeof THREE === 'undefined') return;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        this.count = window.innerWidth > 768 ? 1000 : 300; 
        this.mouse = new THREE.Vector2(9999, 9999);
        this.raycaster = new THREE.Raycaster();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.pointOfIntersection = new THREE.Vector3();
        this.isActive = true;
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.count * 3);
        const colors = new Float32Array(this.count * 3);
        this.basePositions = new Float32Array(this.count * 3);

        const color1 = new THREE.Color('#D4AF37'); const color2 = new THREE.Color('#556B2F');

        for (let i = 0; i < this.count; i++) {
            const x = (Math.random() - 0.5) * 35; const y = (Math.random() - 0.5) * 35; const z = (Math.random() - 0.5) * 15;
            positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
            this.basePositions[i * 3] = x; this.basePositions[i * 3 + 1] = y; this.basePositions[i * 3 + 2] = z;
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r; colors[i * 3 + 1] = mixedColor.g; colors[i * 3 + 2] = mixedColor.b;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.4, blending: THREE.NormalBlending });
        this.particlesMesh = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particlesMesh);
        this.camera.position.z = 10;

        this.bindEvents(); this.animate();
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
            this.raycaster.ray.intersectPlane(this.plane, this.pointOfIntersection);
        });
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        if(!this.isActive) return requestAnimationFrame(this.animate.bind(this));
        const positions = this.particlesMesh.geometry.attributes.position.array;
        const time = performance.now() * 0.0005;
        for (let i = 0; i < this.count; i++) {
            const ix = i * 3; const iy = i * 3 + 1; const iz = i * 3 + 2;
            const bx = this.basePositions[ix]; const by = this.basePositions[iy]; const bz = this.basePositions[iz];
            let px = positions[ix]; let py = positions[iy]; let pz = positions[iz];

            const dx = this.pointOfIntersection.x - px; const dy = this.pointOfIntersection.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 4.0) { const force = (4.0 - dist) / 4.0; px -= dx * force * 0.03; py -= dy * force * 0.03; }

            px += (bx - px) * 0.03; py += (by - py) * 0.03; pz += (bz - pz) * 0.03;
            py += Math.sin(time + px * 0.5) * 0.02; pz += Math.cos(time + py * 0.5) * 0.02;
            positions[ix] = px; positions[iy] = py; positions[iz] = pz;
        }
        this.particlesMesh.geometry.attributes.position.needsUpdate = true;
        this.particlesMesh.rotation.y = Math.sin(time * 0.5) * 0.05;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
}

// ============================================================================
// MODULE 5: APPLE-STYLE GSAP SCROLL ARCHITECT
// ============================================================================
class AppleScrollArchitect {
    constructor() {
        this.init();
    }

    init() {
        if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error("GSAP Missing. Animations aborted.");
            return;
        }
        gsap.registerPlugin(ScrollTrigger);

        // 1. Sticky Header & CTA Logic
        window.addEventListener('scroll', () => { 
            const hw = document.getElementById('headerWrap');
            if(hw) hw.style.top = window.scrollY > 80 ? '10px' : '20px'; 

            const stickyCta = document.getElementById('stickyCta');
            if(stickyCta) {
                if(window.scrollY > 800) stickyCta.classList.add('visible');
                else stickyCta.classList.remove('visible');
            }
        });

        // 2. Fast Text Rotator
        const textRotator = document.getElementById('textRotator');
        if(textRotator) {
            // Rotates through 5 words very fast
            gsap.to(textRotator, { yPercent: -83.33, duration: 4, ease: "steps(5)", repeat: -1 });
        }

        // 3. Apple Scroll-Scrubbing Text (Fills with color on scroll)
        const scrubTexts = document.querySelectorAll('.apple-text-reveal');
        scrubTexts.forEach(text => {
            gsap.fromTo(text, 
                { backgroundPositionX: "100%", opacity: 0.3 },
                { 
                    backgroundPositionX: "0%", opacity: 1, ease: "none",
                    scrollTrigger: { trigger: text, start: "top 85%", end: "bottom 45%", scrub: 1 }
                }
            );
        });

        // 4. Hero iPhone Scroll Interaction
        const iphoneMockup = document.querySelector('.iphone-mockup');
        if(iphoneMockup) {
            gsap.to(iphoneMockup, {
                scale: 1.1, yPercent: -5, rotateY: 0, rotateX: 0,
                scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
            });

            // Audio Toggle Logic
            const heroVideoAd = document.getElementById('hero-video-ad');
            const audioIndicator = document.getElementById('audioIndicator');
            iphoneMockup.addEventListener('click', (e) => {
                if(heroVideoAd && audioIndicator) {
                    heroVideoAd.muted = !heroVideoAd.muted;
                    audioIndicator.innerHTML = heroVideoAd.muted ? '<i class="ri-volume-mute-fill"></i> Tap for Sound' : '<i class="ri-volume-up-fill"></i> Sound On';
                }
            });
        }

        // 5. Digital Marketing Service Cards Apple Reveal
        const serviceCards = document.querySelectorAll('.ars-card');
        serviceCards.forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" }}
            );
        });

        // 6. Image Graphic GSAP Animation
        document.querySelectorAll('.reveal-img-gsap').forEach(img => {
            gsap.fromTo(img, 
                { scale: 1.3, opacity: 0, filter: "blur(10px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: img, start: "top 90%" } }
            );
        });

        // 7. Apple Stats Parallax Fade
        const statReveal = document.querySelector('.apple-stat-reveal');
        if(statReveal) {
            ScrollTrigger.create({ trigger: statReveal, start: "top 80%", toggleClass: "apple-fade" });
        }

        // 8. Before/After Slider Interaction
        const baContainer = document.getElementById('baContainer');
        const baBefore = document.getElementById('baBefore');
        const baHandle = document.getElementById('baHandle');
        if(baContainer && baBefore && baHandle) {
            let isDragging = false;
            const updateSlider = (xPos) => {
                const rect = baContainer.getBoundingClientRect();
                let x = Math.max(0, Math.min(xPos - rect.left, rect.width)); 
                const percent = (x / rect.width) * 100;
                baBefore.style.clipPath = `inset(0 ${100 - percent}% 0 0)`; 
                baHandle.style.left = `${percent}%`;
            };
            baContainer.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
            window.addEventListener('mouseup', () => { isDragging = false; });
            window.addEventListener('mousemove', (e) => { if(isDragging) updateSlider(e.clientX); });
            baContainer.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); }, {passive: true});
            window.addEventListener('touchend', () => { isDragging = false; });
            window.addEventListener('touchmove', (e) => { if(isDragging) { if(e.cancelable) e.preventDefault(); updateSlider(e.touches[0].clientX); } }, {passive: false});
        }

        // 9. Fullscreen Reels Modal Logic
        const reelsModal = document.getElementById('reelsModal');
        const rmClose = document.getElementById('rmClose');
        const rmVideos = document.querySelectorAll('.rm-video');

        document.querySelectorAll('.swiper-slide-reel').forEach((el) => {
            el.addEventListener('click', () => {
                if (reelsModal) reelsModal.classList.add('open');
                if(rmVideos.length > 0) {
                    rmVideos.forEach(v => { v.muted = false; v.play(); }); 
                }
            });
        });

        if(rmClose) {
            rmClose.addEventListener('click', () => {
                if (reelsModal) reelsModal.classList.remove('open');
                rmVideos.forEach(v => { v.pause(); v.muted = true; }); 
            });
        }

        if('IntersectionObserver' in window && rmVideos.length > 0) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) { entry.target.play(); } 
                    else { entry.target.pause(); entry.target.currentTime = 0; }
                });
            }, { threshold: 0.6 }); 
            rmVideos.forEach(video => videoObserver.observe(video));
        }

        // 10. Swiper Initialization
        if(typeof Swiper !== 'undefined' && document.querySelector('.swiper-container-reels')) {
            new Swiper('.swiper-container-reels', { 
                effect: "slide", grabCursor: true, centeredSlides: true, 
                slidesPerView: "auto", loop: true, spaceBetween: 20, 
                autoplay: { delay: 4000, disableOnInteraction: false } 
            });
        }
    }
}

// ============================================================================
// MODULE 6: AURA 13.0 NEURAL AI CONCIERGE
// ============================================================================
class AuraNeuralAgent {
    constructor() {
        this.fab = document.getElementById('auraFab');
        this.panel = document.getElementById('auraPanel');
        this.closeBtn = document.getElementById('auraClose');
        this.body = document.getElementById('auraBody');
        this.input = document.getElementById('auraInput');
        this.sendBtn = document.getElementById('auraSend');
        this.typingInd = document.getElementById('auraTyping');
        this.suggestions = document.getElementById('auraSuggestions');
        
        if(!this.fab || !this.panel) return;

        this.isProcessing = false;
        this.knowledgeBase = [
            { regex: /(price|cost|fee)/i, response: "Our pricing is bespoke to your business. Let's map out your guaranteed ROI on a strategy call." },
            { regex: /(call|book|contact|audit)/i, response: "Excellent. <strong>Please utilize the booking portal at the bottom of the page to schedule your session.</strong>" },
            { regex: ".*", response: "I am routing your request to our lead architect. <strong>Please click the Book Free Call button below to pick a time to chat.</strong>" }
        ];

        this.init();
    }

    init() {
        fetch('chatbot.json').then(res => res.ok ? res.json() : null).then(data => { if(data) this.knowledgeBase = data; }).catch(() => {});

        this.fab.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', (e) => { e.preventDefault(); this.panel.classList.remove('active-chat'); });
        
        window.sendAuraSuggestion = (text) => { this.input.value = text; this.handleSend(); };
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => { if(e.key === 'Enter') this.handleSend(); });
    }

    open() {
        this.panel.classList.add('active-chat');
        const delayedMsg = document.getElementById('auraDelayedMsg');
        if(delayedMsg && delayedMsg.style.display === 'none') {
            this.typingInd.style.display = 'flex';
            this.body.scrollTop = this.body.scrollHeight;
            setTimeout(() => {
                this.typingInd.style.display = 'none';
                delayedMsg.style.display = 'block';
                if(this.suggestions) { this.suggestions.style.display = 'flex'; this.body.appendChild(this.suggestions); }
                this.body.scrollTop = this.body.scrollHeight;
            }, 1500);
        }
    }

    handleSend() {
        if (this.isProcessing) return;
        const text = this.input.value.trim();
        if (!text) return;

        if(this.suggestions) this.suggestions.style.display = 'none';
        
        const uMsg = document.createElement('div');
        uMsg.className = 'msg user'; uMsg.innerText = text;
        this.body.insertBefore(uMsg, this.typingInd);
        this.input.value = '';
        this.isProcessing = true;
        
        this.typingInd.style.display = 'flex';
        this.body.appendChild(this.typingInd);
        this.body.scrollTop = this.body.scrollHeight;

        let responseStr = this.knowledgeBase[this.knowledgeBase.length - 1].response;
        for (let rule of this.knowledgeBase) {
            try {
                if (new RegExp(rule.regex, 'i').test(text)) { responseStr = rule.response; break; }
            } catch(e) {}
        }

        setTimeout(() => {
            this.typingInd.style.display = 'none';
            const aiMsg = document.createElement('div');
            aiMsg.className = 'msg ai'; aiMsg.innerHTML = responseStr;
            this.body.appendChild(aiMsg);
            this.body.scrollTop = this.body.scrollHeight;
            this.isProcessing = false;
        }, 1500);
    }
}

// ============================================================================
// MASTER INITIALIZATION HOOK
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Expose preloader to global scope so cms.js can control it
    window.zyrovaPreloader = new ZyrovaPreloader();
    
    new LuxuryCursor();
    new ScrollVelocityEngine();
    window.fluidWebGLInstance = new LuxuryFluidWebGL(); 
    new AppleScrollArchitect();
    new AuraNeuralAgent();

    // Protect Dashboards
    if (window.location.pathname.includes('dashboard')) {
        if (!localStorage.getItem('zyrova_token')) window.location.href = 'admin.html';
    }
});