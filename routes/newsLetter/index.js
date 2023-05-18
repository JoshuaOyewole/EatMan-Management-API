const express = require ('express');
const router = express.Router();

const { subscribe,getAllMails, unsubscribe } = require("../../controllers/newsLetter");

router.get('/',getAllMails).post('/',subscribe).delete('/id',unsubscribe)

module.exports = router;