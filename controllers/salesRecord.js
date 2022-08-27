const Record= require("../models/salesRecord.js") ;
//const createError = require("../util/error");

//GET ALL RECORDS
const getRecords= async (req,res)=>{
    try{
      const records= await Record.find({});
      res.status(200).json(records);
    }
     catch(err){ 
        next(err);
    }
  }
//GET A SINGLE RECORDS
  const getRecord = async (req,res)=>{
    try{
      const record = await Record.find({date:req.body});
      res.status(200).json(record);
    }
     catch(err){ 
        next(err);
    }
  }

   module.exports = { getRecord, getRecords};