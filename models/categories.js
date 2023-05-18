const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name:{type:String, required:true},
    urlParam:{type:String, required:true},
    icon:{type:String,}
},{timestamps:true});

module.exports = mongoose.model('Categories', categoriesSchema);