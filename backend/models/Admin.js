// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an admin name'],
        trim: true,
        default: 'Akash Jadon'
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // SECURITY: Never returns password in standard database queries
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'superadmin' // Future-proofed for when you hire team members
    },
    lastLogin: {
        type: Date,
        default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

// ==========================================
// SECURITY HOOK: Encrypt password before saving
// ==========================================
AdminSchema.pre('save', async function(next) {
    // Only run this if the password was actually modified
    if (!this.isModified('password')) {
        next();
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// ==========================================
// METHOD: Compare entered password vs database hash
// ==========================================
AdminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ==========================================
// METHOD: Generate and hash secure password reset token
// ==========================================
AdminSchema.methods.getResetPasswordToken = function() {
    // Generate a random 20-character hex token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to the resetPasswordToken field in the DB
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set the token to expire in exactly 10 minutes
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('Admin', AdminSchema);