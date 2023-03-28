const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categories");
const { existCategoryById } = require("../helpers/db-validators");

const router = Router();

// get all categories - public
router.get('/', getCategories);

// get one category - public
router.get('/:id', [
    check('id', 'Is not a MongoId valid').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], getCategory);

// create category - private - all people with a valid token
router.post('/', [
    // ToDo: when I arrived to home, please uncomment validateJWT
    // validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory);

// update category - private - all people with a valid token
router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existCategoryById),
    validateFields
], updateCategory);

// delete category - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a MongoId valid').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], deleteCategory);



module.exports = router;
