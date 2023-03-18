const { request, response } = require('express');

const usersGet = (req = request, res=response) => {
    res.status(200).json({
        msg:'get API - controller'
    })
};

const usersPost =(req = request, res=response) => {
    res.status(200).json({
        msg:'post API - controller'
    })
};
const usersPut = (req = request, res=response) => {
    res.status(200).json({
        msg:'put API - controller'
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