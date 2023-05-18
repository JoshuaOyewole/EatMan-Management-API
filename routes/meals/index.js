const express = require ('express');
const router = express.Router();
//const { verifyStaff, verifyAdmin } = require("../../util/verifyToken");

const {verifyToken, verifyStaff, verifyAdmin} = require('../../middleware/verifyToken')
const { addMeal, deleteMeal, getMeal, getAllMeal, updateMeal } = require("../../controllers/meal");



//GET ALL Meal
router.get('/', getAllMeal)

//GET A SPECIFIC Meal
router.get('/:id', verifyStaff, getMeal);
//TODO: Research and see how we can get it by Name instead of just ID ==> 26/08/2022 ==> 22:47

//ADD A Meal
router.post('/', verifyStaff, addMeal)
/* router.post('/',verifyAdmin, addMeal) */

//UPDATE Meal
router.patch('/:id', verifyStaff, updateMeal)
  

 //DELETE AN Meal
 router.delete('/:id', verifyStaff, deleteMeal)

 module.exports = router;