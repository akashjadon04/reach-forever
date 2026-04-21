// models/Lead.js
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the client name'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide a contact email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        trim: true
    },
    businessName: {
        type: String,
        trim: true,
        default: 'Not provided'
    },
    currentRevenue: {
        type: String,
        required: [true, 'Revenue bracket is required to qualify the lead']
    },
    serviceOfInterest: {
        type: String,
        enum: ['Web Development', 'Digital Marketing', 'Mobile App', 'Full System', 'Other'],
        default: 'Full System'
    },
    message: {
        type: String,
        maxlength: [1000, 'Message cannot exceed 1000 characters'],
        default: 'No additional message provided.'
    },
    
    // ==========================================
    // AGENCY PIPELINE TRACKER
    // ==========================================
    // Acts as a mini-CRM built directly into your database
    status: {
        type: String,
        enum: ['New', 'Contacted', 'In Negotiations', 'Closed Won', 'Closed Lost'],
        default: 'New'
    },
    notes: {
        type: String,
        default: '' // For you to leave private admin notes on this lead
    }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);