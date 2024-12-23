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
    try {
        const {email, password} = req.body;

        const token = await User.validatePasswordAndGenerateToken(email, password);
        
        res.cookie('token', token);
        return res.redirect('/');
    } catch (error) {
        return res.render('signin', {
            error:"Invalid Email or Password!",
        })
    }
})

router.post('/signup', async(req, res)=>{
    try{
        const {fullName, email, password} = req.body;
        if(!fullName||!email||!password) return res.redirect('/user/signup');
        await User.create({
            fullName,
            email,
            password
        });

        return res.redirect('/user/signin');
    }catch(error){
        return res.render('signup', {
            error:"Something went wrong!",
        })
    }
})

router.get('/logout', (req, res)=>{
    return res.clearCookie('token').redirect('/');
})

module.exports = router;
