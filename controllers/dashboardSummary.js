const Transaction = require("../models/transaction");

// Function to get transaction summary for a date range
async function getTransactionSummary(startDate, endDate) {
  const totalSum = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalPrice" },
        totalCount: { $sum: 1 }, // Count the number of documents
      },
    },
  ]);

  return totalSum.length > 0
    ? {
        totalAmount: totalSum[0].totalAmount,
        totalCount: totalSum[0].totalCount,
      }
    : {
        totalAmount: 0,
        totalCount: 0,
      };
}

/* TOTAL SALES */
const totalSale = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const [totalForDay, totalForMonth] = await Promise.all([
      getTransactionSummary(startOfDay, endOfDay),
      getTransactionSummary(firstDayOfMonth, lastDayOfMonth),
    ]);

    res.json({
      totalForDay,
      totalForMonth,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const topSellingProducts = async (req, res, next) => {
  try {
    let limitValue = parseInt(req.query.limit) || 10; // Default limit is set to 10 if no value is provided
    const top_selling_products = await Transaction.aggregate([
      {
        $unwind: "$orders", // Unwind the orders array to access individual items
      },
      {
        $group: {
          _id: "$orders.meal",
          totalQuantity: { $sum: "$orders.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 }, // Sort by total quantity in descending order
      },
      {
        $limit: limitValue, // Limit the result to top 10 selling products/meals
      },
    ]);

    res.json(top_selling_products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { totalSale, topSellingProducts };
