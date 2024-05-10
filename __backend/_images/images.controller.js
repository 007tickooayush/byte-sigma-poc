const express = require('express');
const Image = require('./files.schema');
const fs = require('fs');
const { default: mongoose, MongooseError, Mongoose } = require('mongoose');
const { deleteFileAfterUpload } = require('../_utils/helper');
require('dotenv').config({ path: './.env.backend' });
/**
 * 
 * @param {express.Request} req requset object
 * @param {express.Response} res response object
 * @param {express.NextFunction} next express next function
 */

const uploadFileServer = async (req, res) => {
    const method = 'uploadFileServer';
    console.time(method);
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        console.log('process.env.CLOUD_URL :>> ', process.env.CLOUD_URL);

        const formData = new FormData();
        const fileBlob = new Blob([fs.readFileSync(req.file.path)], { type: req.file.mimetype });

        formData.append('file', fileBlob, req.file.originalname);
        const response = await fetch(`${process.env.CLOUD_URL}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': String(process.env.ACCESS_TOKEN_SECRET) ?? 'no-key-found'
            },
        }).then(response => response.json());

        const cloudUrl = `${process.env.CLOUD_URL}/${process.env.IMAGES_PATH}/${req.file.originalname}`;

        // only save the requierd fields
        const createImage = Image.create({
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            filename: req.file.filename,
            size: req.file.size,
            accessLink: cloudUrl
        });

        const unLinkLocalFile = deleteFileAfterUpload(req.file.path);

        const [resp1, resp2] = await Promise.allSettled([createImage, unLinkLocalFile]);

        if (resp1.status === 'rejected' || resp2.status === 'rejected') {
            if (resp1.status === 'rejected') {
                if (resp1.reason.toString().includes('E11000')) {
                    return res.status(400).send({ message: 'File with the same name already exists!' });
                }
                throw new Error(resp1);
            } else if (resp2.status === 'rejected') {

                throw new Error('Error occurred while deleting local file');
            }
        }

        const fileResp = {
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            filename: req.file.filename,
            size: req.file.size,
            accessLink: cloudUrl
        };
        res.json({ message: response.message, file: fileResp });
    } catch (err) {
        console.log('err :>> ', err);
        res.status(500).send({ message: 'Internal Server error occured' });
    } finally {
        console.timeEnd(method);
    }
}

/**
 * 
 * @param {express.Request} req request object
 * @param {express.Response} res response object
 */
const getImagesData = async (req, res) => {
    const method = 'getImagesData';
    console.time(method);
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;

        const images = await Image.find().sort({ created_at: -1 }).skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        const count = await Image.countDocuments();

        const pageObj = {
            total: count,
            nextPage: count > (pageNumber * limitNumber) ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null,
            currPage: pageNumber
        }

        res.json({ message: 'fetched data from server', images, page: pageObj });
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).send({ message: 'Internal Server error occured' });
    } finally {
        console.timeEnd(method);
    }
};

module.exports = {
    uploadFileServer,
    getImagesData
};