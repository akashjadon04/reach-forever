const fs = require('fs');
const path = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\index.html';
let content = fs.readFileSync(path, 'utf8');

// GUARANTEED VISIBILITY SURGERY:
// 1. Remove the data-cms tags that are causing the overwrite with empty data
// 2. Force opacity and visibility
// 3. Simplified, high-performance styling

const parallaxSectionOld = /<section class="parallax-break"[\s\S]*?<\/section>/;

const parallaxSectionNew = `        <section class="parallax-break" id="parallax-break-admin" style="position: relative; width: 96%; max-width: 1600px; margin: 6rem auto; height: 50vh; border-radius: 60px; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 40px 80px rgba(0,0,0,0.1); z-index: 5;">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=2000&q=100" class="px-img" alt="Agency Parallax" data-cms="px_bg" style="position: absolute; inset: 0; width: 100%; height: 130%; object-fit: cover; filter: brightness(0.4) saturate(1.2); transform: scale(1.1); z-index: 1;">
            <div class="px-content" style="position: relative; z-index: 10; text-align: center; color: #FFFFFF; padding: 0 20px; opacity: 1 !important; display: block !important;">
                <h2 style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 7vw, 7rem); line-height: 1; margin-bottom: 10px; color: #D4AF37; text-shadow: 0 20px 40px rgba(0,0,0,0.8); opacity: 1 !important; display: block !important;">₹85 Lakhs+</h2>
                <p style="font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #FFFFFF; text-shadow: 0 10px 20px rgba(0,0,0,0.8); opacity: 1 !important; display: block !important;">Revenue Generated for Local Clients This Quarter</p>
            </div>
        </section>`;

content = content.replace(parallaxSectionOld, parallaxSectionNew);

fs.writeFileSync(path, content);
console.log('Final Guaranteed Surgery Applied Successfully');
