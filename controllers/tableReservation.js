const Table = require("../models/tableReservation");

/* GET RESERVATION */
const getReservation = async (req, res, next) => {
  try {
    const reservation = await Table.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

/* GET ALL RESERVATION */
const getAllReservations = async (req, res, next) => {
  try {
    const allReservations = await Table.find({});
    res.status(200).json(allReservations);
  } catch (err) {
    next(err);
  }
};

/* NEW RESERVATION*/
const newReservation = async (req, res, next) => {
  try {
    await Table.create(req.body);
    res.status(201).json(`Reservation successful`);
  } catch (err) {
    next(err);
  }
};

/* DELETE RESERVATION */
const deleteReservation = async (req, res, next) => {
  try {
    await Table.findByIdAndDelete(req.params.id);
    res.status(200).json(`Reservation Successfully deleted`);
  } catch (err) {
    next(err);
  }
};

module.exports = { newReservation, getReservation, getAllReservations, deleteReservation };
