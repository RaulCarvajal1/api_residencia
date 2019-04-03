const mongoose = require('mongoose');

//Building schema for clients
const clientSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    contact : {
        name : {
            type : String,
            required :true
        },
        email : {
            type : String,
            required : true,
            match :  /.+@.+\..+/,
            lowercase : true
        }
    },
    address : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        required : true,
        default : true
    },
    meta : {
        registred_by : {
            type :  mongoose.Schema.Types.ObjectId,
            require : true
        },
        registred_date : {
            type : Date,
            required : true,
            default : Date.now
        }
    }
});

//Setting collection name and model
const clientModel = mongoose.model('Client', clientSchema, 'clients');

module.exports = clientModel;