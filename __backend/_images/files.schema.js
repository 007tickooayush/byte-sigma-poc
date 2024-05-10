const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    fieldname: {
        type: String,
        required: true
    },
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
    destination: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }

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
imageSchema.index({ originalname: -1 }, { unique: true });

const Image = mongoose.model('Image', imageSchema, 'images');

module.exports = Image;