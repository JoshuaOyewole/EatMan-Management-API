const Meal = require("../models/meal");
const createError = require("../util/error");

/* GET MEAL */
const getMeal = async (req, res, next) => {
  console.log('User data recieved from the req during Verification of Token is')
  console.log(req.user)
  try {
    const get_meal = await Meal.findById(req.params.id);
    res.status(200).json(get_meal);
  } catch (err) {
    next(err);
  }
};

/* GET ALL MEAL */
const getAllMeal = async (req, res, next) => {
  try {
    const allMeal = await Meal.find({});
    res.status(200).json(allMeal);
  } catch (err) {
    next(err);
  }
};

/* ADD MEAL TO DB*/
const addMeal = async (req, res, next) => {
  try {
    const checkMeal = await Meal.findOne({ title: req.body.title });

    if (checkMeal) return next(createError(409, "Meal already exist"));
    else if (req.body.price <= 40)
      return next(createError(400, "Invalid Price inputted"));
    const newMeal = await Meal.create(req.body);
    res.status(201).json({
      success: true,
      message: `${newMeal.title} - successfully added`,
    });
  } catch (err) {
    next(err);
  }
};

/*UPDATE MEAL */
const updateMeal = async (req, res, next) => {
  try {
    await Meal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `Meal successfully Updated`,
    });
  } catch (err) {
    next(err);
  }
};

/* DELETE MEAL */
const deleteMeal = async (req, res, next) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: `Meal Successfully deleted`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addMeal, getMeal, getAllMeal, updateMeal, deleteMeal };
