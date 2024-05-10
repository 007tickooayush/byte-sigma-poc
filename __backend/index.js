const cors = require('cors');
const path = require('path');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config({ path: './.env.backend'});
const { connectDB } = require('./_utils/db');
const { uploadFileServer } = require('./_images/images.controller');


const multer = require('multer');
const fs = require('fs');
const { imageFileFilter } = require('./_utils/fileFilter');
const uploadsDirectory = path.join(__dirname, 'uploads/');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, __dirname + globalFileDestination);
        cb(null, uploadsDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

// Create the uploads directory TEMPORARILY if it doesn't exist
// const uploadsDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
}


const PORT = process.env.SERVER_PORT || 3001;
const corsOptions = {
    origin: [].concat(JSON.parse(process.env.ALLOWED_URLS)) ?? ['http://localhost:3002', 'http:localhost:3001/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};

app.use(cors({...corsOptions}));
app.post('/upload-file', upload.single('file'), uploadFileServer);

connectDB().then(() => {
    console.log('Database connected');
}).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection error:', error);
});


//  handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error(error);
    server.close(() => {
        console.log('Server closed');
        process.exit(1);
    });
});
