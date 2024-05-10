const express = require('express');
const Image = require('./files.schema');
const fs = require('fs');
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
        const fileBlob = new Blob([fs.readFileSync(req.file.path)], { type: req.file.mimetype } );

        formData.append('file', fileBlob, req.file.originalname);
        const response = await fetch(`${process.env.CLOUD_URL}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': String(process.env.ACCESS_TOKEN_SECRET) ?? 'no-key-found'
            },
        })
            .then(response => response.json());
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => {
        //     console.error('form err>',error)
        //     res.status(500).send({ message: 'Internal Server error occured' });
        //     res.end();
        // });

        // const response = await fetch( `${process.env.CLOUD_URL}/upload`, {
        //     method: 'POST',
        //     body: req.file,
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': String(process.env.ACCESS_TOKEN_SECRET) ?? 'no-key-found'
        //     }
        // });
        // // await image.save();
        res.json({ message: response.message, file: req.file });
    } catch (err) {
        console.log('err :>> ', err);
        res.status(500).send({ message: 'Internal Server error occured' });
    } finally {
        console.timeEnd(method);
    }
}



module.exports = {
    uploadFileServer
};