import userService from "../services/userService";
import emailService from "../services/emailService";
import db from "../models/index";

let auth = (req, res) => {
  return res.render("auth/auth.ejs", {
    message: req.flash("message"),
    otpMsg: req.flash("otpMsg"),
  });
};

let postEmailOtp = async (req, res) => {
  let email = req.body.emailOTP;
  let otp = Math.floor(100000 + Math.random() * 900000);
  let mailOptions = {
    from: "thanhlamgonstack@gmail.com",
    to: email,
    subject: "Secure web: Send OTP to change password",
    text: otp.toString(),
  };

  await emailService.transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error", error);
      req.flash("otpMsg", "Send OTP failed");
      return res.redirect("/auth");
    } else {
      console.log("Email sent: " + info.response);
      req.flash("otp", otp);
      req.flash("email", email);
      return res.redirect("/forgot-password");
    }
  });
};

let getForgotPassword = async (req, res) => {
  return res.render("auth/forgotPassword.ejs", {
    otp: req.flash("otp"),
    email: req.flash("email"),
  });
};

let postForgotPassword = async (req, res) => {
  let user = await db.User.findOne({
    where: { email: req.body.email },
    raw: true,
  });
  if (user) {
    let success = await db.User.update(
      {
        ...user,
        password: await userService.handleHashPassword(req.body.password),
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    if (success) {
      req.flash("otpMsg", "Change password successfully");
      return res.redirect("/auth");
    } else {
      req.flash("otpMsg", "Change password failed");
      return res.redirect("/auth");
    }
  } else {
    req.flash("otpMsg", "Change password failed");
    return res.redirect("/auth");
  }
};

let postLogin = async (req, res) => {
  let user = await userService.login(req.body);
  if (!user) {
    req.flash("message", "Login");
    return res.redirect("/auth");
  }
  return res.redirect(`/profile/${user.id}`);
};

let postRegister = async (req, res) => {
  let data = await userService.createUser(req.body);
  if (data) {
    req.flash("message", "Register");
    return res.redirect("/auth");
  }
  return res.send({ data: data });
};

module.exports = {
  auth: auth,

  postEmailOtp: postEmailOtp,
  getForgotPassword: getForgotPassword,
  postForgotPassword: postForgotPassword,

  postLogin: postLogin,
  postRegister: postRegister,
};
