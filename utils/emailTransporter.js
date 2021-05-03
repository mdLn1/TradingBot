const nodemailer = require("nodemailer");

if (require("dotenv"))
    require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_SERVER,
    port: process.env.EMAIL_SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SENDER_ADDRESS,
        pass: process.env.EMAIL_SENDER_PASSWORD,
    },
});

module.exports = { transporter }