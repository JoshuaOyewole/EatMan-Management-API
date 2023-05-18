const express = require ('express');
const router = express.Router();
const { addtoCart, deleteFromCart, getCartItmes, updateCart } = require("../../controllers/cart");
const { verifyStaff, verifyAdmin, verifyToken } = require('../../middleware/verifyToken');



//GET ALL Meal
router.get('/', verifyToken, getCartItmes)


//ADD A Meal
router.post('/', verifyToken,addtoCart)


//UPDATE Meal
router.patch('/:id', verifyToken,updateCart)
  

 //DELETE AN Meal
 router.delete('/:id',verifyToken, deleteFromCart)

 module.exports = router;