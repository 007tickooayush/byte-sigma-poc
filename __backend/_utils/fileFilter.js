/**
 * 
 * @param {express.Request} req request object
 * @param {Express.Multer.File} file multer file object
 * @param {multer.FileFilterCallback} cb multer callback function
 * @returns void
 */
const imageFileFilter = (req, file, cb) => {
    
    // check file size is greater than 20MB
    if (file.size > 20 * 1024 * 1024) {
        cb(null, false);
        return cb(new Error('File size should not exceed 20MB!'));
    }
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .jpg and .png format allowed!'));
    }
}


module.exports = {
    imageFileFilter
};