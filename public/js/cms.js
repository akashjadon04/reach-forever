// ZYROVA CMS - INFINITE SCALING ENGINE (IPHONE MASTER FEED)

const API_BASE_URL = "https://reach-forever.onrender.com/api";

/**
 * Transforms a Cloudinary image URL to add resize + WebP conversion.
 * This is the PRIMARY performance optimizer — reduces image payloads by 95%+.
 * e.g. a 2.2MB PNG avatar → 5KB WebP
 */
function optimizeCloudinaryUrl(url, w = 800, h = null, quality = 'auto:good') {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    // Build transform string — c_limit for width-only, c_fill for exact crops
    const transforms = [`w_${w}`, 'f_webp', `q_${quality}`];
    if (h) {
        transforms.push(`h_${h}`, 'c_fill', 'g_face'); // c_fill crops to exact dimensions
    } else {
        transforms.push('c_limit'); // c_limit only scales down, preserves aspect ratio
    }
    const transformStr = transforms.join(',');
    // Insert after /upload/
    return url.replace(/\/upload\/(?:v\d+\/)?/, (match) => {
        // Already has transforms? Skip
        if (url.includes('/upload/w_') || url.includes('/upload/f_')) return match;
        return match.replace('/upload/', `/upload/${transformStr}/`);
    });
}

/**
 * Optimizes avatar images specifically (small square crops)
 */
function optimizeAvatarUrl(url) {
    return optimizeCloudinaryUrl(url, 80, 80, 'auto:best');
}

/**
 * Optimizes Instagram/result tile images
 */
function optimizeGridImageUrl(url) {
    return optimizeCloudinaryUrl(url, 200, null, 'auto:good');
}

/**
 * Optimizes Cloudinary videos by restricting width and quality
 */
function optimizeCloudinaryVideoUrl(url) {
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/video/upload/')) return url;
    return url.replace(/\/video\/upload\/(?:v\d+\/)?/, (match) => {
        if (url.includes('/upload/w_') || url.includes('/upload/f_')) return match;
        return match.replace('/upload/', `/upload/w_500,f_auto,q_auto/`);
    });
}


