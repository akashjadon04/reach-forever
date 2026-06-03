
/* ================================================================
   GOD-LEVEL UI ENGINE — Reach Forever Premium
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. HERO FLOATING STAT CARDS ── */
    const heroVisuals = document.querySelector('.hero-visuals');
    if (heroVisuals) {
        const cards = [
            { num: '320+', lbl: 'Clients Served', icon: 'ri-group-fill', delay: '0s', top: '5%', left: '-18%' },
            { num: '4.8x', lbl: 'Avg ROAS', icon: 'ri-line-chart-fill', delay: '1.5s', bottom: '15%', left: '-20%' },
            { num: '₹2Cr+', lbl: 'Revenue Generated', icon: 'ri-funds-fill', delay: '0.8s', top: '8%', right: '-2%' },
        ];
        cards.forEach(c => {
            const el = document.createElement('div');
            el.className = 'hero-stat-card reveal-on-scroll';
            const pos = [];
            if (c.top)    pos.push(`top:${c.top}`);
            if (c.bottom) pos.push(`bottom:${c.bottom}`);
            if (c.left)   pos.push(`left:${c.left}`);
            if (c.right)  pos.push(`right:${c.right}`);
            el.style.cssText = pos.join(';') + `;animation-delay:${c.delay};`;
            el.innerHTML = `
                <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#C8A96E,#A67C00);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#FFF;flex-shrink:0;box-shadow:0 6px 16px rgba(200,169,110,0.3)">
                        <i class="${c.icon}"></i>
                    </div>
                    <div>
                        <div class="stat-num">${c.num}</div>
                        <div class="stat-lbl">${c.lbl}</div>
                    </div>
                </div>`;
            heroVisuals.appendChild(el);
        });
    }

    /* ── 2. STATS TICKER (after hero, before section 2) ── */
    const section2 = document.querySelector('.section-pad:nth-of-type(2)');
    if (section2) {
        const ticker = document.createElement('div');
        ticker.style.cssText = 'padding:0 5%;margin-bottom:-20px;position:relative;z-index:10;';
        ticker.innerHTML = `
        <div class="stats-ticker reveal-on-scroll">
            <div class="stat-item">
                <span class="num" data-target="320">0</span><span class="num">+</span>
                <span class="lbl">Happy Clients</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="num" data-target="48">0</span><span class="num">x</span>
                <span class="lbl">Avg ROAS</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="num" data-target="14">0</span><span class="num"> Day Launch</span>
                <span class="lbl">Guaranteed</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="num" data-target="98">0</span><span class="num">%</span>
                <span class="lbl">Client Retention</span>
            </div>
        </div>`;
        section2.parentElement.insertBefore(ticker, section2);
    }

    /* ── 3. TRUST LOGOS (inside hero section, below CTA) ── */
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        const trust = document.createElement('div');
        trust.className = 'trust-strip reveal-on-scroll delay-3';
        trust.style.cssText = 'padding:24px 0 0;max-width:100%;margin:0;justify-content:flex-start;';
        trust.innerHTML = `
            <span class="trust-lbl">Trusted by</span>
            <div class="trust-logo"><i class="ri-google-fill" style="color:#DB4437"></i>Google Partner</div>
            <div class="trust-logo"><i class="ri-facebook-circle-fill" style="color:#1877F2"></i>Meta Business</div>
            <div class="trust-logo"><i class="ri-shield-check-fill" style="color:#C8A96E"></i>100% Results</div>`;
        heroActions.insertAdjacentElement('afterend', trust);
    }

    /* ── 4. PROCESS SECTION (between arsenal and growth engine) ── */
    const arsenalSection = document.getElementById('arsenal') || document.querySelector('.arsenal-section');
    const growthSection  = document.querySelector('.growth-engine-section');
    if (arsenalSection && growthSection && arsenalSection.parentElement) {
        const proc = document.createElement('section');
        proc.className = 'process-section-new';
        proc.innerHTML = `
        <div style="max-width:1200px;margin:0 auto;text-align:center;position:relative;z-index:2;">
            <span style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:rgba(247,244,239,0.9);backdrop-filter:blur(20px);border:1px solid rgba(200,169,110,0.3);border-radius:100px;font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#A67C00;margin-bottom:20px">
                <i class="ri-route-fill"></i> The Reach Process
            </span>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,4.5vw,4.5rem);font-weight:700;color:#1A1208;line-height:1.1;margin-bottom:16px">
                From Zero to <span style="color:#C8A96E;font-style:italic">Fully Booked.</span>
            </h2>
            <p style="font-family:'Outfit',sans-serif;font-size:1.1rem;color:#6B5E4A;max-width:580px;margin:0 auto 20px">Our 4-step system is engineered to get you results in 30 days or less.</p>
        </div>
        <div class="process-steps">
            <div class="proc-step reveal-on-scroll delay-1">
                <div class="proc-num">01</div>
                <h3>Deep Audit</h3>
                <p>We analyze your market, competitors, and existing presence to identify untapped revenue opportunities.</p>
            </div>
            <div class="proc-step reveal-on-scroll delay-2">
                <div class="proc-num">02</div>
                <h3>Strategy Build</h3>
                <p>A custom growth blueprint is crafted — channels, creatives, funnels — all mapped to your specific goals.</p>
            </div>
            <div class="proc-step reveal-on-scroll delay-3">
                <div class="proc-num">03</div>
                <h3>Launch & Scale</h3>
                <p>We go live within 14 days and continuously optimize campaigns for maximum cost-per-acquisition efficiency.</p>
            </div>
            <div class="proc-step reveal-on-scroll" style="transition-delay:.4s">
                <div class="proc-num">04</div>
                <h3>Report & Grow</h3>
                <p>Transparent weekly reports with real numbers. You see exactly where every rupee goes and what it returns.</p>
            </div>
        </div>`;
        arsenalSection.parentElement.insertBefore(proc, growthSection);
    }

    /* ── 5. TESTIMONIAL MARQUEE (before rush section) ── */
    const rushSection = document.querySelector('.rush-section');
    if (rushSection) {
        const testimonials = [
            { text: 'Reach Forever got us 180 new enquiries in our first month. We had to hire more staff.', name: 'Rajesh Sharma', biz: 'Dental Clinic, Jalandhar', init: 'RS' },
            { text: 'Our Google page went from invisible to #1 in 6 weeks. Foot traffic tripled.', name: 'Priya Anand', biz: 'Boutique, Amritsar', init: 'PA' },
            { text: 'Best investment we ever made. ₹50k ad spend brought back ₹4L in revenue the first month.', name: 'Mandeep Singh', biz: 'Real Estate, Phagwara', init: 'MS' },
            { text: 'The team is incredibly professional. Our Instagram went from 800 to 12k followers in 3 months.', name: 'Gurpreet Kaur', biz: 'Salon, Ludhiana', init: 'GK' },
            { text: 'Our website now books 40+ appointments per week on autopilot. Insane ROI.', name: 'Dr. Arun Mehta', biz: 'Physiotherapy Centre', init: 'AM' },
            { text: 'Facebook Ads were completely dead for us before. Now they\'re our #1 revenue source.', name: 'Vikram Patel', biz: 'Coaching Institute', init: 'VP' },
        ];

        // Duplicate for infinite loop
        const allTestis = [...testimonials, ...testimonials];

        const strip = document.createElement('section');
        strip.className = 'testimonial-strip';
        strip.innerHTML = `
        <div style="text-align:center;margin-bottom:48px">
            <span style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:rgba(247,244,239,0.9);backdrop-filter:blur(20px);border:1px solid rgba(200,169,110,0.3);border-radius:100px;font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#A67C00;margin-bottom:20px">
                <i class="ri-star-fill"></i> Client Love
            </span>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4vw,3.8rem);font-weight:700;color:#1A1208;line-height:1.1">
                What our clients <span style="color:#C8A96E;font-style:italic">say.</span>
            </h2>
        </div>
        <div style="overflow:hidden;mask:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)">
            <div class="testimonial-marquee" id="testiMarquee">
                ${allTestis.map(t => `
                <div class="testi-card">
                    <div class="testi-stars">${'<i class="ri-star-fill"></i>'.repeat(5)}</div>
                    <p class="testi-text">${t.text}</p>
                    <div class="testi-author">
                        <div class="testi-avatar">${t.init}</div>
                        <div>
                            <div class="testi-name">${t.name}</div>
                            <div class="testi-biz">${t.biz}</div>
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>`;
        rushSection.parentElement.insertBefore(strip, rushSection);
    }

    /* ── 6. COUNTER ANIMATION ── */
    function animateCounters() {
        document.querySelectorAll('[data-target]').forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const step = 16;
            const steps = duration / step;
            const inc = target / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += inc;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
            }, step);
        });
    }

    /* ── 7. SCROLL REVEAL OBSERVER ── */
    const ro = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                if (e.target.closest('.stats-ticker')) animateCounters();
                ro.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => ro.observe(el));

    /* ── 8. CARD TILT + GLARE ON MOUSE MOVE ── */
    document.querySelectorAll('.god-card-v2[data-tilt]').forEach(card => {
        const glare = card.querySelector('.card-glare');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width  - 0.5;
            const cy = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${cx * 12}deg) rotateX(${-cy * 12}deg) translateY(-8px)`;
            if (glare) {
                const angle = Math.atan2(cy, cx) * (180 / Math.PI);
                glare.style.transform = `translateX(${cx * 200}%)`;
                glare.style.opacity = '1';
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
            if (glare) { glare.style.transform = 'translateX(-100%)'; glare.style.opacity = '0.5'; }
        });
    });

    /* ── 9. MAGNETIC BUTTONS ── */
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        const inner = wrap.querySelector('.magnetic-inner');
        if (!inner) return;
        wrap.addEventListener('mousemove', e => {
            const rect = wrap.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width/2) * 0.35;
            const dy = (e.clientY - rect.top  - rect.height/2) * 0.35;
            inner.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        wrap.addEventListener('mouseleave', () => {
            inner.style.transform = 'translate(0, 0)';
        });
    });

    /* ── 10. SMOOTH MAGNETIC CURSOR ── */
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring && window.innerWidth > 768) {
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function lerp() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
            requestAnimationFrame(lerp);
        })();
        document.querySelectorAll('a, button, .btn, .god-card-v2, .s2-social-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                dot.style.width = '12px'; dot.style.height = '12px';
                ring.style.width = '56px'; ring.style.height = '56px';
                ring.style.borderColor = 'rgba(200,169,110,0.8)';
            });
            el.addEventListener('mouseleave', () => {
                dot.style.width = '6px'; dot.style.height = '6px';
                ring.style.width = '36px'; ring.style.height = '36px';
                ring.style.borderColor = 'rgba(200,169,110,0.5)';
            });
        });
    }

    /* ── 11. SCROLL PROGRESS BAR ── */
    const prog = document.getElementById('scrollProgress');
    if (prog) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            prog.style.width = (scrolled / total * 100) + '%';
        }, { passive: true });
    }

    /* ── 12. HERO IPHONE 3D PARALLAX ── */
    const phone = document.getElementById('heroIphoneScroll');
    if (phone && window.innerWidth > 768) {
        document.addEventListener('mousemove', e => {
            const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
            const cy = (e.clientY / window.innerHeight - 0.5) * 2;
            phone.style.transform = `perspective(1000px) rotateY(${-15 + cx * 8}deg) rotateX(${5 + cy * -5}deg)`;
        });
    }

    /* ── 13. SECTION BACKGROUND COLOR TRANSITIONS ON SCROLL ── */
    const mainWrapper = document.querySelector('.main-wrapper') || document.querySelector('main');
    let lastScrollY = 0;
    window.addEventListener('scroll', () => { lastScrollY = window.scrollY; }, { passive: true });

});
