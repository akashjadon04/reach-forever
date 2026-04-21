// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @route   POST /api/auth/login
// @desc    Admin login & get token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, error: 'Please provide email and password' });

        // Find admin & explicitly request the hidden password field for verification
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) return res.status(401).json({ success: false, error: 'Invalid credentials' });

        // Check if password matches
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

        const token = generateToken(admin._id);
        res.status(200).json({ success: true, token, admin: { name: admin.name, email: admin.email, role: admin.role } });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Login Error' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current logged in admin
router.get('/me', protect, async (req, res) => {
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({ success: true, data: admin });
});

// @route   POST /api/auth/setup (TEMPORARY: Use this once to create your first account)
router.post('/setup', async (req, res) => {
    const adminExists = await Admin.findOne();
    if (adminExists) return res.status(400).json({ success: false, error: 'Admin already exists. Setup locked.' });
    
    const admin = await Admin.create({ name: 'Akash Boss', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    res.status(201).json({ success: true, message: 'Master Admin created successfully.', data: admin });
});

module.exports = router;