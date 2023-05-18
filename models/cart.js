const mongoose = require ('mongoose');

const cartSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
    },
    fid:{
        type: String,
        required:true,
    },
    uid:{
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
},  {timestamps:true});   

module.exports = mongoose.model('CartItems', cartSchema);
