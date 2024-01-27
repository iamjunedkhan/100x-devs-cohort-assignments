const { verifyJWT } = require("../JWT");
const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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

module.exports = adminMiddleware;