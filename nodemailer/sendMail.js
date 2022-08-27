var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'orisfinabootcamp@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'orisfinabootcamp@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Registration Successful | Orisfina Bootcamp',
  text: 'Thank you for registering in our Bootcamp training'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});