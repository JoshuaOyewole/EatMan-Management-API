const express = require("express");
const router = express.Router();
const {
  addStaff,
  deleteStaff,
  getStaff,
  updateStaff,
  getAllStaffs,
} = require("../../controllers/staff");
const { verifyStaff, verifyAdmin } = require("../../middleware/verifyToken");

//GET A SPECIFIC Staff
//GET ALL StaffS
//UPDATE A Staff INFO
//DELETE A Staff

router
  .get("/:id", verifyStaff, getStaff)
  .patch("/:id", verifyStaff, updateStaff)
  .delete("/:id", verifyAdmin, deleteStaff)
  .get("/", verifyStaff, getAllStaffs)
  .post("/", verifyAdmin, addStaff);

module.exports = router;
