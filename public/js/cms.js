// public/js/cms.js
// ZYROVA CMS - INFINITE SCALING ENGINE (IPHONE MASTER FEED)

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? "http://localhost:5000/api" 
    : "https://reach-forever.onrender.com/api";

async function syncZyrovaCMS() {
    let pageName = window.location.pathname.split("/").pop().replace(".html", "");
    if (!pageName || pageName === "index") pageName = "home";

    try {
        console.log("[CMS] 📡 Connecting to Database...");
        const response = await fetch(`${API_BASE_URL}/content/${pageName}`);
        const data = await response.json();
        const globalResponse = await fetch(`${API_BASE_URL}/content/global`);
        const globalData = await globalResponse.json();

        let allContent = [];
        if (data.success && data.data) allContent = [...allContent, ...data.data];
        if (globalData.success && globalData.data) allContent = [...allContent, ...globalData.data];

        if (allContent.length === 0) {
            console.log("[CMS] Database empty. Using hardcoded fallback.");
            document.querySelectorAll('[data-cms]').forEach(el => el.classList.add('cms-loaded'));
            if(window.zyrovaPreloader) window.zyrovaPreloader.isDataLoaded = true;
            return;
        }

        const dynamicReels = {};

        // 1. Process Database Payload
        allContent.forEach(dbItem => {
            if (!dbItem || !dbItem.elementId) return;

            if (dbItem.elementId.startsWith('dynreel_')) {
                const parts = dbItem.elementId.split('_');
                const reelId = parts[1];
                const prop = parts[2];
                
                if (!dynamicReels[reelId]) dynamicReels[reelId] = { id: reelId };
                dynamicReels[reelId][prop] = dbItem.contentValue;
            } else {
                // STATIC CONTENT REPLACEMENT
                if(dbItem.elementId !== 'home_iphone_reel' && dbItem.elementId !== 'hero_iphone_client' && dbItem.elementId !== 'hero_iphone_caption') {
                    const elements = document.querySelectorAll(`[data-cms="${dbItem.elementId}"]`);
                    elements.forEach(el => {
                        if (dbItem.contentType === 'text') el.innerHTML = dbItem.contentValue;
                        else if (dbItem.contentType === 'image') {
                            if (el.tagName === "DIV" || el.classList.contains('bk-left-bg-overlay')) {
                                el.style.backgroundImage = `url('${dbItem.contentValue}')`;
                            } else {
                                el.src = dbItem.contentValue;
                            }
                        } 
                        else if (dbItem.contentType === 'video') {
                            el.src = dbItem.contentValue;
                            el.load(); 
                        }
                    });
                }
            }
        });

        // 2. Inject Infinite Reels
        const modalContainer = document.getElementById('rmModalContainer');
        const reelKeys = Object.keys(dynamicReels);

        if (reelKeys.length > 0) {
            // Sort newest to oldest based on ID timestamp
            const sortedReels = Object.values(dynamicReels).sort((a, b) => b.id - a.id);

            // A. OVERRIDE IPHONE HERO WITH NEWEST REEL
            const newestReel = sortedReels[0];
            if (newestReel && newestReel.vid) {
                const heroVid = document.getElementById('heroVideoAd');
                const heroClient = document.querySelector('[data-cms="hero_iphone_client"]');
                const heroCaption = document.querySelector('[data-cms="hero_iphone_caption"]');
                
                if(heroVid) { 
                    heroVid.src = newestReel.vid; 
                    heroVid.load(); 
                    let playPromise = heroVid.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => console.log("iPhone Play Blocked by browser until interaction."));
                    }
                }
                if(heroClient) heroClient.innerHTML = newestReel.name || 'Client';
                if(heroCaption) heroCaption.innerHTML = newestReel.cap || '';
            }

            // B. INJECT ALL REELS INTO TIKTOK MODAL
            if (modalContainer) {
                modalContainer.innerHTML = ''; // Wipe empty shell
                
                // ANTI-LENIS SHIELD: Force scrollability inside the modal
                modalContainer.setAttribute('data-lenis-prevent', 'true');
                modalContainer.setAttribute('data-lenis-prevent-wheel', 'true');
                modalContainer.setAttribute('data-lenis-prevent-touch', 'true');
                modalContainer.style.overscrollBehaviorY = 'contain'; 

                sortedReels.forEach((reel, index) => {
                    if(!reel.vid) return; 

                    const avatar = reel.avatar || 'https://agency-resources.zyrova.com/reachforever/default-avatar.png';
                    const clientName = reel.name || 'Client';
                    const caption = reel.cap || '';

                    const modalHTML = `
                        <div class="rm-slide" id="modal-slide-${index}" style="width: 100%; height: 100vh; scroll-snap-align: start; position: relative; background: #111;">
                            <video class="rm-video" loop playsinline style="width: 100%; height: 100%; object-fit: cover;" src="${reel.vid}"></video>
                            
                            <div style="position: absolute; bottom: 100px; right: 15px; display: flex; flex-direction: column; gap: 25px; z-index: 10; color: #FFF; font-size: 2rem; text-align: center; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;"><i class="ri-heart-fill" style="color: #FF3B30;"></i><span style="font-size: 0.85rem; font-weight: 600;">${Math.floor(Math.random() * 20) + 5}k</span></div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;"><i class="ri-chat-3-fill"></i><span style="font-size: 0.85rem; font-weight: 600;">${Math.floor(Math.random() * 500) + 100}</span></div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;"><i class="ri-share-forward-fill"></i><span style="font-size: 0.85rem; font-weight: 600;">Share</span></div>
                            </div>

                            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 30%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 40px 80px 40px 20px; pointer-events: none;">
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                                    <img src="${avatar}" style="width: 55px; height: 55px; border-radius: 50%; border: 3px solid #D4AF37; object-fit: cover;">
                                    <div style="display: flex; flex-direction: column;">
                                        <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: #FFF; font-weight: 700;">${clientName}</div>
                                        <div style="font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #D4AF37; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Partner</div>
                                    </div>
                                </div>
                                <div style="font-family: 'Outfit', sans-serif; font-size: 1.05rem; color: rgba(255,255,255,0.95); line-height: 1.5;">${caption}</div>
                            </div>
                        </div>
                    `;
                    modalContainer.insertAdjacentHTML('beforeend', modalHTML);
                });
            }

            // C. BIND IPHONE CLICK EVENT WITH SCROLL LOCK
            setTimeout(() => {
                const iphoneLayer = document.querySelector('.iphone-click-layer');
                const rmCloseBtn = document.getElementById('rmClose');

                // UNLOCK BACKGROUND WHEN MODAL CLOSES
                if(rmCloseBtn) {
                    const newCloseBtn = rmCloseBtn.cloneNode(true);
                    rmCloseBtn.parentNode.replaceChild(newCloseBtn, rmCloseBtn);
                    
                    newCloseBtn.addEventListener('click', () => {
                        const rm = document.getElementById('reelsModal'); 
                        if(rm) {
                            rm.style.opacity = '0';
                            rm.style.pointerEvents = 'none';
                            document.querySelectorAll('.rm-video').forEach(v => { v.pause(); v.muted = true; }); 
                            document.body.style.overflow = '';
                        }
                    });
                }

                // LOCK BACKGROUND AND OPEN MODAL
                if (iphoneLayer) {
                    iphoneLayer.removeAttribute('onclick'); 
                    iphoneLayer.onclick = null; 
                    
                    const newIphoneLayer = iphoneLayer.cloneNode(true);
                    iphoneLayer.parentNode.replaceChild(newIphoneLayer, iphoneLayer);

                    newIphoneLayer.addEventListener('click', () => {
                        const rm = document.getElementById('reelsModal'); 
                        if(rm) {
                            document.body.style.overflow = 'hidden';
                            rm.style.opacity = '1';
                            rm.style.pointerEvents = 'auto';
                            
                            const heroVid = document.getElementById('heroVideoAd');
                            if(heroVid) heroVid.pause();
                            
                            const firstModalVid = document.querySelector('.rm-container .rm-video');
                            if(firstModalVid) {
                                firstModalVid.muted = false;
                                let playPromise = firstModalVid.play();
                                if (playPromise !== undefined) {
                                    playPromise.catch(error => console.log("Modal play blocked"));
                                }
                            }
                        }
                    });
                }
                
                // D. TIKTOK SCROLL OBSERVER (AUTOPLAYS VIDEO ON SWIPE)
                const rmVideos = document.querySelectorAll('.rm-container .rm-video');
                if('IntersectionObserver' in window && rmVideos.length > 0) {
                    const videoObserver = new IntersectionObserver((entries) => {
                        const rm = document.getElementById('reelsModal');
                        const isModalOpen = rm && rm.style.opacity === '1';

                        entries.forEach(entry => {
                            if(entry.isIntersecting && isModalOpen) { 
                                entry.target.muted = false; 
                                let playPromise = entry.target.play();
                                if (playPromise !== undefined) {
                                    playPromise.catch(error => console.log("Scroll play blocked"));
                                }
                            } 
                            else { 
                                entry.target.pause(); 
                                entry.target.currentTime = 0; 
                            }
                        });
                    });
                    }, { threshold: 0.6 }); 
                    rmVideos.forEach(video => videoObserver.observe(video));
                }
            }, 300);
        } else {
            const heroVid = document.getElementById('heroVideoAd');
            if (heroVid && !heroVid.src) {
                const fallbackSrc = document.querySelector('[data-cms="home_iphone_reel"]');
                if (fallbackSrc && fallbackSrc.src) {
                    heroVid.src = fallbackSrc.src;
                    heroVid.play();
                }
            }
        }

        // ==========================================
        // SIGNAL PRELOADER TO FINISH AND REVEAL UI
        // ==========================================
        document.querySelectorAll('[data-cms]').forEach(el => el.classList.add('cms-loaded'));
        if(window.zyrovaPreloader) window.zyrovaPreloader.isDataLoaded = true;

    } catch (error) {
        console.error("[CMS] ❌ Connection Failed.", error);
        // FAILSAFE: Unhide content and kill preloader so site doesn't break if Render goes offline
        document.querySelectorAll('[data-cms]').forEach(el => el.classList.add('cms-loaded'));
        if(window.zyrovaPreloader) window.zyrovaPreloader.isDataLoaded = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    syncZyrovaCMS();
});