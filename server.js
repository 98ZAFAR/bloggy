const dotenv = require('dotenv').config();
const path = require("path");

const express = require('express');
const app = express();

const PORT = process.env.PORT||8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    return res.render('home');
})

app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
})