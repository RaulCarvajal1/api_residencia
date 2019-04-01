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
    person : {
        name : {
            type : String,
            required :true
        },
        email : {
            type : String,
            required : true,
            match :  /.+@.+\..+/,
            lowercase : true
        },
        avatar : { 
            data: Buffer, 
            contentType: String 
        }
    },
    meta : {
        active : {
            type : Boolean,
            required : true,
            default : true
        },
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