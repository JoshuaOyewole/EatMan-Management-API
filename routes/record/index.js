const express = require('express');
const router = express.Router();
const {
    //deleteRecord,
    getRecord,
    //updateRecord,
    getRecords
} = require("../../controllers/salesRecord");
const {verifyStaff } = require('../../util/verifyToken');


//GET A SPECIFIC Record

router.get('/:id', verifyStaff, getRecord).get('/', verifyStaff, getRecords);


//GET ALL RecordS

//UPDATE A Record INFO

//DELETE A Record


//After research om 8/8/22, --> I discovered no need of doing that. It can be bypass by simply adding the verifyAdmin middleware...


module.exports = router;