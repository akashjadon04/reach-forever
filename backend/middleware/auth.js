// middleware/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token, reject instantly
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route. Security breach blocked.' });
    }

    try {
        // Verify token using your secret vault key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the admin in the database and attach them to the request
        req.admin = await Admin.findById(decoded.id);
        next(); // Allow them to proceed to the route
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Token expired or invalid. Access denied.' });
    }
};

module.exports = { protect };