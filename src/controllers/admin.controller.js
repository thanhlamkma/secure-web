import userService from "../services/userService";
import adminService from "../services/adminService";
import permissionService from "../services/permissionService";
import db from "../models/index";

let getManagePage = async (req, res) => {
  let data = await userService.getAllUser();
  return res.render("admin/manage.ejs", {
    layout: "../views/layout/admin/index",
    httpCode: res.statusCode,
    total: data.length,
    data: data,
  });
};

let getPermission = async (req, res) => {
  let data = await adminService.getAllUserByRole("staff");
  return res.render("admin/permission.ejs", {
    layout: "../views/layout/admin/index",
    httpCode: res.statusCode,
    total: data.length,
    data: data,
  });
};

let getUserInfo = async (req, res) => {
  let user = await userService.getUserById(req.params.id);
  if (user) {
    return res.json({
      isSuccess: true,
      data: user,
      message: "Find user successfully",
    });
  }
  return res.json({
    isSuccess: true,
    data: user,
    message: "User have id = " + req.body.id + " not found",
  });
};

let getProfile = async (req, res) => {
  let userId = req.body.id;
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

      return res.render("home/change-password.ejs", {
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
  }
};

let addUser = async (req, res) => {
  let data = await adminService.createUser(req.body);
  let users = await db.User.findAll({
    raw: true,
  });
  if (data) {
    return res.json({
      isSuccess: true,
      data: users,
      message: "Create user successfully",
    });
  }
  return res.json({
    isSuccess: false,
    data: users,
    message: "Email has been registered",
  });
};

let editUser = async (req, res) => {
  let data = await adminService.updateUser(req.body);
  console.log("data", req.body);

  if (data) {
    return res.json({
      isSuccess: true,
      message: "Update user successfully",
    });
  }
  return res.json({
    isSuccess: false,
    message: "Update user failed",
  });
};

let deleteUser = async (req, res) => {
  let id = req.body.id;
  let data = await adminService.deleteUserById(id);
  if (data) {
    return res.json({
      isSuccess: true,
      message: "Delete user successfully",
    });
  }
  return res.json({
    isSuccess: false,
    message: "Delete user failed",
  });
};

// Permission
let getUserPermission = async (req, res) => {
  let userId = req.params.id;
  let data = await permissionService.getPermissionByUserId(userId);
  if (data) {
    return res.json({
      isSuccess: true,
      data: data,
      message: "Get permission successfully",
    });
  }
  return res.json({
    isSuccess: true,
    data: data,
    message: "Get permission failed",
  });
};

let changePermission = async (req, res) => {
  let data = await permissionService.updatePermission(req.body);
  if (data) {
    return res.json({
      isSuccess: true,
      message: "Change permission successfully",
    });
  }
  return res.json({
    isSuccess: false,
    message: "Change permission failed",
  });
};

module.exports = {
  getManagePage: getManagePage,
  getUserInfo: getUserInfo,
  addUser: addUser,
  editUser: editUser,
  deleteUser: deleteUser,
  getProfile: getProfile,
  getChangePassword: getChangePassword,

  getPermission: getPermission,
  getUserPermission: getUserPermission,
  changePermission: changePermission,
};
