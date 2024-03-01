exports.success = function (req, res, message = '', status = 200){
    //let statusCode = status || 200;
    //let statusMessage = message || '';

    res.status(status).send({
        error: false,
        status,
        body: message
    });
}

exports.error = function (req, res, message = 'Internal Server Error', status = 500){
    res.status(status).send({
        error: true,
        status,
        body: message
    });
}