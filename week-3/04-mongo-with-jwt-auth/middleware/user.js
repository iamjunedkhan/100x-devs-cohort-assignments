const { verifyJWT } = require("../JWT");
const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let username  = req.headers.username;
    let password  = req.headers.password;
    let token = req.headers.token;

    let verify = verifyJWT(token);

    if(verify.success){
        next();
    }else{
        return res.status(401).json({msg:"Authetication Failed: Wrong username or password"});
    }
}

module.exports = userMiddleware;