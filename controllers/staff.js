const Staff = require('../models/staff');
const createError = require("../util/error");


//GET A Staff
const getStaff = async (req,res,next)=>{
  try{
    const staff = await Staff.findById(req.params.id);

    if(!staff){
      return next(createError(404, "Staff not Found!"))
    }
    const {createdAt, updatedAt, password, isAdmin, ...otherDetails } = staff._doc;

    res.status(200).json({...otherDetails});
  }
   catch(err){ 
    next(err);
  }
}

//GET ALL StaffS
const getAllStaffs = async (req,res,next)=>{
  console.log(req)
    try {
      const staffs = await Staff.find({});

      if(!staffs) return next(createError(404, "No Staff Available!"))
      const refinedData = newStaff.map(Staff=>{
        const { password, isAdmin, ...otherDetails } = Staff._doc;
        return {...otherDetails};
      })
      res.status(200).json(refinedData);
    } catch (err) {
      next(err);
    }
}

//UPDATE Staff
const updateStaff = async (req,res,next)=>{
  try{
    const updateStaff = await Staff.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body },
      {new:true}
    );
    if(!updateStaff){
        res.status(404).json(`Staff ID not found!`)
    }
    res.status(201).json('staff Information successfully Updated');
  }
   catch(err){
    next(err);
  }
}

//DELETE Staff
const deleteStaff = async (req,res,next)=>{
  try{
    const deletedstaff = await staff.findByIdAndDelete(req.params.id);
    if(!deletedstaff){
     res.status(404).json(`staff ID does not Exist, Kindly try again!`);
    }
    else{
     res.status(201).json(`${deletedstaff.firstname} ${deletedstaff.lastname} deleted successfully`);
    }
  }
   catch(err){
    next(err);
  }
 }

 module.exports = {getStaff, getAllStaffs, updateStaff, deleteStaff}