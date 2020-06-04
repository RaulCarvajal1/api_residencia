const mongoose = require('mongoose');

//Building schema for users
const modelsSchema = new mongoose.Schema({
    tipo : {
        type : String,
        required :true
    },
    modelo : {
        type : String,
        required : true
    },
    descripcion : {
        type : String,
        required : true
    },
    enlaces : {
        type : String,
        required : false
    }
});
 
//Setting collection name and model
const modelsModel = mongoose.model('Models', modelsSchema, 'models');

module.exports = modelsModel;