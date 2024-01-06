const express = require("express");
const { forgetPWD } = require("../../../controllers/auth");

const router = express.Router();

//FORGOTTEN PASSWORD
router.post("/", forgetPWD);
module.exports = router;
