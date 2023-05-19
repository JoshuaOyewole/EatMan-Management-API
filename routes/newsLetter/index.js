const express = require ('express');
const router = express.Router();

const { subscribe,getAllMails, unsubscribe } = require("../../controllers/newsLetter");
const { verifyStaff,verifyUser } = require('../../middleware/verifyToken');

router.get('/',verifyStaff,getAllMails).post('/',subscribe).delete('/id',verifyUser,unsubscribe)

module.exports = router;