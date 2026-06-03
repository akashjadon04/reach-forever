
/* ================================================================
   MUTE LOCK — hero video always muted on page load
   ================================================================ */
(function(){
    function lockMute(){
        const v = document.getElementById('heroVideoAd');
        if(v && !v.hasAttribute('data-mute-locked')){
            v.muted = true; v.setAttribute('muted',''); v.setAttribute('data-mute-locked','true');
        }
    }
    lockMute();
    window.addEventListener('DOMContentLoaded', lockMute);
    window.addEventListener('pageshow', lockMute);
})();

/* ================================================================
   FEATURE 1: DYNAMIC ISLAND
   ================================================================ */
let diTimer = null;

window.openReelsModal = function() {
    const rm = document.getElementById('reelsModal');
    if(rm){
        document.body.style.overflow='hidden';
        rm.style.opacity='1'; rm.style.pointerEvents='auto';
        const hv = document.getElementById('heroVideoAd'); if(hv) hv.pause();
        const fv = document.querySelector('#rmModalContainer .rm-video');
        if(fv){ fv.muted=false; fv.play().catch(()=>{}); }
        if(window.triggerHaptic) window.triggerHaptic(60);
    }
};


window.openReelsModal = function() {
    const rm = document.getElementById('reelsModal');
    if(rm){
        document.body.style.overflow='hidden';
        rm.style.opacity='1'; rm.style.pointerEvents='auto';
        const hv = document.getElementById('heroVideoAd'); if(hv) hv.pause();
        const fv = document.querySelector('#rmModalContainer .rm-video');
        if(fv){ fv.muted=false; fv.play().catch(()=>{}); }
        if(window.triggerHaptic) window.triggerHaptic(60);
    }
};

/* Always light beige — theme toggle completely removed */

/* ================================================================
   PRELOADER
   ================================================================ */
document.addEventListener('DOMContentLoaded',()=>{
    const pl=document.getElementById('preloader');
    if(pl){
        setTimeout(()=>{ pl.style.opacity='0'; pl.style.transition='opacity .5s'; setTimeout(()=>pl.style.display='none',500); },900);
    }
});

/* ================================================================
   LOCAL ASSET ENGINE — No backend. Pure local files.
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Auto-populate Reels Modal from local video files
    const modal = document.getElementById('rmModalContainer');
    const localVideos = [
        'assets/video_1.mp4', 'assets/video_2.mp4', 'assets/video_3.mp4',
        'assets/video_4.mp4', 'assets/video_5.mp4', 'assets/video_6.mp4',
        'assets/video_7.mp4', 'assets/video_8.mp4', 'assets/video_9.mp4',
        'assets/video_10.mp4', 'assets/video_11.mp4', 'assets/video_12.mp4',
        'assets/video_13.mp4'
    ];

    if (modal) {
        modal.innerHTML = '';
        localVideos.forEach((vidSrc, i) => {
            modal.insertAdjacentHTML('beforeend', `
            <div class="rm-slide" style="width:100%;height:100vh;scroll-snap-align:start;position:relative;background:#111">
                <video class="rm-video" loop playsinline style="width:100%;height:100%;object-fit:cover" src="${vidSrc}"></video>
                <div style="position:absolute;bottom:100px;right:15px;display:flex;flex-direction:column;gap:20px;z-index:10;color:#fff;font-size:2rem;text-align:center">
                    <div style="display:flex;flex-direction:column;align-items:center;gap:4px"><i class="ri-heart-fill" style="color:#FF3B30"></i><span style="font-size:.8rem;font-weight:600">${Math.floor(Math.random()*20+5)}k</span></div>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:4px"><i class="ri-chat-3-fill"></i><span style="font-size:.8rem;font-weight:600">${Math.floor(Math.random()*500+100)}</span></div>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:4px"><i class="ri-share-forward-fill"></i><span style="font-size:.8rem;font-weight:600">Share</span></div>
                </div>
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.4) 30%,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:40px 80px 40px 20px;pointer-events:none">
                    <div style="font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:#fff;font-weight:700">Client Story ${i+1}</div>
                    <div style="font-family:'Outfit',sans-serif;font-size:1rem;color:rgba(255,255,255,.85);line-height:1.5;margin-top:8px">Real results from real clients across Punjab.</div>
                </div>
            </div>`);
        });

        // TikTok-style scroll auto-play observer
        if ('IntersectionObserver' in window) {
            const vobs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    const rm = document.getElementById('reelsModal');
                    const isOpen = rm && rm.style.opacity === '1';
                    if (e.isIntersecting && isOpen) { e.target.muted = false; e.target.play().catch(() => {}); }
                    else { e.target.pause(); e.target.currentTime = 0; }
                }, { threshold: 0.6 });
            });
            document.querySelectorAll('#rmModalContainer .rm-video').forEach(v => vobs.observe(v));
        }
    }

    // 2. Load the initial platform (Instagram) into the hologram
    if (window.switchCylinder) window.switchCylinder('ig');

    // 3. Add onerror graceful fallback to all imgs that might be missing
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('onerror')) {
            img.onerror = function() {
                this.style.opacity = '0.3';
                this.style.filter = 'grayscale(1)';
            };
        }
    });
});

/* ================================================================
   FPS MONITOR + AUTO-DEGRADATION
   ================================================================ */
(function(){
    let frames=0,last=performance.now();
    function monitor(){
        const now=performance.now(); frames++;
        if(now-last>=1000){
            if(frames<20) document.body.classList.add('low-fps-mode');
            else document.body.classList.remove('low-fps-mode');
            frames=0; last=now;
        }
        requestAnimationFrame(monitor);
    }
    requestAnimationFrame(monitor);
})();
