const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const createToken = (user)=>{
    const payload = {
        _id:user._id,
        email:user.email,
        role:user.role,
        profileImgUrl:user.profileImgUrl
    };

    const token = jwt.sign(payload, secret, {expiresIn:'30m'});

    return token;
};

const validateToken = (token)=>{
    const payload = jwt.verify(token, secret);
    return payload;
};

module.exports = {
    createToken,
    validateToken
}