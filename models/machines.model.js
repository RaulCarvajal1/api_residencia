const mongoose = require('mongoose');

//Building schema for EMG Machine
const machineSchema = new mongoose.Schema({
    code : {
        type: String, 
        required: true
    },
    qr : { 
        data: Buffer, 
        contentType: String 
    },
    location : {
        plant : {
            type : String,
            required : true
        },
        line : {
            type : String,
            required : true
        }
    },
    client : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true
    },
    services : [
        {
            stype : {type : String},
            sdate : {type : Date, default : Date.now},
            sdescription : {type : String},
            stecnico : {
                type :  mongoose.Schema.Types.ObjectId,
                require : true
            },
            start : {type :  Date, required : true},
            sfinish : {type :  Date, required : true} 
        }
    ],
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
const machineModel = mongoose.model('Machine', machineSchema, 'machines');

module.exports = machineModel;