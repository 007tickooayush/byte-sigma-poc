const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true
    },
    encoding: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    accessLink: {
        type: String,
        required: true
    },
    // OPTIONAL: to store data in the mongo database, but file size should not exceed 16 mb
    // data: {
    //     type: Buffer,
    //     required: true
    // }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// unique index on originalname field
imageSchema.index({ originalname: 1 }, { unique: true });
imageSchema.index({ accessLink: 1 }, { unique: true });
imageSchema.index({ created_at: -1 });
const Image = mongoose.model('Image', imageSchema, 'images');

module.exports = Image;