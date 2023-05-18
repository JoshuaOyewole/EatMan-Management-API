const Cart = require("../models/cart");
const createError = require("../util/error");

/* GET ALL CART ITEMS */
const getCartItmes = async (req, res, next) => {
    try {
      const allCart = await Cart.find({});
      res.status(200).json(allCart);
    } catch (err) {
      next(err);
    }
  };

  /*UPDATE CART */
const updateCart = async (req, res, next) => {
    try {
      await Cart.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: `Cart successfully Updated`,
      });
    } catch (err) {
      next(err);
    }
  };

  /* DELETE CART ITEM*/
const deleteFromCart = async (req, res, next) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: `Cart Item Successfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  };

  /* ADD MEAL TO CART*/
const addtoCart = async (req, res, next) => {
    try {
      const checkCart = await Cart.findOne({ fid: req.body.fid });

      if (checkCart) return next(createError(409, "Item already in Cart"));
      else if (!req.body.uid)
        return next(createError(400, "Invalid User ID"));
      await Cart.create(req.body);
      res.status(201).json({
        success: true,
        message: `Item successfully added to Cart`,
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = { addtoCart, deleteFromCart, getCartItmes, updateCart }