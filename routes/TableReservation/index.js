const express = require ('express');
const router = express.Router();

const { newReservation, getReservation, getAllReservations, deleteReservation } = require("../../controllers/tableReservation");
const { verifyStaff } = require('../../middleware/verifyToken');


router.get('/', verifyStaff, getAllReservations).get('/id',verifyStaff, getReservation).post('/',newReservation).delete('/id',verifyStaff, deleteReservation)

module.exports = router;