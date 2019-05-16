const bodyParser = require('body-parser');
const express = require('express');
const wagner = require('wagner-core');

require('./models/models')(wagner);

//Importar Router
const servicesRouter = require('./routers/services.router')(wagner);
//const clientRouter = require('./routers/clients.router')(wagner);
const usersRouter = require('./routers/users.router')(wagner);

// Configurando servidor express
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/machine",servicesRouter);
//app.use("/client",clientRouter);
app.use("/user",usersRouter);

module.exports = app;