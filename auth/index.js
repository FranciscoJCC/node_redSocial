const jwt = require('jsonwebtoken');
const CONFIG = require('../config');
const error = require('./../utils/error');

const secret = CONFIG.jwt.secret;

function sign(data){
    return jwt.sign(data, secret);
}

function verify(token){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error(error.message);
    }
    
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log('decoded: ', decoded);
        console.log('OWNER', owner);
        

        if(decoded.id !== owner) {
            throw error('Don´t permission this action', 401);
        }
    },
    logged: function(req){
        const decoded = decodeHeader(req);
    }
}

function getToken(auth){
    if(!auth){
        throw error('Token is required', 401);
    }

    if(auth.indexOf('Bearer ') === -1 ){
        throw error('Token format is invalid', 401);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
}