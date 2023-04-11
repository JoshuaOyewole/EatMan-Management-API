const express = require('express');
const router = express.Router();
const {
    eod
} = require("../../controllers/salesRecord");

/* EOD */
router.get('/', eod)

//GET A SPECIFIC Record

//router.post('/date',  getTransactionByDate);

module.exports = router;