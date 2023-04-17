const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    orders: [{
        quantity: Number,
        meal: String,
        price: Number,
        totalAmount: Number
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    payment_date: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
        enum: {
            values: ['Pending', 'Successful', 'Declined'],
            message: '{VALUE} is not supported'
        },
        default: "Successful"
    },
    payment_medium: {
        type: String,
        enum: {
            values: ['Cash', 'POS', 'Online Payment', 'Transfer'],
            message: '{VALUE} is not supported'
        },
        default: "Cash"
    },
    authorizedBy: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema)