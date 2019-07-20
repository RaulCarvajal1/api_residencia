const bodyParser = require('body-parser');
const express = require('express');
const wagner = require('wagner-core');

require('./models/models')(wagner);

//Importar Router
const servicesRouter = require('./routers/services.router')(wagner);
const usersRouter = require('./routers/users.router')(wagner);
const plantsRouter = require('./routers/plants.router')(wagner);
const emgsRouter = require('./routers/emgs.router')(wagner);
const configsRouter = require('./routers/config_fecha.router')(wagner);

// Configurando servidor express
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization, Content-Length,');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use("/service",servicesRouter);
app.use("/user",usersRouter);
app.use("/plant",plantsRouter);
app.use("/emg",emgsRouter);
app.use("/config",configsRouter);

module.exports = app;