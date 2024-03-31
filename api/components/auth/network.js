const express = require('express');

const response = require('./../../../network/response');
const authController = require('./index');

const router = express.Router();

router.post('/login', function(req, res){
    
    authController.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch( e => {
            response.error(req, res, "Invalid Information", 400);
        });
});

module.exports = router;

