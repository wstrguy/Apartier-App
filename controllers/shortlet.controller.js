require ('dotenv').config();
const { request } = require('express');
const Pool = require('../database/db');
const cloudinary = require('../utils/cloud');
require('../utils/passport-user');
const passport = require('passport');
const { isAuthGoogle } = require('../utils/rbac');
require ('../utils/passport-user');


// creating shortlet controller
exports.createShortlet =  async (req, res) => {
    let { aptName, state, numRooms, address,  price } = req.body;
    let { img1, img2 } = req.files;

    try {
 
         // uploading images to cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

        const results = await Promise.all([
            cloudinary.uploader.upload(img1[0].path),
            cloudinary.uploader.upload(img2[0].path),
        ]);
        const imageUrls = results.map((result) => result.secure_url); // Get the URLs of all uploaded images
        const img1Url = imageUrls[0];
        const img2Url = imageUrls[1];

        const sql = 'INSERT INTO shortlets (aptName, state, numRooms, address,  price, img1, img2) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const data = await Pool.query(sql,[aptName, state, numRooms, address,  price, img1Url, img2Url]);

        const [data1] = await Pool.query('SELECT * FROM shortlets WHERE id = ?', [data[0].insertId]);

        return res.status(201).json({ 
            message: 'Shortlet Created Successfully',
            data: data1[0] });
    } catch (err) {
        console.log(err);
    }
}



exports.getAllShortlet = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const offset = (page - 1) * limit;
        
        let sql = 'SELECT * FROM shortlets';
        
        if (req.params.page || req.params.limit) {
            sql += ` LIMIT ${limit} OFFSET ${offset}`;
        }
        const data = await Pool.query(sql);

         res.status(200).json({ 
            message: 'All Shortlet',
            data: data[0]
        });

    } catch (err) {
        console.log(err);
    }
}



// get shortlet by state
exports.getShortletByState = async (req, res) => {
    const { state } = req.params;
    try {
        const sql = 'SELECT * FROM shortlets WHERE state = ?';
        const data = await Pool.query(sql, [state]);
        return res.status(200).json({ 
            message: 'Shortlet by State',
            data: data[0] });
        
    } catch (err) {
        console.log(err);
    }
}


// get total number of shortlet

exports.getTotalShortlet = async (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM shortlets';
        const data = await Pool.query(sql);
        return res.status(200).json({ 
            message: 'Total Shortlet',
            data: data[0] });
        
    } catch (err) {
        console.log(err);
    }
}
    
