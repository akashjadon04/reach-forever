/**
 * ============================================================================
 * ZYROVA DIGITAL : ENTERPRISE INTERACTIVE ENGINE (TITANIUM BUILD 12.0)
 * Project: Reach Forever - Premium Digital Marketing
 * Architecture: ES6 Classes, WebGL, Spring Physics, GSAP, Lenis, MobileGuard
 * ============================================================================
 */

'use strict';

console.log("%c Zyrova Digital Engine v12.0 | Apple-Tier Active ", "background: #D4AF37; color: #000; font-weight: bold; padding: 4px; border-radius: 2px;");

// ============================================================================
// MODULE 0: MOBILE GUARD (PREVENTS IOS LAYOUT OVERLAPS)
// ============================================================================
class MobileGuard {
    constructor() {
        this.isMobile = window.innerWidth <= 1024;
        this.init();
    }
    init() {
        const fixViewport = () => {
            // Fixes the iOS Safari address bar overlap bug
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            this.isMobile = window.innerWidth <= 1024;
        };
        window.addEventListener('resize', fixViewport);
        fixViewport();
    }
}
const ZyrovaGuard = new MobileGuard();

// ============================================================================
// MODULE 1: BLAZING FAST PRELOADER (OPTIMIZED)
// ============================================================================
class ZyrovaPreloader {
    constructor() {
        this.plScreen = document.getElementById('preloader');
        this.plBar = document.getElementById('pl-bar');
        this.plPercent = document.getElementById('pl-percent');
        this.isDataLoaded = false; 
        this.init();
    }

    init() {
        if (!this.plScreen) return;
        let progress = 0;
        
        const loadingLoop = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 10;
            if (progress >= 90 && !this.isDataLoaded) progress = 90;
            if (progress > 100) progress = 100;

            if (this.plPercent) this.plPercent.innerText = `${progress}%`;
            if (this.plBar) this.plBar.style.width = `${progress}%`;

            if (progress === 100 && this.isDataLoaded) {
                clearInterval(loadingLoop);
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
// MODULE 2: HOOKE'S LAW SPRING PHYSICS (LUXURY CURSOR)
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
        // KILL SWITCH: Do not run heavy physics on mobile
        if (!this.dot || !this.ring || ZyrovaGuard.isMobile) return;

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
    }
}

// ============================================================================
// MODULE 3: KINEMATIC SCROLL VELOCITY ENGINE 
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
// MODULE 4: THREE.JS WEBGL LUXURY FLUID SWARM (MEMORY LEAK FIXED)
// ============================================================================
class LuxuryFluidWebGL {
    constructor() {
        this.container = document.getElementById('particle-canvas');
        if (!this.container || typeof THREE === 'undefined') return;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        
        // DYNAMIC SCALING: Reduces count on mobile to save RAM
        this.count = ZyrovaGuard.isMobile ? 300 : 1200; 
        this.mouse = new THREE.Vector2(9999, 9999);
        this.raycaster = new THREE.Raycaster();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.pointOfIntersection = new THREE.Vector3();
        
        // CULLING FLAG
        this.isActive = true; 
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // FORCE Max Pixel Ratio to 2 to prevent high-res iOS crashes
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.count * 3);
        const colors = new Float32Array(this.count * 3);
        this.basePositions = new Float32Array(this.count * 3);

        const color1 = new THREE.Color('#D4AF37'); 
        const color2 = new THREE.Color('#9047FF'); // Updated to Neon Purple for Hologram aesthetic

        for (let i = 0; i < this.count; i++) {
            const x = (Math.random() - 0.5) * 35; const y = (Math.random() - 0.5) * 35; const z = (Math.random() - 0.5) * 15;
            positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
            this.basePositions[i * 3] = x; this.basePositions[i * 3 + 1] = y; this.basePositions[i * 3 + 2] = z;
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r; colors[i * 3 + 1] = mixedColor.g; colors[i * 3 + 2] = mixedColor.b;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.material = new THREE.PointsMaterial({ size: ZyrovaGuard.isMobile ? 0.08 : 0.05, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
        this.particlesMesh = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particlesMesh);
        this.camera.position.z = 10;

        this.bindEvents(); 
        this.setupCulling();
        this.animate();
    }

    setupCulling() {
        // Pauses the WebGL render loop when not in view to save phone battery
        if('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                this.isActive = entries[0].isIntersecting;
            });
            observer.observe(this.container);
        }
    }

    bindEvents() {
        if (!ZyrovaGuard.isMobile) {
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
                this.raycaster.setFromCamera(this.mouse, this.camera);
                this.raycaster.ray.intersectPlane(this.plane, this.pointOfIntersection);
            });
        }
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        if(!this.isActive) return; // Saves processing power

        const positions = this.particlesMesh.geometry.attributes.position.array;
        const time = performance.now() * 0.0005;
        for (let i = 0; i < this.count; i++) {
            const ix = i * 3; const iy = i * 3 + 1; const iz = i * 3 + 2;
            const bx = this.basePositions[ix]; const by = this.basePositions[iy]; const bz = this.basePositions[iz];
            let px = positions[ix]; let py = positions[iy]; let pz = positions[iz];

            if (!ZyrovaGuard.isMobile) {
                const dx = this.pointOfIntersection.x - px; const dy = this.pointOfIntersection.y - py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 4.0) { const force = (4.0 - dist) / 4.0; px -= dx * force * 0.03; py -= dy * force * 0.03; }
            }

            px += (bx - px) * 0.03; py += (by - py) * 0.03; pz += (bz - pz) * 0.03;
            py += Math.sin(time + px * 0.5) * 0.02; pz += Math.cos(time + py * 0.5) * 0.02;
            positions[ix] = px; positions[iy] = py; positions[iz] = pz;
        }
        this.particlesMesh.geometry.attributes.position.needsUpdate = true;
        this.particlesMesh.rotation.y = Math.sin(time * 0.5) * 0.05;
        this.renderer.render(this.scene, this.camera);
    }
}

// ============================================================================
// MODULE 5: APPLE-STYLE GSAP + LENIS ARCHITECT
// ============================================================================
class AppleScrollArchitect {
    constructor() {
        this.init();
    }

    init() {
        if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        // LENIS SMOOTH SCROLLING INJECTION
        if (typeof Lenis !== "undefined") {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothTouch: false, // Critical for mobile layout safety
            });
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        }

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
        if(textRotator) { gsap.to(textRotator, { yPercent: -83.33, duration: 4, ease: "steps(5)", repeat: -1 }); }

        // 3. Apple Scroll-Scrubbing Text
        const scrubTexts = document.querySelectorAll('.apple-text-reveal');
        scrubTexts.forEach(text => {
            gsap.fromTo(text, 
                { backgroundPositionX: "100%", opacity: 0.3 },
                { backgroundPositionX: "0%", opacity: 1, ease: "none",
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
        }
    }
}

// ============================================================================
// MODULE 6: AURA 13.0 NEURAL AI CONCIERGE (Unchanged - Logic is flawless)
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
            try { if (new RegExp(rule.regex, 'i').test(text)) { responseStr = rule.response; break; } } catch(e) {}
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
    window.zyrovaPreloader = new ZyrovaPreloader();
    new LuxuryCursor();
    new ScrollVelocityEngine();
    window.fluidWebGLInstance = new LuxuryFluidWebGL(); 
    new AppleScrollArchitect();
    new AuraNeuralAgent();

    if (window.location.pathname.includes('dashboard')) {
        if (!localStorage.getItem('zyrova_token')) window.location.href = 'admin.html';
    }
});