const auth = require('./../../../auth');

module.exports = function checkAuth(action) {

    function middleware(req, res, next){
        switch(action){
            case 'update':
                const ownerId = req.body.id;
                
                break; 

            default: 
                next();
        }
    }

    return middleware;
}