const mongoose = require( "mongoose");


 const dbConnect = async () => {

  try {
 //CHECKOUT WHY process.env.MONGO_URL keep generating errors
    await mongoose.connect("mongodb://localhost:27017/eatery");
    console.log("Connected to Eatery mongoDB.");
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", (err) => {
    console.log(err);
  });
};



module.exports = dbConnect;
