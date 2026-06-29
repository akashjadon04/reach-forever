import re

def fix():
    js_path = 'public/js/cms.js'
    try:
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()

        # Fix 1: Ensure we use setAttribute('src', ...) so getAttribute('src') works perfectly
        # For the cloud video load
        old_cloud = """                    const currentSrc = heroVid.getAttribute('src') || '';
                    if (!currentSrc.includes(filename)) {
                        heroVid.src = optimizedUrl; 
                        heroVid.load(); """
        new_cloud = """                    const currentSrc = heroVid.getAttribute('src') || '';
                    if (!currentSrc.includes(filename)) {
                        heroVid.setAttribute('src', optimizedUrl);
                        heroVid.load(); """
        js = js.replace(old_cloud, new_cloud)

        # For the fallback load
        old_fallback = """                    if (heroVid.dataset.fallbackSrc && !heroVid.getAttribute('src')) {
                        heroVid.src = heroVid.dataset.fallbackSrc;
                        heroVid.load();"""
        new_fallback = """                    if (heroVid.dataset.fallbackSrc && !heroVid.getAttribute('src')) {
                        heroVid.setAttribute('src', heroVid.dataset.fallbackSrc);
                        heroVid.load();"""
        js = js.replace(old_fallback, new_fallback)

        # For the intersection observer lazy load
        old_lazy = """                                if (!entry.target.getAttribute('src') && entry.target.dataset.src) {
                                    entry.target.src = entry.target.dataset.src;
                                    entry.target.load();
                                }"""
        new_lazy = """                                if (!entry.target.getAttribute('src') && entry.target.dataset.src) {
                                    entry.target.setAttribute('src', entry.target.dataset.src);
                                    entry.target.load();
                                }"""
        js = js.replace(old_lazy, new_lazy)

        # For the first modal video play
        old_first = """                            if (!firstModalVid.getAttribute('src') && firstModalVid.dataset.src) {
                                firstModalVid.src = firstModalVid.dataset.src;
                                firstModalVid.load();
                            }"""
        new_first = """                            if (!firstModalVid.getAttribute('src') && firstModalVid.dataset.src) {
                                firstModalVid.setAttribute('src', firstModalVid.dataset.src);
                                firstModalVid.load();
                            }"""
        js = js.replace(old_first, new_first)

        # Fix 2: Unpause the iPhone mockup video when closing the modal
        old_close = """                            document.querySelectorAll('.rm-video').forEach(v => { v.pause(); v.muted = true; }); 
                            document.body.style.overflow = '';
                        }
                    });"""
        new_close = """                            document.querySelectorAll('.rm-video').forEach(v => { v.pause(); v.muted = true; }); 
                            document.body.style.overflow = '';
                            
                            const hv = document.getElementById('heroVideoAd');
                            if(hv) {
                                let p = hv.play();
                                if(p !== undefined) p.catch(()=>{});
                            }
                        }
                    });"""
        js = js.replace(old_close, new_close)

        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js)
        print("cms.js patched successfully.")
    except Exception as e:
        print(f"Error patching cms.js: {e}")

if __name__ == '__main__':
    fix()