async function syncZyrovaCMS() {
    let pageName = window.location.pathname.split("/").pop().replace(".html", "");
    if (!pageName || pageName === "index") pageName = "home";
    if (pageName === "results") pageName = "reviews";

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
                            let imgUrl = dbItem.contentValue;
                            if (dbItem.elementId.includes('ba_') || dbItem.elementId.includes('hero') || dbItem.elementId.includes('bg') || dbItem.elementId.includes('founder') || dbItem.elementId.includes('banner')) {
                                imgUrl = optimizeCloudinaryUrl(dbItem.contentValue, 1200, null, 'auto:good');
                            } else if (dbItem.elementId.includes('avatar')) {
                                imgUrl = optimizeAvatarUrl(dbItem.contentValue);
                            } else {
                                imgUrl = optimizeGridImageUrl(dbItem.contentValue);
                            }

                            if (el.tagName === "DIV" || el.classList.contains('bk-left-bg-overlay')) {
                                el.style.backgroundImage = `url('${imgUrl}')`;
                                el.style.backgroundSize = "cover";
                                el.style.backgroundPosition = "center";
                                el.innerHTML = "";
                            } else {
                                el.src = imgUrl;
                                if (!el.hasAttribute('alt')) el.alt = el.getAttribute('data-cms') || 'Image';
                                el.loading = 'lazy';
                            }
                        } 
                        else if (dbItem.contentType === 'video') {
                            el.src = dbItem.contentValue;
                            el.load(); 
                            let p = el.play();
                            if (p !== undefined) p.catch(e => console.log('Autoplay prevented:', e));
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
                    heroVid.src = optimizeCloudinaryVideoUrl(newestReel.vid); 
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

                    const avatar = optimizeAvatarUrl(reel.avatar || 'https://agency-resources.zyrova.com/reachforever/default-avatar.png');
                    const clientName = reel.name || 'Client';
                    const caption = reel.cap || '';

                    const modalHTML = `
                        <div class="rm-slide" id="modal-slide-${index}" style="width: 100%; height: 100vh; scroll-snap-align: start; position: relative; background: #111;">
                            <video class="rm-video" loop playsinline preload="none" style="width: 100%; height: 100%; object-fit: cover;" src="${optimizeCloudinaryVideoUrl(reel.vid)}"></video>
                            
                            <div style="position: absolute; bottom: 100px; right: 15px; display: flex; flex-direction: column; gap: 25px; z-index: 10; color: #FFF; font-size: 2rem; text-align: center; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;"><i class="ri-heart-fill" style="color: #FF3B30;"></i><span style="font-size: 0.85rem; font-weight: 600;">${Math.floor(Math.random() * 20) + 5}k</span></div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;"><i class="ri-chat-3-fill"></i><span style="font-size: 0.85rem; font-weight: 600;">${Math.floor(Math.random() * 500) + 100}</span></div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;"><i class="ri-share-forward-fill"></i><span style="font-size: 0.85rem; font-weight: 600;">Share</span></div>
                            </div>

                            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 30%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 40px 80px 40px 20px; pointer-events: none;">
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                                    <img src="${avatar}" alt="${clientName} - Client Review" loading="lazy" width="55" height="55" style="width: 55px; height: 55px; border-radius: 50%; border: 3px solid #D4AF37; object-fit: cover;">
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
                const openModalHandler = () => {
                    const rm = document.getElementById('reelsModal'); 
                    if(rm) {
                        document.body.style.overflow = 'hidden';
                        rm.style.opacity = '1';
                        rm.style.pointerEvents = 'auto';
                        
                        const heroVid = document.getElementById('heroVideoAd');
                        if(heroVid) heroVid.pause();
                        
                        const firstModalVid = document.querySelector('.rm-container .rm-video');
                        if(firstModalVid) {
                            firstModalVid.preload = "auto";
                            firstModalVid.muted = false;
                            let playPromise = firstModalVid.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => console.log("Modal play blocked"));
                            }
                        }
                    }
                };

                if (iphoneLayer) {
                    iphoneLayer.removeAttribute('onclick'); 
                    iphoneLayer.onclick = null; 
                    
                    const newIphoneLayer = iphoneLayer.cloneNode(true);
                    iphoneLayer.parentNode.replaceChild(newIphoneLayer, iphoneLayer);

                    newIphoneLayer.addEventListener('click', openModalHandler);
                }

                // Bind Watch Results button
                const watchBtn = document.querySelector('.btn-o');
                if (watchBtn) {
                    watchBtn.removeAttribute('onclick');
                    watchBtn.onclick = null;
                    const newWatchBtn = watchBtn.cloneNode(true);
                    watchBtn.parentNode.replaceChild(newWatchBtn, watchBtn);
                    newWatchBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        openModalHandler();
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
                                entry.target.preload = "auto";
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
                    }, { threshold: 0.6 }); 
                    rmVideos.forEach(video => videoObserver.observe(video));
                }
            }, 300);
        } else {
            // Load fallback video after 3.5s to preserve LCP metric
            setTimeout(() => {
                const heroVid = document.getElementById('heroVideoAd');
                if (heroVid) {
                    const sourceEl = heroVid.querySelector('source');
                    if (sourceEl && sourceEl.dataset.src && !heroVid.src) {
                        sourceEl.src = sourceEl.dataset.src;
                        heroVid.load();
                        let p = heroVid.play();
                        if(p !== undefined) p.catch(()=>{});
                    }
                }
            }, 3500);
        }

        // ==========================================
        // SIGNAL PRELOADER TO FINISH AND REVEAL UI
        // ==========================================
        document.querySelectorAll('[data-cms]').forEach(el => el.classList.add('cms-loaded'));
        if(window.hidePreloader) window.hidePreloader();

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