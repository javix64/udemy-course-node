const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { existProductById, existCategoryById } = require("../helpers/db-validators");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/products");

const router = Router();

// get all categories - public
router.get('/', getProducts);

router.get('/:id', [
    check('id', 'Is not a MongoId valid').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
], getProduct);

// create category - private - all people with a valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is not a mongoId').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields
], createProduct);

// update category - private - all people with a valid token
router.put('/:id', [
    validateJWT,
    check('id').custom(existProductById),
    validateFields
], updateProduct);

// delete category - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a MongoId valid').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], deleteProduct);


module.exports = router;
