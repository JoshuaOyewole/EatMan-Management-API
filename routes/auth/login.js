const express = require('express');
const router = express.Router();
const {login } = require("../../controllers/auth");

//LOGIN STAFF
router.post('/',  login)
  

module.exports = router;