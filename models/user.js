const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    displayName: { type: String },
    phoneNumber: { type: String },
    photoURL: { type: String },
    providerId: { type: String },
    uid: { type: String },
    rank:{
      type:String,
      enum: {values:['admin', 'staff','user'], message:  '{VALUE} is not allowed'},
      default: 'user',
  },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);