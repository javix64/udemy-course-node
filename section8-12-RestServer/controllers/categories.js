const { request, response } = require('express');
const { Category } = require('../models');

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) return res.status(400).json({ msg: `Category ${categoryDB.name}, already exists.` })
    const data = {
        name,
        user: req.user._id,
        status: req.body.status,
    };

    const category = new Category(data);
    await category.save();
    res.status(201).json(category);
};

// getCategories - paginated - total - populate

const getCategories = async (req = request, res = response) => {
    const { limit = 5, start = 0 } = req.query;
    const query = { status: true }
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(start))
            .limit(Number(limit))
            .populate('user', 'name')
    ])
    return res.status(400).json({ categories, total });
}

// getCategory - populate {}

const getCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category
        .findById(id)
        .populate('user', 'name')

    res.json(category)
}


// updateCategory - name
// recibe el nombre y se actualiza

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json(category);
}

// deleteCategory - status=> false
const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });
    res.status(200).json(`Category  ${id}: deleted successfully`);
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
