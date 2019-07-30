const mongoose = require('mongoose');

//Building schema for Configuration
const tiposSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
});

//Setting collection name and model
const tipoModel = mongoose.model('Tipos', tiposSchema, 'tipos');

module.exports = tipoModel;