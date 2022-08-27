const express = require('express');
const router = express.Router();
const {
    deleteStaff,
    getStaff,
    updateStaff,
    getAllStaffs
} = require("../../controllers/staff");
const { verifyAdmin, verifyStaff } = require('../../util/verifyToken');


//GET A SPECIFIC Staff

router.get('/:id', verifyStaff, getStaff).patch('/:id', verifyStaff, updateStaff).delete('/:id', verifyAdmin, deleteStaff).get('/', getAllStaffs)

//GET ALL StaffS


//UPDATE A Staff INFO

//DELETE A Staff

// 06/08/22 --> This route should be inside the admin section because only an admin should be able to delete a Staff

//After research om 8/8/22, --> I discovered no need of doing that. It can be bypass by simply adding the verifyAdmin middleware...


module.exports = router;