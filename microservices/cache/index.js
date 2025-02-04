const express = require('express');

const config = require('../../config');
const router = require('./network');

const app = express();

app.use(express.json());

//RUTAS
app.use('/', router);

app.listen(config.cacheService.port, () => {
    console.log('Servicio redis escuchando en', config.cacheService.port);
});