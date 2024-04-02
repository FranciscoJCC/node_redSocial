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

function list(table){
    return new Promise( (resolve, reject) => {
        conecction.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) return reject(err);

            resolve(data);
        })
    });
}

module.exports = {
    list,
};
