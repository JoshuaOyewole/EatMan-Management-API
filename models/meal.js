const mongoose = require ('mongoose');

const mealSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    imageURL:{
        type: String,
    },
    calories:{
        type: String,
    },
    qty:{
        type: Number,
        required:true,//Alert if it has reducesd to a certain level and also less than 0 means Out of Stock and users should be unable to ADD to CART
    },
    category:{
        type: String,
        required: true
    },
},  {timestamps:true});   

module.exports = mongoose.model('Meal', mealSchema);
