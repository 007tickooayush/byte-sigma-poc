const express = require('express');
const fs = require('fs');
const path = require('path');
const { uploadsDirectory } = require('../indexExports');
require('dotenv').config({ path: './.env.cloud'});


/**
 * 
 * @param {express.Request} req requset object
 * @param {express.Response} res response object
 * @param {express.NextFunction} next express next function
 */
const authenticationValidator = async (req, res, next) => {
    console.log('req.headers :>> ', req.headers);
    console.log('process.env.ACCESS_TOKEN_SECRET :>> ', process.env.ACCESS_TOKEN_SECRET);
    if (req.headers['authorization'] === process.env.ACCESS_TOKEN_SECRET) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthorized!' });
    }
};

/**
 * 
 * @param {express.Request} req requset object
 * @param {express.Response} res response object
 * @param {express.NextFunction} next express next function
 */
const getFileCloud = (req, res) => {
    const method = 'getFileCloud';
    console.time(method);
    try {
        if (!req.query.filename) {
            throw new Error('No filename provided');
        }

        const { filename } = req.query;
        const filePath = path.join(uploadsDirectory, filename);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).send({ message: 'File not found!' });
        }
        
    } catch (err) {
        res.status(500).send({ message: 'Internal Server error occured', error: err });
    } finally {
        console.timeEnd(method);
    }
};


/**
 * 
 * @param {express.Request} req requset object
 * @param {express.Response} res response object
 * @param {express.NextFunction} next express next function
 */
const uploadValidationAfter = async (req, res, next) => {
    const method = 'BLOCK:uploadValidationAfter';
    console.time(method);
    try {
        console.log(req.file);
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        res.json({ file: req.file, message: 'File uploaded successfully!' });
    } catch (err) {
        console.log('cloud err :>> ', err);
        res.status(500).send({ message: 'Internal Server error occured' });
    } finally {
        console.timeEnd(method);
    }
};

module.exports = {
    authenticationValidator,
    getFileCloud,
    uploadValidationAfter
};