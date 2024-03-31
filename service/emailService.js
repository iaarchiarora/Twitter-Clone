
// // //https://myaccount.google.com/apppasswords
var nodemailer=require('nodemailer');
var otpgenerator=require('otp-generator');
 require('dotenv').config();
  // console.log('process.env.DBUSER >>', process.env.DBUSER);

var transporter = nodemailer.createTransport(
{
    service: 'gmail',
    auth: {
        // user: process.env.EMAILFROM,
        // // user 'dkjavatrainer@gmail.com",
        // pass: process.env. EMAILAPPPASS
        // // pass:

        // user: process.env.EMAILFROM,
     user : 'aarchi2174.be21@chitkara.edu.in',
     // pass: process.env.EMAILAPPPASS
    pass : 'idtzvlongobqyuhl'
        },
    tls:{ rejectUnauthorized:false}
});
function sendTestEmail(to,text,html) {


var  mailOptions={
    // from : '"Java trainer" <aarchi2174.be21@chitkara.edu.in>',// sender address
    // to:to||'aarchiarora2003@gmail.com',
    from : 'Aarchi <aarchi2174.be21@chitkara.edu.in>',
    to : to|| 'aarchiarora2003@gmail.com' ,
    subject : 'Nodemailer twitter test email',
    text:text ||"Email from twitter",
    html: html||"<h3>Email from twitter</h3>"
};
transporter.sendMail(mailOptions , function(error, info){
    if (error) {
      return console.log('Error:',error);
    }
    else 
    {
        console.log('Email sent: '+info.response);
    }
}) ; 
}





var otp=otpgenerator.generate(4);
function sendOTP(to, otp) 
{    
    sendTestEmail("Have this OTP for your Twitter Account "+otp);
    return otp;
}
sendOTP('iaarchiarora@gmail.com ',otp);//what doing hee?