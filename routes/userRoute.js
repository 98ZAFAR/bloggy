const {Router} = require('express');
const User = require('../models/userModel');
const router = Router();


router.get('/signin', (req, res)=>{
    return res.render('signin');
})

router.get('/signup', (req, res)=>{
    return res.render('signup');
})

router.post('/signin', async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.validatePassword(email, password);
    console.log(user);
    
    return res.redirect('/');
})

router.post('/signup', async(req, res)=>{
    const {fullName, email, password} = req.body;
    if(!fullName||!email||!password) return res.redirect('/user/signup');
    await User.create({
        fullName,
        email,
        password
    });

    return res.redirect('/user/signin');
})

module.exports = router;
