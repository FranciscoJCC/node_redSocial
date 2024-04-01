const express = require('express');
const swaggerUi = require('swagger-ui-express');
const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('./../network/errors');

const app = express();

//middleware para recibir datos
app.use(express.json());

const swaggerDoc = require('./swagger.json');

//Rutas
app.use('/api/user', user);
app.use('/api/auth', auth);
//Documentación de API Swager
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//Middleware para errores
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto: ', config.api.port);
});