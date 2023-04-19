const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");
const createError = require("../util/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {

  try {

    /*ERROR HANDLING
    08/08/2022 | 12:03 AM --> Error handlers throwing up error after detecting if email and phone already exist
     */
    if(req.body.firstname === req.body.lastname) return next(createError(401, "Firstname and Lastname should be different"));
    
    const staffEmail = await Staff.findOne({ email: req.body.email });

    if(staffEmail) return next(createError(401, "Email already Exist!"));

    const staffPhone = await Staff.findOne({ phone: req.body.phone });

    if(staffPhone) return next(createError(401, "Phone No. already Exist!"));
    

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newStaff = ({
      ...req.body,
      password: hash,
    });

    //console.log(newStaff); Comment here

    const staff = await Staff.create(newStaff);
    res.status(200).json({
      "success": true,
      "message": `${staff?.firstname} ${staff?.lastname} registered successfully!`
    });
  } catch (err) {
    if (err.keyValue?.phone) return next(createError(401, `Phone Number: 0${err.keyValue.phone} already Exist!`))

    if (err.keyValue?.email) return next(createError(401, `Email already Exist!`));

     next(createError(400, `An Error occured! Try Again`));
  }
};


const login = async (req, res, next) => {

  try {

    if (req.body.email === (undefined || "" || " ") || req.body.password === (undefined || "" || " ")) return next(createError(403, "Kindly fill the required fields"));

    const staff = await Staff.findOne({ email: req.body.email });

    if (!staff) return next(createError(404, "staff Email not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password, 
      staff.password
    );

    if (!isPasswordCorrect){
      return next(createError(400, "Incorrect Password, Kindly Try Again!"));
    }
    const { isAdmin,_id, firstname, lastname} = staff._doc; //Destructing password from the staff details recieved...

    const jwt_payload = {
      isAdmin: isAdmin,
      id: staff._id
    }
    
    const token = jwt.sign(jwt_payload, process.env.JWT_SECRET);
    /* return res
      .cookie("access_token", token, {
        path:"/",
        sameSite:"none",
        httpOnly: true,
        expires: new Date(Date.now() + (1000*60*60*12)),//it will last for 12hrs. Try and refresh the Token after 12hrs again--> 10/08/22(12:46pm)
        maxAge: 1000 *60 * 60 *12,
        //secure: true Set to TRUE when pushing to production
      })
      .status(200)
      .json({
        "success": true,
        "status": 200,
        "message": `Logged in successfully!`,
        "details": {
          _id, isAdmin, firstname, lastname
        }
      }); */
      return res.status(200).json({
        "success": true,
        "status": 200,
        "message": `Logged in successfully!`,
        "details": {
          _id, isAdmin, firstname, lastname
        },
        token:token
      })
  }
  catch (err) {
    next(err);
  }
};


//LOGOUT
const logout = async (req, res, next) => {
  try {

    //get the token from the req
    const token = req.cookies.access_token;

    if (!token || token) return res.clearCookie("access_token")
    .status(200)
    .json({
      "success": true,
      "status": 200,
      "message": `Logout successfully!`
    });
   
    
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register, logout };