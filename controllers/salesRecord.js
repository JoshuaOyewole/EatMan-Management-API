const Transaction = require("../models/transaction");
const createError = require("../util/error");

/* GET END OF DAY TRANSACTION */
const eod = async (req, res, next) => {
  let query = req.query.q;
  let userId = req.query.userId; // Assuming the user ID is present in the request parameters

  // Split the date string into day, month, and year components
  const [day, month, year] = query.split("-");

  console.log({ day, month, year, userId });
  // Convert the date components to a JavaScript Date object
  const desiredDate = new Date(`${year}-${month}-${day}`);

  // Adjust the desired date to match the start and end of the day to filter transactions within that day
  desiredDate.setUTCHours(0, 0, 0, 0); // Set to the start of the day in UTC
  const endOfDay = new Date(desiredDate);
  endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day in UTC

  try {
    const eod = await Transaction.find({
      user: userId,
      payment_date: { $gte: desiredDate, $lte: endOfDay },
    }).exec();

    res.status(200).json(eod);
  } catch (error) {
    return next(createError(400, error.message));
  }
};

module.exports = eod;

/* LAST 7 days Transactions */
const last7days = async (req, res, next) => {
  try {
    const data = await Transaction.find({
      timestamp: {
        $gte: new Date() - 6 * 60 * 60 * 24 * 1000,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    return next(createError(400, error.message));
  }
};

module.exports = { eod, last7days };
