const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\Akash\\OneDrive\\Documents\\reach forever\\public';
const files = ['index.html', 'services.html', 'reviews.html', 'form.html'];

const seoData = {
    'index.html': { title: 'Reach Forever | Best Digital Marketing Agency in Punjab (Jalandhar, Phagwara, Amritsar)', desc: 'Reach Forever is the #1 premium digital marketing agency in Punjab. We specialize in ROI-driven Google Ads, Facebook Ads, SEO, and high-end Web Development in Jalandhar, Phagwara, and Amritsar.' },
    'services.html': { title: 'Premium Digital Services | Reach Forever Marketing Agency Punjab', desc: 'Discover our premium digital marketing services including Viral Social Media Management, Local SEO, and High-Converting Custom Websites designed to scale your business.' },
    'reviews.html': { title: 'Client Success & Reviews | Reach Forever Agency Punjab', desc: 'See real results from local businesses in Punjab who scaled using Reach Forever. Watch case studies from Jalandhar, Amritsar, and Phagwara.' },
    'form.html': { title: 'Book Your Free Strategy Call | Reach Forever', desc: 'Schedule your exclusive strategy session with Reach Forever. Let us build your predictable revenue system today.' }
};

const getSeoBlock = (page) => `
    <!-- MAXIMUM GRADE SEO & META TAGS -->
    <meta name="description" content="${seoData[page].desc}">
    <meta name="keywords" content="Best Digital Marketing Agency in Jalandhar, Digital Marketing in Phagwara, Marketing Agency Amritsar, Best SEO Punjab, Facebook Ads expert Punjab, Premium Web Development India, Reach Forever">
    <meta name="author" content="Zyrova Digital">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="https://reachforever.in/${page === 'index.html' ? '' : page}">
    
    <!-- OpenGraph (Facebook/LinkedIn) -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${seoData[page].title}">
    <meta property="og:description" content="${seoData[page].desc}">
    <meta property="og:url" content="https://reachforever.in/${page === 'index.html' ? '' : page}">
    <meta property="og:site_name" content="Reach Forever Agency">
    <meta property="og:image" content="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seoData[page].title}">
    <meta name="twitter:description" content="${seoData[page].desc}">
    <meta name="twitter:image" content="https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png">

    <!-- JSON-LD Schema Markup (LocalBusiness / Agency) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MarketingAgency",
      "name": "Reach Forever",
      "image": "https://agency-resources.zyrova.com/reachforever/ReachForever_Illustrative_Logo_8K.png",
      "description": "Premium Digital Marketing Agency serving Jalandhar, Phagwara, Amritsar, and all of Punjab. Specializing in high-ticket lead generation and luxury web development.",
      "url": "https://reachforever.in",
      "telephone": "+917668758238",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jalandhar",
        "addressRegion": "Punjab",
        "addressCountry": "IN"
      },
      "areaServed": ["Jalandhar", "Phagwara", "Amritsar", "Punjab"],
      "priceRange": "$$$$"
    }
    </script>
`;

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing meta tags to avoid duplication
    content = content.replace(/<title>.*?<\/title>/gi, '');
    content = content.replace(/<meta name="description".*?>/gi, '');
    content = content.replace(/<meta name="keywords".*?>/gi, '');
    content = content.replace(/<!-- MAXIMUM GRADE SEO & META TAGS -->.*?<\/script>/gis, '');

    // Inject new SEO
    const headInsertPos = content.indexOf('<head>') + 6;
    const injection = `\n    <title>${seoData[file].title}</title>${getSeoBlock(file)}`;
    
    content = content.slice(0, headInsertPos) + injection + content.slice(headInsertPos);

    fs.writeFileSync(filePath, content);
    console.log(`Injected Top-Tier SEO into ${file}`);
}
