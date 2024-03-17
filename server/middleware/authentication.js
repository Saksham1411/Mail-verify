const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next();
    }
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        // if(!payload.verify){
        //     throw new Error('User is not verify');
        // }
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
    }

}

module.exports = authentication;