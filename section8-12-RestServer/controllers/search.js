const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');


const allowCollections = [
    'users',
    'products',
    'categories',
    'role'
]

const searchUsers = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            result: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [{ status: true }]
    });

    res.json({
        result: users
    })
}

const searchCategories = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            result: (category) ? [category] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const categories = await Category.find({
        name: regex, status: true
    });

    res.json({
        result: categories
    })
}


const searchProducts = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const product = await Product
            .findById(term)
            .populate('category', 'name');
        return res.json({
            result: (product) ? [product] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const products = await Product
        .find({
            $or: [
                { name: regex },
                { price: regex },

            ],
            $and: [{ status: true }]
        }).populate('category', 'name');

    res.json({
        result: products
    })
}




const search = (req, res = response) => {
    const { collection, term } = req.params;
    if (!allowCollections.includes(collection)) res.status(400).json({ msg: `Collection ${collection} is not a valid one.` })

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);

            break;
        case 'products':

            break;

        default:
            res.status(500).json({ msg: `You did not do this search` })
    }

}

module.exports = { search };
