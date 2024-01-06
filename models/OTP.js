const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const OTPModelSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", OTPModelSchema);
