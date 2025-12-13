// mongodbConnect.js
const mongoose = require('mongoose');

console.log(`Mongoose installed version: ${mongoose.version}`);

const MONG_URL = process.env.MONG_URL || 'mongodb://localhost:27017/Alib';

async function connectDB() {
    try {
        await mongoose.connect(MONG_URL);
        console.log(`Connection successful to ${MONG_URL}`);
        console.log(`Current Mongoose version: ${mongoose.version}`);
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        process.exit(1);
    }
}

// Optional: Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;
