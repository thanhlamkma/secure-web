import userService from "../services/userService";
import emailService from "../services/emailService";
import db from "../models/index";

let auth = (req, res) => {
  var _token = req.cookies.userLogin;
  var role = req.cookies.type;

  if (_token && role === "customer") return res.redirect("/");
  else if (_token && role === "staff") return res.redirect("/staff");
  else if (_token && role === "admin") return res.redirect("/admin");

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
    return res.json({
      isSuccess: false,
      message: "Email or password is invalid",
    });
  }

  let accessToken = user.accessToken;
  const cookieOption = {
    expiresIn: new Date(
      Date.now() + process.env.ACCESS_TOKEN_LIFE * 24 * 60 * 60 * 100
    ),
    httpOnly: true,
  };
  res.cookie("userLogin", accessToken, cookieOption);
  res.cookie("type", user.roleId, cookieOption);
  return res.json({
    isSuccess: true,
    message: "Login successfully",
    user: user,
    accessToken: accessToken,
  });
};

let postRegister = async (req, res) => {
  let data = await userService.createUser(req.body);
  if (data) {
    return res.json({
      isSuccess: true,
      message: "Register successfully",
    });
  }
  return res.json({
    isSuccess: false,
    message: "Email has been registered",
  });
};

const logout = (req, res) => {
  res.clearCookie("userLogin");
  res.clearCookie("type");
  res.redirect("/");
};

module.exports = {
  auth: auth,

  postEmailOtp: postEmailOtp,
  getForgotPassword: getForgotPassword,
  postForgotPassword: postForgotPassword,

  postLogin: postLogin,
  postRegister: postRegister,
  logout: logout,
};
