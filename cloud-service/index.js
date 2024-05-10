const { uploadsDirectory } = require('./indexExports');

const cors = require('cors');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config({ path: './.env.cloud' });


const multer = require('multer');
const { authenticationValidator, uploadValidationAfter, getFileCloud } = require('./_files/files.controller');
const fs = require('fs');


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

});

const PORT = process.env.SERVER_PORT || 4000;
// console.log('[].concat(JSON.parse(process.env.ALLOWED_URLS)) :>> ', [].concat(JSON.parse(process.env.ALLOWED_URLS)));
/**
 * @type {cors.CorsOptions}
 */
const corsOptions = {
    origin: ['http://localhost:3002', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Create the uploads directory if it doesn't exist
// const uploadsDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
}


app.use('/images', authenticationValidator, express.static(uploadsDirectory));
app.post('/upload', authenticationValidator, upload.single('file'), uploadValidationAfter);
app.get('/image/:filename', authenticationValidator, getFileCloud); 

server.listen(PORT, () => {
    console.log(`Pseudo Cloud Service running on port ${PORT}`);
});