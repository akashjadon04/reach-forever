const fs = require('fs');
const path = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix the image tags to prevent dragging
const imgAfterRegex = /<img src="https:\/\/images\.pexels\.com\/photos\/19736858\/pexels-photo-19736858\.jpeg\?auto=compress&cs=tinysrgb&w=1200&q=80" class="ba-img-after" alt="Modern Converting Design" data-cms="ba_img_after" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;">/;
const imgAfterNew = '<img src="https://images.pexels.com/photos/19736858/pexels-photo-19736858.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80" class="ba-img-after" alt="Modern Converting Design" data-cms="ba_img_after" draggable="false" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; pointer-events: none; user-select: none;">';

const imgBeforeRegex = /<img src="https:\/\/images\.pexels\.com\/photos\/265087\/pexels-photo-265087\.jpeg\?auto=compress&cs=tinysrgb&w=1200&q=80" class="ba-img-before" id="baBefore" alt="Old Messy Design" data-cms="ba_img_before" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; clip-path: inset\(0 50% 0 0\);">/;
const imgBeforeNew = '<img src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80" class="ba-img-before" id="baBefore" alt="Old Messy Design" data-cms="ba_img_before" draggable="false" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; clip-path: inset(0 50% 0 0); pointer-events: none; user-select: none;">';

content = content.replace(imgAfterRegex, imgAfterNew);
content = content.replace(imgBeforeRegex, imgBeforeNew);

// 2. The mousedown fix is already applied from previous turn (it was in chunk 1 which succeeded)
// Let's verify and if not, apply it.
if (!content.includes('e.preventDefault(); isDragging = true;')) {
    content = content.replace(/baContainer\.addEventListener\('mousedown', \(e\) => { isDragging = true;/, "baContainer.addEventListener('mousedown', (e) => { e.preventDefault(); isDragging = true;");
}

fs.writeFileSync(path, content);
console.log('Slider drag fix applied successfully via Node script');
