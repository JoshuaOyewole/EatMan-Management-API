const express = require('express');
const router = express.Router();
const {
    eod,
    last7days
} = require("../../controllers/salesRecord");
const { verifyStaff } = require('../../middleware/verifyToken');

/* EOD */
router.get('/', verifyStaff , eod);
router.get('/last7days',verifyStaff, last7days);


module.exports = router;