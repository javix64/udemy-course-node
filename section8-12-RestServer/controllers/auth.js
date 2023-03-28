const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        // Check if email exist
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User / Password is wrong - email' });

        // Check if user is active
        if (!user.status) return res.status(400).json({ msg: 'User / Password is not correct - status:false' });

        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({ msg: 'User / Password is not correct - password' });

        // Generate JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })

    } catch (err) {
        console.error('error Login controller', err)
        return res.status(500).json({
            msg: 'Talk with webmaster'
        })
    }

};

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {

        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });
        if (!user) {
            console.info('entro?')
            // Create user if is not registered;
            const data = {
                name,
                email,
                img,
                password: 'somePassword',
                google: true,
                rol: 'USER_ROLE'
            };
            user = new User(data);
            await user.save();
        }
        // If user is already registered

        // If user is in DB
        if (!user.status) return res.status(401).json({ msg: 'Talk with webmaster, user blocked' });
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (err) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not verified',
            err
        })
    }


}


module.exports = {
    login,
    googleSignIn
}