import userService from "../services/userService";
import _jwt from "../common/_jwt";

let getHomePage = async (req, res) => {
  var _token = req.cookies.userLogin;
  var user = await _jwt.check(_token);

  return res.render("home/index.ejs", {
    layout: "../views/layout/index",
    httpCode: res.statusCode,
    isSuccess: true,
    data: user,
  });
};

let getProfile = async (req, res) => {
  let userId = Number(req.params.id);
  let response;
  let data;
  if (userId && typeof userId === "number") {
    try {
      data = await userService.getUserById(userId);
      response = {
        httpCode: res.statusCode,
        isSuccess: true,
        total: data.length,
        data: data,
      };
      return res.render("home/profile.ejs", {
        layout: "../views/layout/profile/index",
        ...response,
      });
    } catch (error) {
      console.log("err", error);
      response = {
        httpCode: res.statusCode,
        isSuccess: false,
      };
      return res.render("404.ejs", { ...response });
    }
  } else return res.render("404.ejs");
};

let putUser = async (req, res) => {
  let data = await userService.updateUser(req.body);
  return res.redirect(`/profile/${data.id}`);
};

let getChangePassword = async (req, res) => {
  let userId = Number(req.params.id);
  let response;
  let data;
  if (userId && typeof userId === "number") {
    try {
      data = await userService.getUserById(userId);
      response = {
        httpCode: res.statusCode,
        isSuccess: true,
        total: data.length,
        data: data,
      };

      return res.render("home/change-password.ejs", {
        layout: "../views/layout/profile/index",
        successMsg: req.flash("successMsg"),
        failMsg: req.flash("failMsg"),
        ...response,
      });
    } catch (error) {
      console.log("err", error);
      response = {
        httpCode: res.statusCode,
        isSuccess: false,
      };

      return res.render("404.ejs", { ...response });
    }
  } else return res.render("404.ejs");
};

let changePassword = async (req, res) => {
  let userId = Number(req.params.id);
  let data = await userService.updatePassword({
    ...req.body,
    id: userId,
  });
  console.log("data", data);
  if (data) {
    req.flash("successMsg", "Update password successfully");
    req.flash("failMsg", undefined);
  } else {
    req.flash("successMsg", undefined);
    req.flash("failMsg", "Update password failed");
  }
  return res.redirect(`/change-password/${userId}`);
};

module.exports = {
  getHomePage: getHomePage,

  getProfile: getProfile,
  putUser: putUser,

  getChangePassword: getChangePassword,
  changePassword: changePassword,
};
