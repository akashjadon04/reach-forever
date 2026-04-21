// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// BULLETPROOF FIX: Use Disk Storage. 
// Safely buffers heavy MP4s to a temporary folder before pushing to Cloudinary.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});

// 50MB limit for high-quality agency reels
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });

// @route   POST /api/upload
// @desc    Upload media to Cloudinary (Protected - Admin Only)
router.post('/', protect, upload.single('media'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    // Auto-detect if it's a video or image for Cloudinary processing
    const resourceType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

    try {
        console.log(`[STORAGE] Uploading ${resourceType} to Cloudinary...`);

        // Upload the physical file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: resourceType,
            folder: 'reachforever_assets'
        });

        // CRITICAL: Delete the temporary file from your server so your hard drive doesn't fill up
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.log(`[STORAGE] ✅ Upload Success: ${result.secure_url}`);
        
        res.status(200).json({ 
            success: true, 
            url: result.secure_url, 
            public_id: result.public_id 
        });

    } catch (error) {
        // If it fails, still delete the temp file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error('[STORAGE] ❌ Cloudinary Error:', error.message);
        res.status(500).json({ success: false, error: 'Cloudinary Upload Failed', details: error.message });
    }
});

module.exports = router;