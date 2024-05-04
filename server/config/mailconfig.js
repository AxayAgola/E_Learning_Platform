var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.MAIL_APP_PASSWORD
    }
});

// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Email sent: ' + info.response);
//     }
// });

module.exports = transporter;