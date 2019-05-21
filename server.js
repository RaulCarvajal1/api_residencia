const bodyParser = require('body-parser');
const express = require('express');
const wagner = require('wagner-core');

require('./models/models')(wagner);

//Importar Router
const servicesRouter = require('./routers/services.router')(wagner);
const usersRouter = require('./routers/users.router')(wagner);
const plantsRouter = require('./routers/plants.router')(wagner);
const emgsRouter = require('./routers/emgs.router')(wagner);

// Configurando servidor express
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/service",servicesRouter);
app.use("/user",usersRouter);
app.use("/plant",plantsRouter);
app.use("/emg",emgsRouter);

module.exports = app;