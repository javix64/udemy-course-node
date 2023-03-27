const Role = require('../models/role');
const {validationResult} = require('express-validator');
const User = require('../models/user');

const isValidRole = async (rol = '')=>{
    const existRol = await Role.findOne({ rol });
    if (!existRol) throw new Error(`Role ${ rol } is not registerd in DB`)
}
const emailExist = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if(existEmail) throw new Error(`Email: ${email} is already in use.`)
}

const existUserById = async (id = '') => {
    const existId = await User.findById( id );
    if(!existId) throw new Error(`Id: ${id} does not exist.`)
}

module.exports= {
    isValidRole,
    emailExist,
    existUserById
}