const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Add Name'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'please Add Email'],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'Please Add PAswword'],
        min:6,
        ma:32,
    },
    role:{
        type:String,
        default:"user",
    }

},{
    timestamps:true,
});

module.exports = mongoose.model('User',userSchema);