const express = require("express");
const router = express.Router();

const { verifyStaff } = require("../../middleware/verifyToken");
const {
  totalSale,
  topSellingProducts,
  getTotalOrdersLast7Days,
  getLastTransactions,
} = require("../../controllers/dashboardSummary");

//GET ALL Meal
router.get("/", verifyStaff, totalSale);
router.get("/top-selling", verifyStaff, topSellingProducts);
router.get("/getTotalOrdersLast7Days", verifyStaff, getTotalOrdersLast7Days);
router.get("/lastTransactions", verifyStaff, getLastTransactions);

module.exports = router;
