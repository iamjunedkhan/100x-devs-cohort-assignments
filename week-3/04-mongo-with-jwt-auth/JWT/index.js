const jwt = require('jsonwebtoken');
const secret = 'mySecret';
const signJWT = (data) => {
    let token = jwt.sign(data, secret, { expiresIn: 12 });
    return token;
}

const decodeJWT = (token) => {
    let data = jwt.decode(token);
    if (data == null) {
        return { success: false, data };
    }
    return { success: true, data };

}

const verifyJWT = (token) => {
    let decoded = decode(token);
    if (!decoded.success) {
        return { success: false };
    }
    try {
        let verify = jwt.verify(token, secret);
        return { success: true, data: verify };
    } catch (err) {
        return { success: false, data: err.message };
    }
}

module.exports={
    signJWT,
    decodeJWT,
    verifyJWT
}