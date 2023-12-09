const mongoose = require("mongoose");

const dbConnect = async () => {
 
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Eatery mongoDB.");
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", (err) => {
    console.log(err);
  });
};

module.exports = dbConnect;
