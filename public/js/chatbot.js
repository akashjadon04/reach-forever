// public/js/chatbot.js
// ZYROVA UNIVERSAL CHATBOT — v2.1
(function initChatbot() {
    // Remove existing chatbot elements injected by HTML files
    const existFabs = document.querySelectorAll('.aifab, #auraFab, .ai-fab-wrap, .chat-panel, #auraPanel');
    existFabs.forEach(el => el.remove());

    const html = `
    <div class="rf-aifab-wrap" style="position:fixed;bottom:20px;right:20px;z-index:9999940;">
        <div class="rf-aifab" id="rfAuraFab" role="button" aria-label="Open AI Chat Assistant" tabindex="0">
            <i class="ri-customer-service-2-fill" aria-hidden="true"></i>
            <div id="rfBotBadge" aria-hidden="true"></div>
        </div>
    </div>
    <div class="rf-chat-panel" id="rfAuraPanel" aria-hidden="true" inert>
        <div class="rf-cp-header">
            <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:34px;height:34px;border-radius:50%;background:rgba(200,169,110,.12);border:1px solid #C8A96E;display:flex;align-items:center;justify-content:center;color:#C8A96E;font-size:1.1rem;"><i class="ri-user-smile-line"></i></div>
                <div>
                    <h4 style="font-family:'Outfit',sans-serif;font-size:.95rem;color:#FFF;margin:0;font-weight:700;">Reach Assistant</h4>
                    <span style="font-size:.7rem;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:5px;"><div style="width:6px;height:6px;background:#10B981;border-radius:50%;"></div> Online Now</span>
                </div>
            </div>
            <button id="rfAuraClose" aria-label="Close chat" style="background:none;border:none;color:rgba(255,255,255,.5);font-size:1.3rem;cursor:pointer;padding:4px;"><i class="ri-close-line" aria-hidden="true"></i></button>
        </div>
        <div id="rfAuraBody" style="padding:16px;height:260px;overflow-y:auto;display:flex;flex-direction:column;"></div>
        <div style="padding:12px 16px;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:8px;">
            <input type="text" placeholder="Type a message..." id="rfAuraInput" aria-label="Chat message">
            <button id="rfAuraSend" aria-label="Send message"><i class="ri-send-plane-fill" aria-hidden="true"></i></button>
        </div>
    </div>
    <style>
      /* ─── Chatbot FAB ─── */
      .rf-aifab-wrap { position:fixed; bottom:20px; right:20px; z-index:9999940; }
      .rf-aifab {
        width:52px; height:52px; border-radius:50%;
        background:#0A0B0E; border:1px solid rgba(200,169,110,.3);
        display:flex; align-items:center; justify-content:center;
        cursor:pointer; position:relative;
        box-shadow:0 8px 30px rgba(0,0,0,.25);
        transition:transform .3s ease, box-shadow .3s ease;
      }
      .rf-aifab:hover { transform:scale(1.08); box-shadow:0 12px 40px rgba(200,169,110,.2); }
      .rf-aifab i { font-size:1.6rem; color:#C8A96E; }
      #rfBotBadge {
        position:absolute; top:3px; right:3px; width:10px; height:10px;
        background:#EF4444; border-radius:50%; border:2px solid #0A0B0E;
        animation:rfBlink 1.5s infinite;
      }
      @keyframes rfBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

      /* ─── Chat Panel ─── */
      .rf-chat-panel {
        position:fixed; bottom:144px; right:20px;
        width:320px; height:auto; max-height: 400px;
        background:rgba(10,11,14,.96); backdrop-filter:blur(28px);
        border-radius:18px; border:1px solid rgba(200,169,110,.25);
        box-shadow:0 20px 60px rgba(0,0,0,.4);
        z-index:9999950; display:flex; flex-direction:column;
        opacity:0; transform:translateY(16px) scale(.96);
        pointer-events:none;
        transition:.35s cubic-bezier(0.16,1,0.3,1);
      }
      .rf-chat-panel.rf-open {
        opacity:1; transform:translateY(0) scale(1); pointer-events:auto;
      }
      .rf-cp-header {
        padding:14px 18px; display:flex; justify-content:space-between; align-items:center;
        border-bottom:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.02);
        border-radius:18px 18px 0 0;
      }
      #rfAuraBody::-webkit-scrollbar { width:3px; }
      #rfAuraBody::-webkit-scrollbar-thumb { background:rgba(200,169,110,.4); border-radius:10px; }
      #rfAuraInput {
        flex:1; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
        border-radius:100px; padding:9px 14px; color:#FFF;
        font-family:'Outfit',sans-serif; font-size:.85rem; outline:none;
        transition:.3s;
      }
      #rfAuraInput:focus { border-color:#C8A96E; }
      #rfAuraSend {
        width:36px; height:36px; border-radius:50%;
        background:linear-gradient(135deg,#C8A96E,#A67C00);
        border:none; color:#FFF; display:flex; align-items:center;
        justify-content:center; cursor:pointer; font-size:1rem; flex-shrink:0;
      }
      @keyframes rfSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
      .rf-msg {
        animation:rfSlideUp .35s ease forwards;
        padding:10px 14px; border-radius:14px; font-size:.85rem;
        line-height:1.45; max-width:85%; margin-bottom:8px; font-family:'Outfit',sans-serif;
      }
      .rf-msg.rf-ai  { align-self:flex-start; background:rgba(255,255,255,.07); color:#FFF; border:1px solid rgba(255,255,255,.1); border-bottom-left-radius:4px; }
      .rf-msg.rf-usr { align-self:flex-end; background:linear-gradient(135deg,#C8A96E,#A67C00); color:#000; font-weight:600; border-bottom-right-radius:4px; }

      /* ─── Responsive ─── */
      @media(max-width:1366px) {
        .rf-aifab { width:48px; height:48px; }
        .rf-aifab i { font-size:1.4rem; }
        .rf-chat-panel { width:300px; max-height:400px; }
        #rfAuraBody { height:240px; }
      }
      @media(max-width:768px) {
        .rf-aifab-wrap { bottom:90px; right:16px; }
        .rf-aifab { width:46px; height:46px; }
        .rf-chat-panel { width:calc(100vw - 32px); right:16px; bottom:150px; max-height:55vh; }
        #rfAuraBody { height:calc(55vh - 140px); }
      }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    const fab   = document.getElementById('rfAuraFab');
    const panel = document.getElementById('rfAuraPanel');
    const close = document.getElementById('rfAuraClose');
    const body  = document.getElementById('rfAuraBody');
    const input = document.getElementById('rfAuraInput');
    const send  = document.getElementById('rfAuraSend');
    const badge = document.getElementById('rfBotBadge');
    let busy = false;
    let panelOpen = false;

    // ── NLP Knowledge Base ──
    const BRAIN = [
        { kw: ['price','pricing','cost','fee','charge','money','much','rate'],   r: "We build custom revenue systems, not cookie-cutter packages. Pricing depends on your business goals — minimum engagement starts at ₹25,000/mo. Want a custom quote?" },
        { kw: ['seo','google','rank','ranking','search','gmb'],                  r: "We are Punjab's #1 Local SEO experts. We dominate Google My Business map packs and guarantee front-page visibility for your primary keywords." },
        { kw: ['ads','meta','facebook','instagram','lead','leads','campaign'],   r: "Our Meta & Google Ads campaigns deliver an average 10× ROI. We build hyper-targeted funnels that capture high-intent customers in your exact area." },
        { kw: ['time','how long','timeline','days','weeks','fast','quick'],      r: "We launch automated websites in 14 days, and you'll see your first targeted leads within 48 hours of ad launch." },
        { kw: ['guarantee','promise','refund','sure','risk'],                    r: "We don't deal in promises. We deal in mathematical proof. If we don't hit the agreed KPIs, we work for free until we do. Simple as that." },
        { kw: ['website','design','development','web','site','landing'],        r: "We build lightning-fast, conversion-optimized landing pages designed strictly to turn cold traffic into booked appointments." },
        { kw: ['contact','call','book','talk','speak','number','reach'],         r: "You can reach us at +91 8146652870 or click 'Book Consultancy' at the top to schedule a free strategy call!" },
        { kw: ['hello','hi','hey','greetings','morning','evening'],             r: "Hello! How can I help you dominate your local market today? 🚀" },
        { kw: ['result','results','proof','case','portfolio','roi','roas'],      r: "Numbers don't lie. We average 10× ROI for local businesses across Punjab. Head to our 'Reviews' page to see the raw proof." },
    ];

    function getResponse(txt) {
        const lower = txt.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        let best = null, top = 0;
        BRAIN.forEach(i => {
            let sc = 0;
            i.kw.forEach(k => { if (lower.includes(k)) sc++; });
            if (sc > top) { top = sc; best = i.r; }
        });
        return best || "I see. The fastest way to get a precise answer is to book a free consultancy call with our growth engineers. Click the button at the top!";
    }

    function addMsg(txt, isAi) {
        const m = document.createElement('div');
        m.className = `rf-msg ${isAi ? 'rf-ai' : 'rf-usr'}`;
        m.innerHTML = txt;
        body.appendChild(m);
        body.scrollTop = body.scrollHeight;
    }

    function openPanel() {
        panelOpen = true;
        panel.classList.add('rf-open');
        panel.setAttribute('aria-hidden', 'false');
        panel.removeAttribute('inert');
        if (badge) badge.style.display = 'none';
        if (body.children.length === 0) {
            addMsg("Hello! Welcome to Reach Forever. I'm Reach Assistant — how can I help your business grow today?", true);
            const wrap = document.createElement('div');
            wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;';
            ['Pricing?', 'Results?', 'SEO?'].forEach(lbl => {
                const btn = document.createElement('button');
                btn.textContent = lbl;
                btn.style.cssText = 'padding:5px 11px;background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.3);border-radius:100px;font-family:Outfit,sans-serif;font-size:.75rem;font-weight:600;color:#C8A96E;cursor:pointer;';
                btn.onclick = () => { input.value = lbl; handleSend(); };
                wrap.appendChild(btn);
            });
            body.appendChild(wrap);
        }
    }

    function closePanel() {
        panelOpen = false;
        panel.classList.remove('rf-open');
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('inert', '');
    }

    fab.addEventListener('click', (e) => { 
        e.stopPropagation();
        panelOpen ? closePanel() : openPanel(); 
    });

    close.addEventListener('click', closePanel);

    function handleSend() {
        if (busy || !input.value.trim()) return;
        const txt = input.value.trim();
        input.value = '';
        busy = true;
        addMsg(txt, false);

        const typId = 'tp-' + Date.now();
        setTimeout(() => {
            const t = document.createElement('div');
            t.id = typId;
            t.className = 'rf-msg rf-ai';
            t.innerHTML = 'Thinking... <span style="animation:rfBlink 1s infinite">|</span>';
            body.appendChild(t);
            body.scrollTop = body.scrollHeight;

            const ans = getResponse(txt);
            const delay = Math.min(Math.max(ans.length * 12, 700), 2000);
            setTimeout(() => {
                const el = document.getElementById(typId);
                if (el) el.remove();
                addMsg(ans, true);
                busy = false;
            }, delay);
        }, 250);
    }

    send.addEventListener('click', handleSend);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

})();
