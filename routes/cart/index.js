const express = require ('express');
const router = express.Router();
const { addtoCart, deleteFromCart, getCartItmes, updateCart } = require("../../controllers/cart");
const {verifyUser } = require('../../middleware/verifyToken');



//GET ALL CART ITEMS
router.get('/', verifyUser, getCartItmes)


//ADD A MEAL TO CART
router.post('/', verifyUser,addtoCart)


//UPDATE CART
router.patch('/:id', verifyUser,updateCart)
  

 //DELETE A MEAL FROM CART
 router.delete('/:id',verifyUser, deleteFromCart)

 module.exports = router;