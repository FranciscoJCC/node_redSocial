const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

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

        if(decoded.id !== owner) {
            throw new Error('Don´t permission this action');
        }


    }
}

function getToken(auth){
    if(!auth){
        throw new Error('Token is required');
    }

    if(auth.indexOf('Bearer ') === -1 ){
        throw new Error('Token format is invalid')
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