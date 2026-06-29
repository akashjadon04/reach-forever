import re
import sys

def fix_all():
    # 1. Fix WhatsApp Float Position (Make it above the mobile navbar globally)
    css_path = 'public/css/global-ui.css'
    try:
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()

        wa_fix = """
/* Fix WhatsApp float overlapping mobile nav */
@media(max-width:800px) {
  .wa-float {
    bottom: 90px !important;
    left: 15px !important;
    z-index: 999999 !important;
  }
}
"""
        if '/* Fix WhatsApp float' not in css:
            css += wa_fix
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css)
            print("Fixed WhatsApp float position")
    except Exception as e:
        print(f"Error CSS: {e}")

    # 2. Fix iPhone Mockup Local/Cloud Fighting in index.html
    html_path = 'public/index.html'
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()

        # We want to remove the src="..." from the source tag inside #heroVideoAd
        # to prevent it from loading the local video and fighting with the cloud video.
        # It should just be <source data-src="..." type="video/mp4">
        html = re.sub(
            r'(<video id="heroVideoAd"[\s\S]*?<source\s+)src="[^"]+"\s*(type="video/mp4">)',
            r'\1data-src="https://res.cloudinary.com/dwniivgg5/video/upload/v1734533036/WhatsApp_Video_2024-12-18_at_20.13.06_c06e30eb_g8yftz.mp4" \2',
            html
        )
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print("Fixed index.html iPhone Mockup video clash")
    except Exception as e:
        print(f"Error index.html: {e}")

    # 3. Fix CMS.js Reels "Blank after 5" bug and Modal playback logic
    js_path = 'public/js/cms.js'
    try:
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()

        # A) Change modal injection from src="..." to data-src="..."
        js = js.replace(
            'src="${optimizeCloudinaryVideoUrl(reel.vid)}"',
            'data-src="${optimizeCloudinaryVideoUrl(reel.vid)}"'
        )

        # B) Update the IntersectionObserver to lazy load the video source
        old_observer = """                            if(entry.isIntersecting && isModalOpen) { 
                                entry.target.preload = "auto";
                                entry.target.muted = false; 
                                let playPromise = entry.target.play();"""
        
        new_observer = """                            if(entry.isIntersecting && isModalOpen) { 
                                if (!entry.target.src) {
                                    entry.target.src = entry.target.dataset.src;
                                    entry.target.load();
                                }
                                entry.target.preload = "auto";
                                entry.target.muted = false; 
                                let playPromise = entry.target.play();"""

        js = js.replace(old_observer, new_observer)
        
        # C) Make sure when modal opens, it loads the first video properly
        old_open = """                            firstModalVid.preload = "auto";
                            firstModalVid.muted = false;
                            let playPromise = firstModalVid.play();"""
                            
        new_open = """                            if (!firstModalVid.src) {
                                firstModalVid.src = firstModalVid.dataset.src;
                                firstModalVid.load();
                            }
                            firstModalVid.preload = "auto";
                            firstModalVid.muted = false;
                            let playPromise = firstModalVid.play();"""
                            
        js = js.replace(old_open, new_open)

        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js)
        print("Fixed cms.js Reels blank bug")
    except Exception as e:
        print(f"Error cms.js: {e}")

if __name__ == '__main__':
    fix_all()
