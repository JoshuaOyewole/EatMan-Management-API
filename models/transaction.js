const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    orders: [
      {
        quantity: Number,
        meal: String,
        price: Number,
        totalAmount: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    payment_status: {
      type: String,
      enum: {
        values: ["Pending", "Successful", "Declined"],
        message: "{VALUE} is not supported",
      },
      default: "Successful",
    },
    payment_medium: {
      type: String,
      enum: {
        values: ["cash", "pos", "online", "transfer"],
        message: "{VALUE} is not supported",
      },
      default: "cash",
    },
    authorizedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
