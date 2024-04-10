const express = require('express');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('./../network/errors');

const app = express();

//middleware para recibir datos
app.use(express.json());

//Rutas
app.use('/api/posts', post);

//Middleware para errores
app.use(errors);

app.listen(config.post.port, () => {
    console.log('Api escuchando en el puerto: ', config.post.port);
});