const User = require("../models/user");
const createError = require("../util/error");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");

//GET A User
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not Found!"));
    }
    const {email,_id} =
      user._doc;

    res.status(200).json({email,uid:_id});
  } catch (err) {
    next(err);
  }
};

//GET ALL UserS
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) return next(createError(404, "No User Available!"));
    const refinedData = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return { ...otherDetails };
    });
    res.status(200).json(refinedData);
  } catch (err) {
    next(err);
  }
};


//UPDATE User
const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateUser) {
      res.status(404).json(`User ID not found!`);
    }
    res.status(201).json("User Information successfully Updated");
  } catch (err) {
    next(err);
  }
};

//DELETE User
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json(`User ID does not Exist, Kindly try again!`);
    } else {
      res
        .status(201)
        .json(
          `${deletedUser.firstname} ${deletedUser.lastname} deleted successfully`
        );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {getUser, getAllUsers, updateUser, deleteUser };
