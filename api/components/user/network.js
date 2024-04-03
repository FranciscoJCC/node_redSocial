const express = require('express');
const authSecure = require('./secure');
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

/* FOLLOW */
router.post('/follow/:id',
    authSecure('follow'), 
    function (req, res, next) {
        let id = req.params.id;
        
        userController.follow(req.user.id, parseInt(id))
            .then(data => {
                response.success(req, res, data, 201);
            }).catch(next);
    }
);

router.get('/:id', function (req, res) {
    userController.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });
});

router.post('/', function (req, res) {
    
    userController.post(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });
});

router.patch('/', 
    authSecure('update'),
    function (req, res) {
    
        userController.post(req.body)
            .then((user) => {
                response.success(req, res, user, 201);
            })
            .catch((error) => {
                response.error(req, res, error.message, 500);
            });
    }
);

router.delete('/:id', function (req, res){
    userController.remove(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });
});

module.exports = router;