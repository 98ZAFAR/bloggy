const { validateToken } = require("../services/authenticateUser");


const checkForAuthentication = (cookieName)=>{
    return (req, res, next)=>{
        const cookie = req.cookies[cookieName];
        if(!cookie) return next();

        try{
            const payload = validateToken(cookie);
            req.user = payload;
            return next();
        }catch(error){};

        return next();
    }
}

module.exports = checkForAuthentication;