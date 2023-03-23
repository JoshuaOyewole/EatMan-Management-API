const Order = require("../models/transaction") ;
const createError = require("../util/error");

//QUERY ORDER
const order = async (req,res,next)=>{
    try{
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    }
     catch(err){ 
        next(err);
    }
  }
//QUERY ALL ORDERS
  const orders = async (req,res,next)=>{
    try{
      const orders = await Order.find({});
      res.status(200).json(orders);
    }
     catch(err){ 
        next(err);
    }
  }

  //MAKE AN ORDER
  const newOrder =  async (req,res,next)=>{
    
    try{
      if(!req.body.orders && !req.body.totalPrice) {
        return next(createError(401, "Please kindly make an Order!"));
      } 

      const order = await Order.create(req.body);
      const {_id} = order;
   
      res.status(200).json({"message":"Order Successfull", id:_id});
    }
     catch(err){ 
        next(err);
    }
  }

  //UPDATE AN ORDER
  const updateOrder =  async (req,res,next)=>{
    try{
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
      );
      if(!updatedOrder){
          res.status(400).json(`Order ID not found!`)
      }
      res.status(201).json('Order Information successfully Updated');
    }
     catch(err){
        next(err);
    }
  }

  //DELETE AN ORDER
  const deleteOrder =  async (req,res,next)=>{
    try{
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
     
      //CHECK IF THE ID IS VALID
      if(!deletedOrder){
       res.status(400).json(`Order ID does not Exist, Kindly try again!`);
      }
      else{
       res.status(201).json(`${deletedOrder.name}  deleted successfully`);
      }
    }
     catch(err){
        next(err);
    }
   }

   module.exports = { order, orders, newOrder, updateOrder, deleteOrder};