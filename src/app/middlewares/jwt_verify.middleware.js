const jwt = require('jsonwebtoken');
require('dotenv').config();
const createError = require('http-errors');

// Verify access token
function verifyAccessToken(req, res, next) {
    const token = req.cookies.accessToken;
    if(!token) {
        throw createError.Unauthorized();
    }
    const key_access_secret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, key_access_secret, (err, payload) => {
        if(err) return next(err);
        req.payload = payload;
        next();
    })
}

module.exports = { verifyAccessToken }