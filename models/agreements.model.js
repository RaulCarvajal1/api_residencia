const mongoose = require('mongoose');

//Building schema for Configuration
const contratoSchema = new mongoose.Schema({
    name : {
        type :  String
    },
    client : {
        type :  mongoose.Schema.Types.ObjectId
    },
    period : {
        start : {
            type : Date,
        },
        end : { 
            type : Date
        },
        single : {
            type : Boolean
        }
    },
    status : {
        type : Boolean,
        default : true
    },
    description : {
        type : String,
        required : true,
        default : "Asistencia técnica a equipos EMG"
    },
    emgs : [],
    emgsNames : []
});

//Setting collection name and model
const contratoModel = mongoose.model('Agreements', contratoSchema, 'agreements');

module.exports = contratoModel;