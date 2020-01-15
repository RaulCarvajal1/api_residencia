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
    created : {
        type : Date,
        required : true,
        default : Date.now
    },
    monto : {
        type : Number,
        required : true,
        default : 0
    },
    monto_actual : {
        type : Number,
        required : true
    },
    conceptos : [
        {
            codigo : {
                type : String,
                required : true
            },
            descripcion : {
                type : String,
                required : true
            },
            precio : {
                type : Number,
                required : true
            }
        }
    ],
    divisa : {
        type : String,
        required : true
    }
});

//Setting collection name and model
const contratoModel = mongoose.model('Agreements', contratoSchema, 'agreements');

module.exports = contratoModel;