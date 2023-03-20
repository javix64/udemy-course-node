const { request, response } = require('express');

const usersGet = (req = request, res=response) => {
    res.status(200).json({
        msg:'get API - controller'
    })
};

const usersPost =(req = request, res=response) => {
    const { username, age } = req.body;
    res.status(200).json({
        msg:'post API - controller',
        username,
        age
    })
};
const usersPut = (req = request, res=response) => {
    const id = req.params.id;
    // Every time that you want the queries that the user do, you need to call req.query method.
    const { page=1, limit=10 } = req.query;
    res.status(200).json({
        msg:'put API - controller',
        id,
        page,
        limit
    })
};
const usersPatch = (req = request, res=response) => {
    res.status(200).json({
        msg:'patch API - controller'
    })
};
const usersDelete = (req = request, res=response) => {
    res.status(200).json({
        msg:'delete API - controller'
    })
};


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}