// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { protect } = require('../middleware/auth');

// @route   GET /api/content/:pageId
// @desc    Fetch all active content for a page (Public)
router.get('/:pageId', async (req, res) => {
    try {
        const content = await Content.find({ pageId: req.params.pageId, isVisible: true });
        res.status(200).json({ success: true, count: content.length, data: content });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch content' });
    }
});

// @route   POST /api/content 
// @desc    Create new dynamic elements or Update existing ones (Protected)
router.post('/', protect, async (req, res) => {
    try {
        const { pageId, elementId, contentType, contentValue, mediaPublicId } = req.body;
        let content = await Content.findOne({ pageId, elementId });

        if (content) {
            // Save the previous state before overwriting
            content.previousValue = content.contentValue;
            content.contentValue = contentValue;
            if(mediaPublicId) content.mediaPublicId = mediaPublicId;
            content.lastUpdatedBy = req.admin ? req.admin.name : 'System Admin';
            await content.save();
        } else {
            // Inject brand new dynamic elements (like infinite reels)
            content = await Content.create({ 
                pageId, 
                elementId, 
                contentType, 
                contentValue, 
                mediaPublicId, 
                lastUpdatedBy: req.admin ? req.admin.name : 'System Admin' 
            });
        }
        res.status(200).json({ success: true, data: content });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// @route   DELETE /api/content/:pageId/:elementId
// @desc    Permanently wipe an element from the database (Crucial for Infinite Reels Manager)
router.delete('/:pageId/:elementId', protect, async (req, res) => {
    try {
        const deletedElement = await Content.findOneAndDelete({ pageId: req.params.pageId, elementId: req.params.elementId });
        
        if (!deletedElement) {
            return res.status(404).json({ success: false, error: 'Element not found in database.' });
        }

        res.status(200).json({ success: true, message: 'Element permanently wiped from Zyrova Engine.' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Database failed to execute deletion.' });
    }
});

module.exports = router;