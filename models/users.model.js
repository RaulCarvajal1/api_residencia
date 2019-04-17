const mongoose = require('mongoose');

//Building schema for users
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true
    },
    password : {
        type : String,
        required :true
    },
    role : {
        type : Number,
        required : true
    },
    info : {
        name : {
            type : String,
            required :true
        },
        email : {
            type : String,
            match :  /.+@.+\..+/,
            lowercase : true
        },
        code : { 
            type : String,
        }
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
const userModel = mongoose.model('User2', userSchema, 'users2');

module.exports = userModel;