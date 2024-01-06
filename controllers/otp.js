const sendOTP = require("../util/OTP");

//Post Creation Controller
const sendOTPController = async (req, res) => {
  const { email, subject, message, duration } = req.body;

  try {
    await sendOTP({
      email,
      subject,
      message,
      duration,
    });
    res.status(200).json("OTP has been successfully sent to your Email");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = sendOTPController;
