const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const method = 'BLOCK: MongoDB connection time';
    console.time(method);
    try {
        await mongoose.connect(process.env.MONGO_URI ); //?? 'mongodb://localhost:27017/bytesigma');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Mongo connection error occured:',error);
    } finally {
        console.timeEnd(method);
    }
};

module.exports = {
    connectDB
};