const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { existCategoryById } = require("../helpers/db-validators");

const router = Router();

// get all categories - public
router.get('/', () => {
    res.json('hey');
});


module.exports = router;
