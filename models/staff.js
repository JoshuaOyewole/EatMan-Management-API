const mongoose = require ('mongoose');

const staffSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: true,
        maxLength:200,
    },
    lastname: {
        type: String,
        required: true,
        maxLength:200,
    },
    email:{
        type: String,
        required: true,
        maxLength: 200,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        maxLength: 200,
    },
    phone: {
        type: Number,
        required: true,
        unique:true,
    },
    gender: {
        type: String,
        required: true,
        maxLength:50,
	enum: {values:['Male', 'Female'], message:  '{VALUE} is not supported'}
    },
    address:{
        type:String,
        maxLength:200,
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    homeAddress:{
        type:String,
    },
    dob:{
        type:Date,
    }, 
   state:{
        type:String,
    },
    lga:{
        type:String,
    },
    passport:{
        type:String
    },
},{timestamps:true});   

module.exports = mongoose.model('staff', staffSchema);
