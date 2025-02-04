const response = require('./response');

function errors(err, req, res, next){
    console.log(['Error'], err);
    const message = err.message || 'Error intern'; 
    const status = err.statusCode || 500;

    response.error(req,res, message, status);
}

module.exports = errors;