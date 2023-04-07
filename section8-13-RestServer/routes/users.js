const { Router } = require('express');
const router = Router();
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');
const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, userHasRole } = require('../middlewares/validate-roles');

const { validateFields, validateJWT, userHasRole, isAdminRole } = require('../middlewares');
const { isValidRole, emailExist, existUserById } = require('../helpers/db-validators');


// this is the route
// The callback is the controller that is handled by route.
// DON'T SET CONTROLLER INSIDE ROUTES => BAD PRACTICE 
// ---------
// router.get('/',(req, res)=>{
//     res.status(200).json({
//         msg:'Api - get endpoint'
//     })
// });
// ---------
// GOOD PRACTICE:
// router.get('/',require('./controllers/user'));
// ---------

router.get('/', usersGet);

router.post('/', [
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Password needs to be greather than 6 characters').isLength({ min: 6 }),
    check('rol').custom(isValidRole),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], usersPost);

router.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isValidRole),
    validateFields
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
    // the validation of JWT always need to be the first, in case that fails, the user cannot continue.
    validateJWT,
    isAdminRole,
    userHasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], usersDelete);


module.exports = router;