const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
    //Conexión a la base de datos
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb+srv://raul:raulcrvjl@cluster0-fpsib.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

    wagner.factory('db', ()=> mongoose);

    const Emg = require('./emg.model');
    const Plant = require('./plants.model');
    const Service = require('./services.model');
    const User = require('./users.model');

    const models = {
        User,
        Emg,
        Plant,
        Service
    }
    _.each(models, (v, k)=> {
        wagner.factory(k, ()=>v);
    });
}