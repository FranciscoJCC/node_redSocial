const express = require('express');
/* const authSecure = require('./secure'); */
const response = require('../../../network/response');
const postController = require('./index');

const router = express.Router();

router.get('/', function (req, res) {
    postController.list().then((list) => {
        response.success(req,res, list, 200);
    }).catch((error)  => {
        response.error(req, res, error.message, 500);
    });
    
});

module.exports = router;