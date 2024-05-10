const fs = require('fs');

const deleteFileAfterUpload = async (file) => {
    const method = 'deleteFileAfterUpload';
    console.time(method);
    try {
        fs.unlinkSync(file.path);
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