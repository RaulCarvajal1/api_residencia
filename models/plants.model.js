const mongoose = require('mongoose');

//Building schema for plantas
const plantsSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    code : {
        type : String,
        required :true
    },
    client : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true
    },
    boss : {
        name : {
            type : String,
            required :true
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
            number : {
                type : Number,
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