const Transaction = require("../models/transaction");
const createError = require("../util/error");

/* GET END OF DAY TRANSACTION */
const eod = async (req, res, next) => {
  let query = req.query.q;

  console.log(`Query recieved is ${query}`);

  try {
    const eod = await Transaction.find({ payment_date: query });
    res.status(200).json(eod);
  } catch (error) {
    return next(createError(400, error.message));
  }
};

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
