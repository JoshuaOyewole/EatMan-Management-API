const NewsLetter = require("../models/newsLetter");

/* GET ALL REGISTERED EMAILS */
const getAllMails = async (req, res, next) => {
  try {
    const allMails = await NewsLetter.find({});
    res.status(200).json(allMails);
  } catch (err) {
    next(err);
  }
};

/* SUBSCRIBE TO NEWSLETTER*/
const subscribe = async (req, res, next) => {

  try {
    const checkEmail = await NewsLetter.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(201).json(`Already Subscribed`);
    } else {
      await NewsLetter.create(req.body);
      return res.status(200).json(`Subscription Successful`);
    }
  } catch (err) {
    next(err);
  }
};

/* UNSUBSCRIBE */
const unsubscribe = async (req, res, next) => {
  try {
    await NewsLetter.findByIdAndDelete(req.params.id);
    res.status(200).json(`Successful`);
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, getAllMails, unsubscribe };
