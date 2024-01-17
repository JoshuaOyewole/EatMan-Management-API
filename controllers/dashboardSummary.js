const { default: mongoose } = require("mongoose");
const Transaction = require("../models/transaction");
const moment = require("moment");

// Function to get transaction summary for a date range
async function getTransactionSummary(userId, startDate, endDate) {

  const totalSum = await Transaction.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
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
  let userId = req.body.id;
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
      getTransactionSummary(userId, startOfDay, endOfDay),
      getTransactionSummary(userId, firstDayOfMonth, lastDayOfMonth),
    ]);

    res.json({
      totalForDay,
      totalForMonth,
    });
  } catch (err) {
    next(err);
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

    res.status(200).json(top_selling_products);
  } catch (err) {
    next(err);
  }
};

// Function to get the total orders for the last 7 days
const getTotalOrdersLast7Days = async (req, res, next) => {
  try {
    const today = moment(); // Get the current date
    const currentDayOfWeek = today.day(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Calculate the start date and end date dynamically for the last 7 days
    const startDate = moment(today)
      .subtract((currentDayOfWeek + 6) % 7, "days")
      .startOf("day");
    const endDate = moment(startDate).add(6, "days").endOf("day");

    const result = await Transaction.aggregate([
      {
        $match: {
          payment_date: { $gte: startDate.toDate(), $lte: endDate.toDate() }, // Filter records within the last 7 days
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$payment_date" }, // Group by day of the week
          count: { $sum: 1 }, // Count the number of orders for each day
        },
      },
      {
        $project: {
          dayOfWeek: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { dayOfWeek: 1 }, // Sort by day of the week (Sunday to Saturday)
      },
    ]);

    // Reformat the result to match the desired object format
    const days = [
      moment(startDate).format("dddd"), // Start date (e.g., Thursday)
      moment(startDate).add(1, "days").format("dddd"),
      moment(startDate).add(2, "days").format("dddd"),
      moment(startDate).add(3, "days").format("dddd"),
      moment(startDate).add(4, "days").format("dddd"),
      moment(startDate).add(5, "days").format("dddd"),
      moment(startDate).add(6, "days").format("dddd"), // End date (e.g., Wednesday)
    ];
    const values = new Array(7).fill(0);

    result.forEach((item) => {
      const adjustedDayIndex = (item.dayOfWeek + 6) % 7; // Adjust day index to match the days array
      values[adjustedDayIndex] = item.count; // Adjust counts according to day of the week index
    });

    const response = { days, values };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getLastTransactions = async (req, res, next) => {
  const page = req.query.page || 1; // Get the page number from the request query parameter, default to 1 if not provided
  const perPage = 5; // Number of transactions per page

  try {
    const totalCount = await Transaction.countDocuments(); // Get the total count of transactions

    const transactions = await Transaction.find(
      {},
      { updatedAt: 0, createdAt: 0, __v: 0 }
    )
      .sort({ payment_date: -1 }) // Sort transactions by payment_date in descending order (latest first)
      .skip((page - 1) * perPage) // Skip transactions based on pagination
      .limit(perPage); // Limit the number of transactions per page

    const totalPages = Math.ceil(totalCount / perPage); // Calculate the total number of pages

    res.status(200).json({
      transactions,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  totalSale,
  topSellingProducts,
  getTotalOrdersLast7Days,
  getLastTransactions,
};
