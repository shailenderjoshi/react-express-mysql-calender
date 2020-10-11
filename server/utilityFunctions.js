require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// FORMAT OF TOKEN
// Authorization: Bearer <accessToken>

function verifyToken(req, res, next) {
    // get auth header value
    const authHeader = req.headers['authorization'];

    // check header is defined
    const token = authHeader && authHeader.split(' ')[1];
    // Forbidden Error
    if( token == null ) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, userPayload) => { 
        if(error) return res.sendStatus(403);
        req.userPayload = userPayload;
        next();
    })
}


// Generate Access Token
const generateAccessToken = (payloadData) => {
    return jwt.sign(payloadData, process.env.ACCESS_TOKEN_SECRET);
}

// Generate Refresh Token
const generateRefreshToken =  (payloadData) => {
    return jwt.sign(payloadData, process.env.REFRESH_TOKEN_SECRET);
}

// Password Encryption
// async function encryptPassword(password) {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
// }

module.exports = {
    verifyToken : verifyToken,
    generateAccessToken : generateAccessToken,
    generateRefreshToken : generateRefreshToken,
    //encryptPassword : encryptPassword,
    
}