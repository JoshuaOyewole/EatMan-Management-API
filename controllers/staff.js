const Staff = require("../models/staff");
const createError = require("../util/error");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//GET A Staff
const getStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return next(createError(404, "Staff not Found!"));
    }
    const { createdAt, updatedAt, password, isAdmin, ...otherDetails } =
      staff._doc;

    res.status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

//GET ALL StaffS
const getAllStaffs = async (req, res, next) => { 
  try {
    const staffs = await Staff.find({});

    if (!staffs) return next(createError(404, "No Staff Available!"));
    const refinedData = staffs.map((Staff) => {
      const { password, isAdmin, ...otherDetails } = Staff._doc;
      return { ...otherDetails };
    });
    res.status(200).json(refinedData);
  } catch (err) {
    next(err);
  }
};

/* ADD NEW STAFF TO DB*/
const addStaff = async (req, res, next) => {
  try {
    const checkStaffEmail = await Staff.find({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    console.log(checkStaffEmail);
    if (req.body.firstname === req.body.lastname)
      return next(
        createError(401, "Firstname and Lastname should be different")
      );
    else if (checkStaffEmail.length >= 1) {
      return next(createError(409, "Email or Phone No. already exist"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newStaff = {
      ...req.body,
      password: hash,
    };

    const staff = await Staff.create(newStaff);
    res.status(200).json({
      success: true,
      message: `${staff.firstname} ${staff.lastname} has been successfully added`,
    });
  } catch (err) {
    next(err);
  }
};

//UPDATE Staff
const updateStaff = async (req, res, next) => {
  try {
    const updateStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateStaff) {
      res.status(404).json(`Staff ID not found!`);
    }
    res.status(201).json("staff Information successfully Updated");
  } catch (err) {
    next(err);
  }
};

//DELETE Staff
const deleteStaff = async (req, res, next) => {
  try {
    const deletedstaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedstaff) {
      res.status(404).json(`staff ID does not Exist, Kindly try again!`);
    } else {
      res
        .status(201)
        .json(
          `${deletedstaff.firstname} ${deletedstaff.lastname} deleted successfully`
        );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { addStaff, getStaff, getAllStaffs, updateStaff, deleteStaff };
