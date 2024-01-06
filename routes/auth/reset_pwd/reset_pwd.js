const express = require("express");
const { resetPWD } = require("../../../controllers/auth");

const router = express.Router();

//RESET PASSWORD
router.post("/", resetPWD);

module.exports = router;
