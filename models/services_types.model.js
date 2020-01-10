const mongoose = require('mongoose');

//Building schema for Configuration
const tiposSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    }
});

//Setting collection name and model
const tipoModel = mongoose.model('Tipos', tiposSchema, 'tipos');

module.exports = tipoModel;