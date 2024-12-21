const dotenv = require('dotenv').config();
const path = require("path");
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute');

const PORT = process.env.PORT||8001;

mongoose.connect("mongodb://localhost:27017/bloggit").then(e=>console.log("MongoBD Connected..."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use('/user',userRoute);

app.get('/', (req, res)=>{
    return res.render('home');
})

app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
})