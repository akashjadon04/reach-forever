// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');

// @route   POST /api/leads
// @desc    Submit a new contact form lead (Public)
router.post('/', async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        // Here you could trigger an email to yourself saying "NEW LEAD CAME IN!"
        res.status(201).json({ success: true, message: 'Form submitted successfully.', data: lead });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// @route   GET /api/leads
// @desc    Get all leads for the dashboard (Protected - Admin Only)
router.get('/', protect, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch leads' });
    }
});

// @route   PUT /api/leads/:id
// @desc    Update lead status (Protected - Admin Only)
router.put('/:id', protect, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
        res.status(200).json({ success: true, data: lead });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to update lead' });
    }
});

module.exports = router;