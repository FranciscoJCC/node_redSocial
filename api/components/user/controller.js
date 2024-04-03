const {v4 : uuidv4 } = require('uuid');
const auth = require('../auth');
const TABLE = 'users';


module.exports = function(injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('./../../../store/dummy');
    }
    
    function list(){
        return store.list(TABLE);
    }

    function get(id){
        
        return store.get(TABLE, id);
    }

    async function post(data){
        const user =  {
            name: data.name,
            username: data.username
        };

        if(data.password || data.username){
            await auth.upsert({
                username: user.username,
                password: data.password,
            })
        }

        return store.upsert(TABLE, user);
    }

    function remove(id){
        return store.remove(TABLE, id);
    }

    return {
        list,
        get,
        post,
        remove
    }
}