const { request, response } = require('express');
const { Product } = require('../models');

const createProduct = async (req = request, res = response) => {
    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) return res.status(400).json({ msg: `Product ${productDB.name}, already exists.` })

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
        status: req.body.status,
    };

    const product = new Product(data);
    await product.save();
    res.status(201).json(product);
};

// getProducts - paginated - total - populate

const getProducts = async (req = request, res = response) => {
    const { limit = 5, start = 0 } = req.query;
    const query = { status: true }
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(start))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ])
    return res.status(400).json({ products, total });
}

// getProduct - populate {}

const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product
        .findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    res.json(product)
}


// updateProduct - name
// recibe el nombre y se actualiza

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if (data.name) data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json(product);
}

// deleteProduct - status=> false
const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
    res.status(200).json(`Product  ${id}: deleted successfully`);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
