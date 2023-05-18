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
   
    rank:{
        type:String,
        enum: {values:['admin', 'staff'], message:  '{VALUE} is not allowed'},
        default:'staff'
    },
    homeAddress:{
        type:String,
        maxLength:200,
        required:true
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
