const dotenv = require('dotenv').config();
const path = require("path");
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');

const cookieParser = require('cookie-parser');
const checkForAuthentication = require('./middleware/authentication');
const Blog = require('./models/blogModel');

const PORT = process.env.PORT||8001;

mongoose.connect("mongodb://localhost:27017/bloggit").then(e=>console.log("MongoBD Connected..."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));

app.use(express.urlencoded({extended:false}));

app.use('/user',userRoute);

app.use(cookieParser());
app.use(checkForAuthentication("token"));

app.get('/', async(req, res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home', {
        user:req.user,
        blogs:allBlogs,
    });
})

app.use('/blog',blogRoute);

app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
})