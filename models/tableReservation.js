const mongoose = require('mongoose');

const tableReservationSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    persons:{
        type:Number,
        required:true
    },

},{timestamps:true});

module.exports = mongoose.model('TableReservation', tableReservationSchema);