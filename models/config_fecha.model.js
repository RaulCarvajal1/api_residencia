const mongoose = require('mongoose');

//Building schema for Configuration
const fechaSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        default : "fecha"
    },
    value : {
        type : Boolean,
        require : true
    }
});

//Setting collection name and model
const fechaModel = mongoose.model('Fecha', fechaSchema, 'fecha');

module.exports = fechaModel;