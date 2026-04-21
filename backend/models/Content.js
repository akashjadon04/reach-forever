// models/Content.js
const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    pageId: {
        type: String,
        required: [true, 'Page ID is required (e.g., home, services, reviews, global)'],
        index: true // SECURITY & SPEED: Drastically reduces database search time on page load
    },
    elementId: {
        type: String,
        required: [true, 'Element ID is required (This links directly to your frontend tags)'],
        unique: true, // Ensures no two elements accidentally overwrite each other
        trim: true
    },
    contentType: {
        type: String,
        enum: ['text', 'image', 'video', 'link'],
        required: [true, 'Must specify if this is text, an image, a video, or a link']
    },
    contentValue: {
        type: String,
        required: [true, 'Content value cannot be empty'] // The actual text or Cloudinary URL
    },
    
    // ==========================================
    // CLOUDINARY COST-SAVER PROTOCOL
    // ==========================================
    // Stores the exact Cloudinary asset ID. When you update an image/video, 
    // the server uses this ID to delete the old asset so you don't pay for dead storage.
    mediaPublicId: {
        type: String,
        default: null
    },

    // ==========================================
    // DISASTER RECOVERY (Version Control)
    // ==========================================
    // Automatically caches the last saved version of this content.
    // If you make a mistake, the data is not permanently lost.
    previousValue: {
        type: String,
        default: null 
    },
    
    lastUpdatedBy: {
        type: String,
        default: 'System Admin'
    },
    
    // Allows you to easily hide a section from the website without deleting the data
    isVisible: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);