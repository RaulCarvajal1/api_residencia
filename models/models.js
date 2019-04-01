const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
    //Conexión a la base de datos
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/emg', { useNewUrlParser: true });

    wagner.factory('db', ()=> mongoose);

    const Machine = require('./machines.model');
    const User = require('./users.model');
    const Clients = require('./clients.model');

    const models = {
        Machine,
        User,
        Clients
    }
    _.each(models, (v, k)=> {
        wagner.factory(k, ()=>v);
    });
}