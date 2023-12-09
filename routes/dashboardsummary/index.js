const express = require("express");
const router = express.Router();

const { verifyStaff } = require("../../middleware/verifyToken");
const { totalSale,topSellingProducts } = require("../../controllers/dashboardSummary");

//GET ALL Meal
router.get("/", verifyStaff, totalSale);
router.get("/top-selling", verifyStaff, topSellingProducts);

module.exports = router;
