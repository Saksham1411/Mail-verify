const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: "sakshamsamgarg1411@gmail.com",
        pass: process.env.PASSWORD
    }
})

function sendMail(data,email){
    const text = `your otp is ${data}`;
    const mail = {
        to: email,
        from: '"verify your email" <test@gmail.com>',
        subject: 'verfiy your mail',
        text: text
    }
    transporter.sendMail(mail);

}

module.exports = sendMail;