const express = require('express');
const router = express.Router();
const {
    getTransactionByDate
} = require("../../controllers/salesRecord");

/* const {verifyStaff } = require('../../util/verifyToken'); */


//GET A SPECIFIC Record

router.post('/date',  getTransactionByDate);

module.exports = router;