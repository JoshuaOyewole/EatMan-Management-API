const express = require("express");
const app = express();
const dbConnect = require("./util/dbConect");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

// MIDDLEWARES IMPORT
const err = require("./middleware/error");

//ROUTES IMPORTATION
const mealRoute = require("./routes/meals/index");
const orderRoute = require("./routes/order/index");
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const registerRoute = require("./routes/auth/register");
const OTPRoute = require("./routes/otp/index");
const forgetPWD = require("./routes/auth/reset_pwd/forgot_pwd");
const resetPWD = require("./routes/auth/reset_pwd/reset_pwd");
const recordRoute = require("./routes/record/index");
const dashboardSummaryRoute = require("./routes/dashboardsummary/index");
const staffRoute = require("./routes/staff/index");
const userRoute = require("./routes/user/index");
const cartRoute = require("./routes/cart/index");
const reservationRoute = require("./routes/TableReservation/index");
const newsLetterRoute = require("./routes/newsLetter/index");
const foodCategoriesRoute = require("./routes/category/foodCategory");

const PORT = 3100 || process.env.PORT;

//DB INITIALIZATION
dbConnect();

//Middlewares
const corsoption = {
  origin: [
    "http://localhost:5173",
    "https://eatman.netlify.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsoption));
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/api/login", loginRoute);

app.use("/api/register", registerRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/forgot_pwd", forgetPWD);
app.use("/api/reset_pwd", resetPWD);
app.use("/api/meal", mealRoute);
app.use("/api/order", orderRoute);
app.use("/api/otp", OTPRoute);
app.use("/api/records", recordRoute);
app.use("/api/dashboard-summary", dashboardSummaryRoute);
app.use("/api/staff", staffRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/newsletter", newsLetterRoute);
app.use("/api/foodCategories", foodCategoriesRoute);

//ERROR HANDLING MIDDLEWARE
app.use(err);

app.listen(PORT, () => {
  console.log(`server connected on PORT ${PORT}`);
});
