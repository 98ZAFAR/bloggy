const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const { createToken } = require('../services/authenticateUser');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    profileImgUrl:{
        type:String,
        default:"/images/defaultProfile.png"
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER"
    }
}, {timestamps:true});


userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;
    
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});

userSchema.static("validatePasswordAndGenerateToken", async function(email, password){
    const user = await this.findOne({email});

    if(!user) throw new Error('User Not Found!');

    const salt=user.salt;
    const hashedPassword = user.password;
    const givenPasswordHash =  createHmac("sha256", salt).update(password).digest("hex");

    if(hashedPassword!==givenPasswordHash) throw new Error('Incorrect Password!');
    else{
        const token = createToken(user);
        return token;
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;