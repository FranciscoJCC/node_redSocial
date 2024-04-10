const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

//Conexión
let conecction;

function handleConection(){
    conecction = mysql.createConnection(dbConfig);

    conecction.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(handleConection, 2000);
        }else{
            console.log('DB Coneccted!');
        }
    });

    conecction.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConection();
        }else{
            throw err;
        }
    })
}

handleConection();

async function list(table){
    return new Promise( (resolve, reject) => {
        conecction.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) return reject(err);

            resolve(data);
        })
    });
}

async function get(table, id){
    return new Promise( (resolve, reject) => {
        conecction.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if(err) return reject(err);

            resolve(data);
        })
    });
}

function insert(table, data){
    return new Promise( (resolve, reject) => {
        conecction.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err) return reject(err);

            resolve(result);
        })
    });
}

function update(table, data){
    return new Promise( (resolve, reject) => {
        conecction.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if(err) return reject(err);

            resolve(result);
        })
    });
}

function follow(data){
    return new Promise( (resolve, reject) => {
        conecction.query(`INSERT INTO user_follow SET ?`, data, (err, result) => {
            if(err) return reject(err);

            resolve(result);
        })
    });
}

async function upsert(table, data) {
    
    if(data && data.id){
        return update(table, data);
    }else{
        return insert(table, data);
    }
}

async function query(table, query, join){
    let joinQuery = '';
    console.log('JOIN:::', join);
    
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        conecction.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if(err) return reject(err);

            let output = res
            //output
            if(!join){
                output = {
                    id: res[0].id,
                    username: res[0].username,
                    password: res[0].password
                }
            }
            
            resolve(output, null);
        });
    })
}

module.exports = {
    list,
    get,
    upsert,
    follow,
    query
};
