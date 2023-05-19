const express = require("express");
const { order, orders, newOrder, updateOrder, deleteOrder } = require("../../controllers/order");
const { verifyStaff, verifyAdmin, verifyUser } = require("../../middleware/verifyToken");
const router = express.Router();

//GET LIST OF ALL ORDER
router.get('/', verifyStaff,orders)

//GET A SPECIFIC ORDER
router.get('/:id',verifyStaff, order)

 //UPDATE A ORDER
router.patch('/:id', verifyAdmin,updateOrder)

 //DELETE A ORDER
router.delete('/:id', verifyAdmin, deleteOrder)

//CREATE A ORDER
router.post('/', verifyUser,newOrder)


module.exports = router;



