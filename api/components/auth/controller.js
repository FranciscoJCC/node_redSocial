const bcrypt = require('bcrypt');
const auth = require('./../../../auth');
const TABLE = 'auth';

module.exports = function (injectedStore){
    let store = injectedStore;

    if(!store){
        store = require('./../../../store/dummy');
    }

    async function login(username, password){
        const data = await store.query(TABLE, { username: username });
        
        const isMatch = await bcrypt.compare(password, data.password);

        //Si las contraseñas no coinciden, retornamos un error
        if(!isMatch){
            throw new Error('Invalid Information');
        }
        
        
        //Retornamos token 
        return auth.sign(data);
        
    }

    async function upsert(data){
        const authData = {
            id: data.id
        };

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.upsert(TABLE, authData);
    }


    return {
        upsert,
        login
    };
}