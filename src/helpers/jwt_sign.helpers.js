'use strict'

const createError = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Encoded access token
function signAccessToken(userId) {
    return new Promise((resolve, reject) => {
        const payload = { userId };
        const key_access_secret = process.env.ACCESS_TOKEN_SECRET;
        const options = { expiresIn: '10s'};
        jwt.sign(payload, key_access_secret, options, (err, token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
}

module.exports = { signAccessToken };