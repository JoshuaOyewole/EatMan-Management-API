const express = require("express");
const {
  addCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/foodCategories");
const { verifyStaff, verifyAdmin } = require("../../middleware/verifyToken");
const router = express.Router();

//GET LIST OF ALL Category
router.get("/", getAllCategory);

//GET A SPECIFIC Category
router.get("/:id", getCategory);

//UPDATE A Category
router.patch("/:id",verifyStaff, updateCategory);

//DELETE A Category
router.delete("/:id", verifyAdmin,deleteCategory);

//CREATE A Category
router.post("/", addCategory);

module.exports = router;
