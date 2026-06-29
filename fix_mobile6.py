import re

def fix():
    # Fix index.html
    html_path = 'public/index.html'
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Remove the inner <source> tag and put data-fallback-src on the <video> tag
    html = re.sub(
        r'<video id="heroVideoAd"([^>]*)>\s*<source data-src="([^"]+)"[^>]*>\s*</video>',
        r'<video id="heroVideoAd"\1 data-fallback-src="\2"></video>',
        html
    )

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed index.html video tag structure.")

    # Fix cms.js
    js_path = 'public/js/cms.js'
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # Fix fallback logic to read dataset.fallbackSrc directly from video tag
    old_fallback = """            // Load fallback video after 3.5s to preserve LCP metric
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
            }, 3500);"""
            
    new_fallback = """            // Load fallback video after 3.5s to preserve LCP metric
            setTimeout(() => {
                const heroVid = document.getElementById('heroVideoAd');
                if (heroVid) {
                    if (heroVid.dataset.fallbackSrc && !heroVid.getAttribute('src')) {
                        heroVid.src = heroVid.dataset.fallbackSrc;
                        heroVid.load();
                        let p = heroVid.play();
                        if(p !== undefined) p.catch(()=>{});
                    }
                }
            }, 3500);"""
            
    js = js.replace(old_fallback, new_fallback)

    # Fix cloud injection logic to use getAttribute('src') safely
    old_cloud = """                    const optimizedUrl = optimizeCloudinaryVideoUrl(newestReel.vid);
                    // Extract filename to check if it's already playing
                    const filename = newestReel.vid.split('/').pop().split('.')[0];
                    if (!heroVid.src.includes(filename)) {
                        heroVid.src = optimizedUrl; 
                        heroVid.load(); 
                        let playPromise = heroVid.play();"""
                        
    new_cloud = """                    const optimizedUrl = optimizeCloudinaryVideoUrl(newestReel.vid);
                    // Extract filename to check if it's already playing
                    const filename = newestReel.vid.split('/').pop().split('.')[0];
                    const currentSrc = heroVid.getAttribute('src') || '';
                    if (!currentSrc.includes(filename)) {
                        heroVid.src = optimizedUrl; 
                        heroVid.load(); 
                        let playPromise = heroVid.play();"""

    js = js.replace(old_cloud, new_cloud)

    # Fix TikTok intersection observer to use getAttribute('src') safely and isolate play logic
    old_obs = """                        entries.forEach(entry => {
                            if(entry.isIntersecting && isModalOpen) { 
                                if (!entry.target.src) {
                                    entry.target.src = entry.target.dataset.src;
                                    entry.target.load();
                                }
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
                        });"""

    new_obs = """                        entries.forEach(entry => {
                            if(entry.isIntersecting) {
                                // Lazy load src when it comes into view
                                if (!entry.target.getAttribute('src') && entry.target.dataset.src) {
                                    entry.target.src = entry.target.dataset.src;
                                    entry.target.load();
                                }
                                // Only play if modal is actually open
                                const rm = document.getElementById('reelsModal');
                                if (rm && rm.style.opacity === '1') {
                                    entry.target.preload = "auto";
                                    entry.target.muted = false; 
                                    let playPromise = entry.target.play();
                                    if (playPromise !== undefined) {
                                        playPromise.catch(error => console.log("Scroll play blocked"));
                                    }
                                }
                            } else { 
                                entry.target.pause(); 
                            }
                        });"""
                        
    js = js.replace(old_obs, new_obs)

    # Fix modal open logic to use getAttribute('src') safely
    old_open = """                        const firstModalVid = document.querySelector('.rm-container .rm-video');
                        if(firstModalVid) {
                            if (!firstModalVid.src) {
                                firstModalVid.src = firstModalVid.dataset.src;
                                firstModalVid.load();
                            }
                            firstModalVid.preload = "auto";
                            firstModalVid.muted = false;
                            let playPromise = firstModalVid.play();"""
                            
    new_open = """                        const firstModalVid = document.querySelector('.rm-container .rm-video');
                        if(firstModalVid) {
                            if (!firstModalVid.getAttribute('src') && firstModalVid.dataset.src) {
                                firstModalVid.src = firstModalVid.dataset.src;
                                firstModalVid.load();
                            }
                            firstModalVid.preload = "auto";
                            firstModalVid.muted = false;
                            let playPromise = firstModalVid.play();"""
                            
    js = js.replace(old_open, new_open)
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print("Fixed cms.js safely.")

if __name__ == '__main__':
    fix()
