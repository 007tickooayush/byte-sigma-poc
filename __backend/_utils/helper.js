const fs = require('fs');

/**
 * 
 * @param {string} filePath file path
 */
const deleteFileAfterUpload = async (filePath) => {
    const method = 'deleteFileAfterUpload';
    console.time(method);
    try {
        fs.unlinkSync(filePath);
    }
    catch (err) {
        console.error('Error deleting file:', err);
    }
    finally {
        console.timeEnd(method);
    }
}

module.exports = {
    deleteFileAfterUpload
};