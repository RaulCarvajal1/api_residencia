const mongoose = require('mongoose');

//Building schema for plantas
const plantsSchema = new mongoose.Schema({
    name : {
        type : String
    },
    code : {
        type : String
    },
    client : {
        type :  mongoose.Schema.Types.ObjectId
    },
    boss : {
        name : {
            type : String
        },
        email : {
            type : String,
            match :  /.+@.+\..+/,
            lowercase : true
        },
        phone : { 
            type : String,
        }
    },
    lines : [
        {
            code : {
                type : String,
                required : true
            },
            desc : {
                type : String,
                required : true
            }
        }
    ],
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
const plantsModel = mongoose.model('Plants', plantsSchema, 'plants');

module.exports = plantsModel;