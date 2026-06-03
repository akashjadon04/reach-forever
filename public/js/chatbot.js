// public/js/chatbot.js
// ZYROVA UNIVERSAL CHATBOT
(function initChatbot() {
    // Inject HTML
    const html = `
    <div class="ai-fab-wrap magnetic-wrap" style="position:fixed;bottom:80px;right:20px;z-index:9999940;">
        <div class="magnetic-inner ai-fab" id="auraFab" role="button" aria-label="Open AI Chat Assistant" tabindex="0" style="width:58px;height:58px;border-radius:50%;background:#0A0B0E;border:1px solid rgba(200,169,110,.22);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 40px rgba(26,18,8,.2);">
            <i class="ri-customer-service-2-fill" aria-hidden="true" style="font-size:1.9rem;color:#C8A96E;"></i>
            <div id="botBadge" aria-hidden="true" style="position:absolute;top:4px;right:4px;width:11px;height:11px;background:#EF4444;border-radius:50%;border:2px solid #0A0B0E;animation:blink 1.5s infinite;"></div>
        </div>
    </div>
    <div class="chat-panel" id="auraPanel" aria-hidden="true" inert style="position:fixed;bottom:150px;right:20px;width:350px;background:rgba(10,11,14,.95);backdrop-filter:blur(30px);border-radius:20px;border:1px solid rgba(200,169,110,.3);box-shadow:0 20px 60px rgba(0,0,0,.4);z-index:9999950;display:flex;flex-direction:column;opacity:0;transform:translateY(20px) scale(0.95);pointer-events:none;transition:0.4s cubic-bezier(0.16,1,0.3,1);">
        <div class="cp-header" style="padding:15px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);">
            <div class="cp-info" style="display:flex;gap:12px;align-items:center;">
                <div class="cp-avatar" style="width:36px;height:36px;border-radius:50%;background:rgba(200,169,110,.1);border:1px solid #C8A96E;display:flex;align-items:center;justify-content:center;color:#C8A96E;"><i class="ri-user-smile-line"></i></div>
                <div class="cp-text">
                    <h4 style="font-family:'Outfit',sans-serif;font-size:1rem;color:#FFF;margin:0;">Reach Assistant</h4>
                    <span style="font-size:0.75rem;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:6px;"><div style="width:6px;height:6px;background:#10B981;border-radius:50%;"></div> Online Now</span>
                </div>
            </div>
            <button id="auraClose" aria-label="Close chat" style="background:none;border:none;color:rgba(255,255,255,.5);font-size:1.4rem;cursor:pointer;"><i class="ri-close-line" aria-hidden="true"></i></button>
        </div>
        <div class="cp-body" id="auraBody" style="padding:20px;height:300px;overflow-y:auto;display:flex;flex-direction:column;"></div>
        <div class="cp-input" style="padding:15px 20px;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:10px;">
            <input type="text" placeholder="Type your message..." id="auraInput" aria-label="Chat message" style="flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:100px;padding:10px 16px;color:#FFF;font-family:'Outfit',sans-serif;font-size:0.9rem;outline:none;">
            <button id="auraSend" aria-label="Send message" style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#C8A96E,#A67C00);border:none;color:#FFF;display:flex;align-items:center;justify-content:center;cursor:pointer;"><i class="ri-send-plane-fill" aria-hidden="true"></i></button>
        </div>
    </div>
    </div>
    <style>
      @keyframes blink { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }
      @media(max-width:768px){#cdot,#cring{display:none !important}}
    </style>
    `;
    
    // Remove existing chatbots if they exist
    const existFabs = document.querySelectorAll('.aifab, #auraFab, .ai-fab-wrap, .chat-panel');
    existFabs.forEach(el => el.remove());
    
    document.body.insertAdjacentHTML('beforeend', html);

    const fab = document.getElementById('auraFab');
    const panel = document.getElementById('auraPanel');
    const closeBtn = document.getElementById('auraClose');
    const body = document.getElementById('auraBody');
    const input = document.getElementById('auraInput');
    const send = document.getElementById('auraSend');
    const badge = document.getElementById('botBadge');

    const KB = [
        { re:/^(hi|hello|hey)[!?]*$/i,            r:"Hey! I'm the Reach Forever AI. We scale local businesses aggressively. What's your monthly revenue goal?" },
        { re:/(price|pricing|cost|how much)/i,     r:"We build high-ROI revenue machines, not cheap templates. Pricing is custom — book a Strategy Call and let's talk numbers." },
        { re:/(how long|time|launch|14 days)/i,    r:"14 Days. That's our rapid-launch guarantee. Funnel built, ads live, leads flowing in exactly two weeks." },
        { re:/(proof|results|case|review)/i,       r:"Numbers don't lie. We've generated ₹85L+ for our clients. You're literally on the proof page right now 😄" },
        { re:/(akash|web|website|app|code)/i,      r:"Akash Jadon is our Lead Engineer — custom React/Node builds only. Your site will be the fastest in your city." },
        { re:/(ansh|marketing|ads|seo|instagram)/i,r:"Ansh Khatri architects our viral campaigns. He's flooded hundreds of businesses with paying customers." },
        { re:/(guarantee|risk|refund)/i,           r:"We guarantee a positive ROI. If you don't make more than you spend with us, we aren't doing our job." },
        { re:/.*/,                                 r:"Stop guessing. Click 'Start a Project' and our team builds your custom revenue blueprint within 24 hours." }
    ];
    let busy = false;

    function addMsg(txt, isAi = false) {
        const m = document.createElement('div');
        m.style.cssText = `font-family:'Outfit',sans-serif;padding:12px 16px;border-radius:16px;font-size:0.9rem;line-height:1.4;max-width:85%;margin-bottom:10px;align-self:${isAi?'flex-start':'flex-end'};background:${isAi?'rgba(255,255,255,.05)':'linear-gradient(135deg,#C8A96E,#A67C00)'};color:#FFF;border:${isAi?'1px solid rgba(255,255,255,.1)':'none'};border-bottom-${isAi?'left':'right'}-radius:4px;`;
        m.innerHTML = txt;
        body.appendChild(m);
        body.scrollTop = body.scrollHeight;
    }

    fab.addEventListener('click', () => {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0) scale(1)';
        panel.style.pointerEvents = 'auto';
        panel.setAttribute('aria-hidden', 'false');
        panel.removeAttribute('inert');
        if (badge) badge.style.display = 'none';
        
        if (body.children.length === 0) {
            addMsg("Tired of wasting money on ads that don't work? I'm here to help.", true);
            const suggWrap = document.createElement('div');
            suggWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;';
            ['Pricing?', 'Results?'].forEach(label => {
                const btn = document.createElement('button');
                btn.textContent = label;
                btn.style.cssText = 'padding:6px 12px;background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.3);border-radius:100px;font-family:Outfit,sans-serif;font-size:.75rem;font-weight:600;color:#C8A96E;cursor:pointer;';
                btn.onclick = () => { input.value = (label === 'Pricing?' ? 'What is the price?' : 'Show me results.'); handleSend(); };
                suggWrap.appendChild(btn);
            });
            body.appendChild(suggWrap);
        }
    });

    closeBtn.addEventListener('click', () => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px) scale(0.95)';
        panel.style.pointerEvents = 'none';
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('inert', '');
    });

    function handleSend() {
        if (busy || !input.value.trim()) return;
        const msg = input.value.trim(); input.value = ''; busy = true;
        addMsg(msg, false);
        let reply = KB[KB.length - 1].r;
        for (const k of KB) { if (k.re.test(msg)) { reply = k.r; break; } }
        
        const tid = 'typ' + Date.now();
        const typ = document.createElement('div');
        typ.id = tid;
        typ.style.cssText = 'display:flex;gap:4px;padding:12px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;border-bottom-left-radius:3px;align-self:flex-start;margin-bottom:10px;';
        for (let i = 0; i < 3; i++) {
            const d = document.createElement('div');
            d.style.cssText = `width:5px;height:5px;background:#C8A96E;border-radius:50%;animation:blink 1s ${i*.2}s infinite;`;
            typ.appendChild(d);
        }
        body.appendChild(typ);
        body.scrollTop = body.scrollHeight;
        
        setTimeout(() => {
            document.getElementById(tid)?.remove();
            addMsg(reply, true);
            busy = false;
        }, 850);
    }

    send.addEventListener('click', handleSend);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

})();
