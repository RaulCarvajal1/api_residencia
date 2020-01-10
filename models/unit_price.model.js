const mongoose = require('mongoose');

//Building schema for users
const unitpriceSchema = new mongoose.Schema({
    unitprice : {
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
const unitpriceModel = mongoose.model('Unitprice', unitpriceSchema, 'unitprice');

module.exports = unitpriceModel;
