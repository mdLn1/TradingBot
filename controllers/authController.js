if (require("dotenv")) require("dotenv").config();
const HttpError = require("../utils/httpError");
const jwt = require("jsonwebtoken");
const { transporter } = require("../utils/emailTransporter");

function login(req, res) {
  const { username, password } = req.body;
  if (username === process.env.USER && password === process.env.PASSWORD) {
    const payload = {};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 15, // 15 mins
    });

    if (!token)
      throw new HttpError(
        "Could not create token, please try again later",
        500
      );

    return res.status(200).send(token).end();
  }

  throw new HttpError("Invalid credentials");
}

async function remindCredentials(req, res) {
  try {
    let response = await transporter.sendMail({
      from: process.env.EMAIL_SENDER_ADDRESS,
      to: process.env.EMAIL_CONTACT,
      subject: "Password reminder",
      text: `your username is ${process.env.USER} and  your password is ${process.env.PASSWORD}`,
    });
  } catch (error) {
    console.log(error);
    throw new HttpError("Failed to send email", 500);
  }

  return res.status(200).send("credential reminder sent");
}

module.exports = { login, remindCredentials };
