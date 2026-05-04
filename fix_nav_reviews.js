const fs = require('fs');
const path = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public\\reviews.html';
let content = fs.readFileSync(path, 'utf8');

// Fix Nav
content = content.replace(
    /<li class="magnetic-wrap"><a href="index\.html" class="nav-pill active magnetic-inner" data-cms="nav_link_1">Home<\/a><\/li>/,
    '<li class="magnetic-wrap"><a href="index.html" class="nav-pill magnetic-inner" data-cms="nav_link_1">Home</a></li>'
);
content = content.replace(
    /<li class="magnetic-wrap"><a href="reviews\.html" class="nav-pill magnetic-inner" data-cms="nav_link_3">Reviews<\/a><\/li>/,
    '<li class="magnetic-wrap"><a href="reviews.html" class="nav-pill active magnetic-inner" data-cms="nav_link_3">Reviews</a></li>'
);

fs.writeFileSync(path, content);
console.log('Nav fixed successfully');
