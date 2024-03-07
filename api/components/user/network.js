const express = require('express');
const response = require('./../../../network/response');
const userController = require('./index');

const router = express.Router();

router.get('/', function (req, res) {
    userController.list().then((list) => {
        response.success(req,res, list, 200);
    }).catch((error)  => {
        response.error(req, res, error.message, 500);
    });
    
});

router.get('/:id', function (req, res) {
    userController.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });
});

module.exports = router;