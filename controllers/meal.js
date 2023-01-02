const Meal = require('../models/meal')
const createError = require("../util/error");

/* GET MEAL */
 const getMeal = async (req,res,next) =>{
    try{
        const get_meal = await Meal.findById(req.params.id);
        res.status(200).json(get_meal);
      }
       catch(err){ 
        next(err);
      }
}

/* GET ALL MEAL */
 const getAllMeal = async (req,res,next)=>{
    try{
        const allMeal = await Meal.find({});
        res.status(200).json(allMeal);
      }
       catch(err){ 
        next(err);
      }
}

/* ADD MEAL TO DB*/
 const addMeal = async (req,res,next)=>{
    try{
      const checkMeal = await Meal.findOne({ name: req.body.name });
      if(checkMeal) return next(createError(401, "Meal already exist"));
        const newMeal = await Meal.create(req.body);
        res.status(201).json(`${newMeal.name} - successfully added`);
      }
       catch(err){
        next(err);
      }
}

/*UPDATE MEAL */
 const updateMeal = async (req,res,next)=>{
    try{
        await Meal.findByIdAndUpdate(
          req.params.id, 
          {$set:req.body},
          {new:true});
        res.status(201).json('Meal successfully Updated');
      }
       catch(err){
        next(err);
      }
}

/* DELETE MEAL */
 const deleteMeal = async (req,res, next)=>{
    try{
       await Meal.findByIdAndDelete(req.params.id);
        res.status(201).json(`Meal Successfully deleted`);
      }
       catch(err){
        next(err);
      }
}

module.exports = {addMeal,getMeal,getAllMeal, updateMeal, deleteMeal}