const express = require('express');
const response = require('./../../../network/response');
const userController = require('./controller');

const router = express.Router();

router.get('/', function (req, res) {
    const list = userController.list();
    response.success(req,res, list, 200);
})

module.exports = router;