const mongoose = require ('mongoose');

const salesRecordSchema = new mongoose.Schema({
    date:{
        type: Date,
        unique:true,
        required:true,
    },
    totalAmount:{
        type: Number,
        required:true,
    },
    totalOrders:{
        type: Number,
        required:true,
    }
},  {timestamps:true});   

module.exports = mongoose.model('salesRecord', salesRecordSchema);
