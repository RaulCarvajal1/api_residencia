const bodyParser = require('body-parser');
const express = require('express');
const wagner = require('wagner-core');

require('./models/models')(wagner);

//Importar productRouter
const productRouter = require('./routers/machines.router')(wagner);
const clientRouter = require('./routers/clients.router')(wagner);
const usersRouter = require('./routers/users.router')(wagner);

// Configurando servidor express
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/machine",productRouter);
app.use("/client",clientRouter);
app.use("/user",usersRouter);

module.exports = app;