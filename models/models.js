const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
    //Conexión a la base de datos
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/emg', { useNewUrlParser: true });

    wagner.factory('db', ()=> mongoose);

    const Emg = require('./emg.model');
    const Plant = require('./plants.model');
    const Service = require('./services.model');
    const User = require('./users.model');
    const Config = require('./config_fecha.model');

    const models = {
        User,
        Emg,
        Plant,
        Service,
        Config
    }
    _.each(models, (v, k)=> {
        wagner.factory(k, ()=>v);
    });
}