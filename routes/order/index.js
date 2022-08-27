const express = require("express");
const { addOrder,getOrders,getOrder,updateOrder,deleteOrder } = require("../../controllers/order");
const { verifyStaff } = require("../../util/verifyToken");
const router = express.Router();

//GET LIST OF ALL ORDER
router.get('/', verifyStaff, getOrders)

//GET A SPECIFIC ORDER
router.get('/:id', verifyStaff,getOrder)

 //UPDATE A ORDER
router.patch('/:id', updateOrder)

 //DELETE A ORDER
router.delete('/:id', deleteOrder)

//CREATE A ORDER
router.post('/', addOrder)


module.exports = router;



