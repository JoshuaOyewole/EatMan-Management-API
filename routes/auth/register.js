const express = require('express');
const router = express.Router();
const {register,UserRegister } = require("../../controllers/auth");

//REGISTER STAFF
router.post('/', register)
router.post('/user', UserRegister)
  

module.exports = router;