const fetch = require('node-fetch');

createRemoteDB = (host, port) => {
    const URL = `http://${host}:${port}`;

    async function list(table) {
        const response = await fetch(`${URL}/${table}`);
        const data = await response.json();
        return data?.body;
    }

    async function get(table, id){
        const response = await fetch(`${URL}/${table}/${id}`);
        const data = await response.json();
        return data?.body;      
    }

    async function upsert(table, data){
        let body = JSON.stringify(data);
        const response = await fetch(`${URL}/${table}/${body}`);
        const resp = await response.json();
        return resp?.body;
    }

    /*function query(table, query, join){

    } */

    return {
        list,
        get,
        upsert,
    }
}

module.exports = createRemoteDB;
