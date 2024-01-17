const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // false for TLS - as a boolean not string - if the server does not support TLS
  auth: {
    user: AUTH_EMAIL, // Your email address
    pass: AUTH_PASS, // Your email password or app password if using Gmail or other providers
  },
});

//Test Transporter
/* transporter.verify((error, success) => {
  if (!success) {
    console.log('Helloooo');
    console.log(error);
  }
}); */

const sendEmail = async (mailOptions) => {
  try { 
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
