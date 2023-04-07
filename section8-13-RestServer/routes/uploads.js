const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileToUpload } = require('../middlewares');
const { loadFile, updateImage, getImage} = require("../controllers/uploads");
const {allowCollections} = require("../helpers");

const router = Router();

router.post('/', validateFileToUpload, loadFile);

router.put('/:collection/:id', [
    validateFileToUpload,
    check('id', 'Id must be mongoID').isMongoId(),
    check('collection').custom(c=>allowCollections(c, ['users', 'products'])),
    validateFields
], updateImage);

router.get('/:collection/:id',[
    check('id', 'Id must be mongoID').isMongoId(),
    check('collection').custom(c=>allowCollections(c, ['users', 'products'])),
    validateFields],
    getImage)



module.exports = router
