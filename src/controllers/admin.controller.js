import userService from "../services/userService";

let getManagePage = async (req, res) => {
  let data = await userService.getAllUser();
  return res.render("admin/manage.ejs", {
    layout: "../views/layout/admin/index",
    httpCode: res.statusCode,
    total: data.length,
    data: data,
  });
};

let postUser = async (req, res) => {
  let data = await userService.createUser(req.body);
  return res.send({ data: data });
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

let putUser = async (req, res) => {
  let data = await userService.updateUser(req.body);
  return res.redirect(`/profile/${data.id}`);
};

let deleteUser = async (req, res) => {
  let id = req.params.id;
  await userService.deleteUserById(id);
  return res.redirect("/admin");
};

module.exports = {
  getManagePage: getManagePage,
  postUser: postUser,
  putUser: putUser,
  deleteUser: deleteUser,
  getProfile: getProfile,
  getChangePassword: getChangePassword,
};
