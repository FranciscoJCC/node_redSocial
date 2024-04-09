const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

//RUTAS
app.use('/api/v1', router);

app.listen(config.mysqlService.port, () => {
    console.log('Servicio mysql escuchando en', config.mysqlService.port);
});