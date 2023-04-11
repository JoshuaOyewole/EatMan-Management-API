const Transaction = require("../models/transaction");
const createError = require("../util/error");

/* GET END OF DAY TRANSACTION */
const eod = async (req, res, next) => {
  const query = req.query.q;

  try {
    const eod = await Transaction.find({ payment_date: query });
    res.status(200).json(eod);
  } catch (error) {
    return next(createError(400, error.message));
  }
};

/* const getTransactionByDate = async (req, res) => {
  try {
    //get dates from req.query by es6 object destructuring

    let { startDate, endDate } = req.body;

    //1. check that date is not empty
    if (startDate === "" || endDate === "") {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you pick two dates",
      });
    }

    //2. check that date is in the right format
    //expected result: YYY-MMM-DDD
    console.log({ startDate, endDate });

    //In some cases you'll get a date-time format where you have to separate the date
    //from the time.

    //3. Query database using Mongoose
    //Mind the curly braces
    const transactions = Transaction.find({
      payment_date: {
        $gte: new Date(new Date(startDate).setHours(01, 00, 00)),
        $lt: new Date(new Date(endDate).setHours(24, 59, 59)),
      },
    }).sort({ payment_date: "asc" });

    console.log(transactions);

    //4. Handle responses
    if (!transactions) {
      return res.status(404).json({
        status: "failure",
        message: "Could not retrieve transactions",
      });
    }

    res.status(200).json({
      status: "success",
      data: transactions 
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      error: error.message,
    });
  } //Catch Ends here
}; */

module.exports = { eod };
