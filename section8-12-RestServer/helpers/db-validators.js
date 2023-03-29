const { User, Category, Role, Product } = require('../models');
const { validationResult } = require('express-validator');

const isValidRole = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) throw new Error(`Role ${rol} is not registerd in DB`)
}
const emailExist = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) throw new Error(`Email: ${email} is already in use.`)
}

const existUserById = async (id = '') => {
    const existId = await User.findById(id);
    if (!existId) throw new Error(`User Id: ${id} does not exist.`)
}

const existCategoryById = async (id = '') => {
    const existId = await Category.findById(id);
    if (!existId) throw new Error(`Category Id: ${id} does not exist.`)
}

const existProductById = async (id = '') => {
    const existId = await Product.findById(id);
    if (!existId) throw new Error(`Product Id: ${id} does not exist.`)
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    existCategoryById,
    existProductById
}
