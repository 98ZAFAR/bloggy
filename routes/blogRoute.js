const express = require('express');
const path = require('path');
const multer = require('multer');
const Blog = require('../models/blogModel');

const router = express.Router();

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/uploads');
    },
    filename:function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage:storage});

router.get('/add-new', (req, res)=>{
    return res.render('addBlog', {
        user:req.user
    });
});

router.get('/:id', async(req, res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    return res.render('blog', {
        user:req.user,
        blog,
    });
})

router.post('/', upload.single('coverImg'), async(req, res)=>{
    const{title, body} = req.body;
    
    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImgUrl:`/uploads/${req.file.filename}`,
    })
    return res.redirect(`/blog/${blog._id}`);
})

module.exports = router;