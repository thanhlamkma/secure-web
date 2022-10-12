require("dotenv").config();
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "thanhlamgonstack@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
    clientId:
      "1129183175-1i5rpecu5ftvvnkqetig9m7niak02s68.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04wc7Dwh2cuqUCgYIARAAGAQSNwF-L9IrIhNL0QWuUBuVkCQyuX1dbAjzqs79LtrXIx7QuXUlFcLNMLqaOtkAlVYlLDzXw-YwkZo",
  },
});

module.exports = { transporter: transporter };
