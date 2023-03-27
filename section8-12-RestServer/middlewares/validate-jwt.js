const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    
    if(!token) return res.status(401).json({msg:'No token provided'});


    try{
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        // read the user that is from uid;
        const user = await User.findById(uid);
        if (!user) return res.status(401).json({msg:'Token not valid - User not exist'});
        // check if status of user is true
        if(!user.status) return res.status(401).json({msg:'Token not valid - status:false'});
        req.user = user;

        next();


    }catch(err){
        console.info(err);
        res.status(401).json({msg:'Token not valid'});
    }


}

module.exports = {
    validateJWT
}