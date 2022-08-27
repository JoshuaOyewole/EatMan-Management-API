const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema({
    name:{
            type: String, required:true
    },
    description:{
        type: String,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    status:{
        type:String,
        enum:{
            values:['pending', 'fulfilled','declined'],
            message:  '{VALUE} is not supported'
        },
        default:"pending"
    },
    qty:{
        type: Number,
        required: true,
    },
    authorizedBy:{
        type: String,
    },
},  {timestamps:true});   

module.exports = mongoose.model('order', orderSchema);
