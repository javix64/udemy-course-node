const path = require('path');
const fs = require('fs')
const {v4:uuidv4} = require('uuid');
const {response} = require('express');
const {uploadFile} = require("../helpers");
const { Product, User } = require('../models')
const loadFile = async (req, res = response) => {

    try{
        // txt, md
        // const name = await uploadFile(req.files,['md','txt'],'text');
        // Default files: images
        const name = await uploadFile(req.files,undefined,'images');
        res.json({name})
    }catch(err){
        res.status(500).json({err});
    }
}

const updateImage = async(req, res = response) => {
    const { id, collection } = req.params;

    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model) {return res.status(400).json({msg:`Not exist user with id ${id}`})}
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model) {return res.status(400).json({msg:`Not exist product with id ${id}`})};
            break;
        default:
            return res.status(500).json({msg:'Not valitated yet'})
    }
    // delete previous images
    if(model.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img );
        if ( fs.existsSync(imagePath) ) fs.unlinkSync(imagePath);
    }

    const name = await uploadFile(req.files,undefined, collection);
    model.img = name;
    await model.save();

    res.json({id, collection, model});
}

const getImage = async (req, res = response) => {
    const { id, collection} = req.params;

    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model) {return res.status(400).json({msg:`Not exist user with id ${id}`})}
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model) {return res.status(400).json({msg:`Not exist product with id ${id}`})};
            break;
        default:
            return res.status(500).json({msg:'Not valitated yet'})
    }
    if(model.img){
        const imagePath = path.join(__dirname, '../uploads', collection, model.img );
        if ( fs.existsSync(imagePath) ) return res.sendFile(imagePath);
    }
    const imagePath = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(imagePath);
};

module.exports = {
    loadFile,
    updateImage,
    getImage
}
