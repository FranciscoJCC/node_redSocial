const auth = require('./../../../auth');

module.exports = function checkAuth(action) {

    function middleware(req, res, next){
        switch(action){
            case 'update':
                const ownerId = req.body.id;
                auth.check.own(req,ownerId);
                next();
                break; 

            case 'follow':
                auth.check.logged(req);
                next();
                break;

            default: 
                next();
        }
    }

    return middleware;
}