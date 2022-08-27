const express = require('express');
const app = express();
const dbConnect = require("./util/dbConect");
const dotenv = require("dotenv");
const cookieParser= require("cookie-parser");
const cors= require("cors");
dotenv.config();

//ROUTES IMPORTATION
const mealRoute= require("./routes/meals/index");
const orderRoute= require("./routes/order/index");
const loginRoute= require("./routes/auth/login");
const logoutRoute= require("./routes/auth/logout");
const registerRoute= require("./routes/auth/register");
const recordRoute= require("./routes/record/index");
const staffRoute= require("./routes/staff/index");

const PORT = 3100 || process.env.PORT ; 


//DB INITIALIZATION
dbConnect();

//Middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

//ROUTES

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/api/meal", mealRoute);
app.use("/api/order", orderRoute);
app.use("/api/records", recordRoute);
app.use("/api/staff", staffRoute); 



//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const errorCode = err.status || 500;
  const errorMessage = err.message || "Error Occured!";
  return res.status(errorCode).json({
    success: false,
    message: errorMessage,
    code: errorCode,
    stack: err.stack
  })
})


app.listen(PORT, ()=>{
    console.log(`server connected on PORT ${PORT}`);
})

