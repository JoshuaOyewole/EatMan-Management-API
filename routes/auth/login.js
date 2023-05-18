const express = require('express');
const router = express.Router();
const {login, userLogin } = require("../../controllers/auth");

//LOGIN STAFF
router.post('/',  login);
router.post('/user',  userLogin);

module.exports = router;