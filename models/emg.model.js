const mongoose = require('mongoose');

//Building schema for EMG Machine
const emgSchema = new mongoose.Schema({
    qr : { 
        data: Buffer, 
        contentType: String 
    },
    info : {
        type : { type: String},
        model : { type: String, require : true},
        description : { type : String}
    },
    client : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true
    },
    plant : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true
    },
    line : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true
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
const emgModel = mongoose.model('Emg', emgSchema, 'emgs');

module.exports = emgModel;
