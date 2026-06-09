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

    // Advanced Heuristic NLP Engine (0-Lag Local Simulation)
    const CORE_BRAIN = [
        { keywords: ['price', 'pricing', 'cost', 'fee', 'charge', 'money', 'much'], r: "We build custom revenue systems, not cookie-cutter packages. Pricing strictly depends on your business goals, but our minimum engagement starts at ₹25,000/mo. Want a custom quote?" },
        { keywords: ['seo', 'google', 'rank', 'ranking', 'search'], r: "We are Punjab's #1 Local SEO experts. We dominate Google My Business (GMB) map packs and organic search. We guarantee front-page visibility for your primary keywords." },
        { keywords: ['ads', 'meta', 'facebook', 'instagram', 'lead', 'leads'], r: "Our Meta & Google Ads campaigns average a 4.8x ROAS. We build hyper-targeted funnels that capture high-intent customers in your exact area." },
        { keywords: ['time', 'how long', 'timeline', 'days', 'weeks'], r: "Our standard turnaround is lightning fast. We launch automated websites in 14 days, and you'll see your first targeted leads within 48 hours of ad launch." },
        { keywords: ['guarantee', 'promise', 'refund', 'sure'], r: "We don't deal in promises. We deal in mathematical proof. If we don't hit the agreed KPIs, we work for free until we do. Simple as that." },
        { keywords: ['website', 'design', 'development', 'web', 'site'], r: "We build lightning-fast, conversion-optimized landing pages designed strictly to turn cold traffic into booked appointments." },
        { keywords: ['contact', 'call', 'book', 'talk', 'speak', 'number'], r: "You can reach us immediately at +91 8146652870 or simply click 'Book Consultancy' at the top of the page to schedule a free strategy call!" },
        { keywords: ['hello', 'hi', 'hey', 'greetings', 'morning'], r: "Hello! How can I help you dominate your local market today?" },
        { keywords: ['result', 'results', 'proof', 'case study', 'portfolio'], r: "Numbers don't lie. We've generated massive ROI for local businesses across Punjab. Head over to our 'Reviews' page to see the raw proof." }
    ];

    function getHeuristicResponse(userInput) {
        const words = userInput.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
        let bestMatch = null;
        let highestScore = 0;

        CORE_BRAIN.forEach(intent => {
            let score = 0;
            intent.keywords.forEach(kw => {
                if(words.includes(kw) || userInput.toLowerCase().includes(kw)) score++;
            });
            if (score > highestScore) {
                highestScore = score;
                bestMatch = intent.r;
            }
        });

        return bestMatch || "I see. Every business is unique. The absolute fastest way to get a precise answer is to book a free consultancy call with our growth engineers. Click the button at the top!";
    }

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
            addMsg("Hello there! Welcome to Reach Forever. I'm Reach Assistant. How can I help your business grow today?", true);
            const suggWrap = document.createElement('div');
            suggWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;';
            ['Pricing?', 'Results?', 'SEO?'].forEach(label => {
                const btn = document.createElement('button');
                btn.textContent = label;
                btn.style.cssText = 'padding:6px 12px;background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.3);border-radius:100px;font-family:Outfit,sans-serif;font-size:.75rem;font-weight:600;color:#C8A96E;cursor:pointer;';
                btn.onclick = () => { input.value = label; handleSend(); };
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
        const txt = input.value.trim(); 
        input.value = ''; 
        busy = true;
        addMsg(txt, false);

        // Simulated Neural Latency (mimics LLM thinking)
        const typingId = 'typing-' + Date.now();
        setTimeout(() => {
            const m = document.createElement('div');
            m.id = typingId;
            m.style.cssText = "padding:12px 16px;border-radius:16px;font-size:0.9rem;align-self:flex-start;background:rgba(255,255,255,.05);color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.1);border-bottom-left-radius:4px;margin-bottom:10px;";
            m.innerHTML = 'Thinking... <span style="animation:blink 1s infinite">|</span>';
            body.appendChild(m);
            body.scrollTop = body.scrollHeight;

            const answer = getHeuristicResponse(txt);
            // Dynamic delay based on response length
            const delay = Math.min(Math.max(answer.length * 15, 800), 2500);

            setTimeout(() => {
                const el = document.getElementById(typingId);
                if(el) el.remove();
                addMsg(answer, true);
                busy = false;
            }, delay);
        }, 300);
    }

    send.addEventListener('click', handleSend);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

})();
