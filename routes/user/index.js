const express = require('express');
const router = express.Router();
const {
    getUser, getAllUsers, updateUser, deleteUser
} = require("../../controllers/user");
const { verifyAdmin,verifyUser } = require('../../middleware/verifyToken');


//GET A SPECIFIC User
//GET ALL Users
//UPDATE A User INFO
//DELETE A User

router.get('/:id',  verifyUser, getUser).patch('/:id',verifyUser, updateUser).delete('/:id', verifyUser, deleteUser).get('/', verifyAdmin, getAllUsers)





module.exports = router;