const mongoose = require('mongoose');

//Building schema for services
const servicesSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    start : {
        type :  String
    },
    finish : {
        type :  String
    },
    status : {
        type :  Number, 
        required : true
    },
    client : {
        type :  mongoose.Schema.Types.ObjectId
    },
    tecnico : {
        type :  mongoose.Schema.Types.ObjectId
    },
    emg : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true
    },
    observ : {
        trabajo_realizado : {
            type : String,
            default : ""
        },
        comentarios : {
            type : String,
            default : ""
        },
        recomendaciones : {
            default : "",
            type : String
        }
    },
    signature : { 
        data: Buffer, 
        contentType: String 
    },
    score : { 
        type : Number
    }
});

//Setting collection name and model
const servicesModel = mongoose.model('Services', servicesSchema, 'services');

module.exports = servicesModel;