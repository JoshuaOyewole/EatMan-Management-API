const express = require("express");
const { order, orders, newOrder, updateOrder, deleteOrder } = require("../../controllers/order");
//const { verifyStaff } = require("../../util/verifyToken");
const router = express.Router();

//GET LIST OF ALL ORDER
router.get('/', orders)

//GET A SPECIFIC ORDER
router.get('/:id', order)

 //UPDATE A ORDER
router.patch('/:id', updateOrder)

 //DELETE A ORDER
router.delete('/:id', deleteOrder)

//CREATE A ORDER
router.post('/', newOrder)


module.exports = router;



