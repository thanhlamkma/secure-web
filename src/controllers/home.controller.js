import db from "../models/index";
import userService from "../services/userService";

// Chuyển sang file auth.controller.js
let auth = (req, res) => {
  return res.render("auth/auth.ejs");
};

let postLogin = () => {};

let postRegister = async (req, res) => {
  let response = await userService.createUser(req.body);
  return res.send({ response: response });
};

// Giữ nguyên
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("home/index.ejs", {
      layout: "../views/layout/index",
      user: JSON.stringify(data),
    });
  } catch (error) {
    console.log("err", error);
  }
};

let getProfile = async (req, res) => {
  let userId = req.params.id;
  let response;
  let data;
  if (userId) {
    try {
      data = await userService.getUserById(req.params.id);
      response = {
        httpCode: res.statusCode,
        isSuccess: true,
        total: data.length,
        data: data,
      };
    } catch (error) {
      console.log("err", error);
      response = {
        httpCode: res.statusCode,
        isSuccess: false,
      };
      return res.render("404.ejs", { ...response });
    }
    return res.render("home/profile.ejs", {
      layout: "../views/layout/profile/index",
      ...response,
    });
  }
};

let getChangePassword = async (req, res) => {
  let userId = req.params.id;
  let response;
  let data;
  if (userId) {
    try {
      data = await userService.getUserById(req.params.id);
      response = {
        httpCode: res.statusCode,
        isSuccess: true,
        total: data.length,
        data: data,
      };
    } catch (error) {
      console.log("err", error);
      response = {
        httpCode: res.statusCode,
        isSuccess: false,
      };
      return res.render("404.ejs", { ...response });
    }
    return res.render("home/change-password.ejs", {
      layout: "../views/layout/profile/index",
      ...response,
    });
  }
};

let putUser = (req, res) => {
  let data = req.body;
  return res.send({ data: data });
};

// Chuyển sang file admin.controller.js
let getManagePage = async (req, res) => {
  let data = await userService.getAllUser();
  return res.render("home/profile.ejs", {
    // layout: "../views/layout/profile/index",
    httpCode: res.statusCode,
    total: data.length,
    data: data,
  });
};

module.exports = {
  auth: auth,
  postLogin: postLogin,
  postRegister: postRegister,

  getHomePage: getHomePage,
  getProfile: getProfile,
  getChangePassword: getChangePassword,
  putUser: putUser,

  getManagePage: getManagePage,
};
