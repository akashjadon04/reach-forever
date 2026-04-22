// ==========================================================================
// ZYROVA DIGITAL - REACH FOREVER V8 ENGINE (DECOUPLED API BUILD)
// Architecture: Node.js + Express 5.x + MongoDB Atlas + Cloudinary
// ==========================================================================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); 
const os = require('os');
const app = express();

// ==========================================
// PHASE 1: ENTERPRISE DEFENSE & CORS
// ==========================================
app.set('trust proxy', 1);
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

// BULLETPROOF CORS: Matches whatever port your frontend is running on
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', apiLimiter);

// ==========================================
// PHASE 2: OPTIMIZATION & PARSING
// ==========================================
app.use(compression());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// ==========================================
// PHASE 3: DATABASE CONNECTION
// ==========================================
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[DATABASE] 🟢 MongoDB Atlas Linked: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[DATABASE] 🔴 CRITICAL FAILURE: ${error.message}`);
    }
};
connectDB();

// ==========================================
// PHASE 4: THE API ROUTES
// ==========================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health Check for Render
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Operational', agency: 'Zyrova Digital' });
});

// CRITICAL FIX: Express 5.x Safe 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: 'Zyrova API Endpoint Not Found' });
});

// ==========================================
// PHASE 5: GLOBAL ERROR CAPTURE MATRIX
// ==========================================
app.use((err, req, res, next) => {
    console.error(`[SYSTEM ERROR] 🔥: ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Malfunction'
    });
});

// ==========================================
// PHASE 6: IGNITION
// ==========================================
const PORT = process.env.PORT || 5000;

// CRITICAL FIX: Defined 'server' so shutdown protocol works, fixed bracket syntax
const server = app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 ZYROVA DIGITAL ENGINE ONLINE | PORT: ${PORT}`);
    console.log(`=================================================`);

    if (process.env.CLOUDINARY_CLOUD_NAME) {
        console.log(`[STORAGE]  ☁️  Cloudinary Vault Active: [${process.env.CLOUDINARY_CLOUD_NAME}]`);
    } else {
        console.log(`[STORAGE]  ⚠️  WARNING: Cloudinary configuration missing!`);
    }
});

// ==========================================
// PHASE 7: GRACEFUL TERMINATION
// ==========================================
const gracefulShutdown = () => {
    console.log('\n[SYSTEM] 👋 Shutdown signal intercepted. Securing data...');
    server.close(async () => {
        await mongoose.connection.close();
        console.log('[SYSTEM] 💥 Database detached. Engine powered down safely.');
        process.exit(0);
    });
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);