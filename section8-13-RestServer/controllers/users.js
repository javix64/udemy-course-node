const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

// If we setup with the first letter in upperCase: "User" allow you to create an instance of the model. It's a standard. This allow you to create a variable in lowerCase as I am doing in method: usersPost

const User = require('../models/user');
const { validationResult } = require('express-validator');


const usersGet = async (req = request, res = response) => {
    const { limit = 5, start = 0, end = 10 } = req.query;
    const query = { status: true };
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(start))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        users,
        total
    })

    // The main problem is that await is a blocker, 
    // so, in case, that you need a fast response, you need to use Promise.all
    // use only Promise.all in case that queries are independent.
    // Find all users
    // const users = await User.find(query)
    //     .skip(Number(start))
    //     .limit(Number(limit));
    // const total = await User.countDocuments(query);
};

const usersPost = async (req = request, res = response) => {
    // Let's filter the info that I obtain from frontend
    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save record
    await user.save();

    res.status(200).json({
        user
    })
};


const usersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...userData } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, userData);



    res.status(200).json({
        user,
    })
};

const usersPatch = (req = request, res = response) => {
    res.status(200).json({
        msg: 'patch API - controller'
    })
};

const usersDelete = async (req = request, res = response) => {
    const { id } = req.params;
    // Delete complete
    // const user = await User.findOneAndDelete(id);
    const userLogged = req.user;
    // Instead to delete the user, let's change status to false
    const user = await User.findByIdAndUpdate(id, { status: false });


    res.json({ user, userLogged })
};


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}