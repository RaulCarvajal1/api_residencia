const mongoose = require('mongoose');

//Building schema for Configuration
const contratoSchema = new mongoose.Schema({
    client : {
        type :  mongoose.Schema.Types.ObjectId
    },
    period : {
        start : {
            type : Date,
            require : true
        },
        open : {
            type : Boolean
        },
        end : { 
            type : Date
        }
    },
    description : {
        type : String,
        required : true,
        default : "Asistencia técnica a equipos EMG"
    },
    emgs : []
});

//Setting collection name and model
const contratoModel = mongoose.model('Agreements', contratoSchema, 'agreements');

module.exports = contratoModel;