const { Router } = require('express');
const router = Router();
const { usersGet,usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');

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

router.post('/', usersPost);

router.put('/:id', usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);


module.exports = router;