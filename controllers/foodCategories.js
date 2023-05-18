const Categories = require("../models/categories");
const createError = require("../util/error");

/* GET CATEGORY */
const getCategory = async (req, res, next) => {
  try {
    const get_category = await Categories.findById(req.params.id);
    res.status(200).json(get_category);
  } catch (err) {
    next(err);
  }
};

/* GET ALL CATEGORY */
const getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await Categories.find({});
    res.status(200).json(allCategory);
  } catch (err) {
    next(err);
  }
};

/* ADD CATEGORY TO DB*/
const addCategory = async (req, res, next) => {
  try {
    const checkCategory = await Categories.findOne({ name: req.body.name });
    const checkCategoryUrlParam = await Categories.findOne({ urlParam: req.body.urlParam });

    if (checkCategory || checkCategoryUrlParam ) return next(createError(409, "Category or URL Param already exist"));
    const newCategory = await Categories.create(req.body);
    res.status(201).json({
      success: true,
      message: `${newCategory.name} - successfully added`,
    });
  } catch (err) {
    next(err);
  }
};

/*UPDATE CATEGORY */
const updateCategory = async (req, res, next) => {
  try {
    await Categories.findByIdAndUpdate(
      req.params.id,{ $set: req.body },{ new: true }
    );
    res.status(200).json({
      success: true,
      message: `Category successfully Updated`,
    });
  } catch (err) {
    next(err);
  }
};

/* DELETE CATEGORY  */
const deleteCategory = async (req, res, next) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: `Category Successfully deleted`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addCategory, getCategory, getAllCategory, updateCategory, deleteCategory };
