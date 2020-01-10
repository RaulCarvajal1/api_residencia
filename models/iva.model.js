const mongoose = require('mongoose');

//Building schema for users
const ivaSchema = new mongoose.Schema({
    iva : {
        type : Number,
        required :true
    },
    last_mod : {
        type : Date,
        required : true,
        default : Date.now
    }
});
 
//Setting collection name and model
const ivaModel = mongoose.model('Iva', ivaSchema, 'iva');

module.exports = ivaModel;
