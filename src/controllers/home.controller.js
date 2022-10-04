import db from "../models/index";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { user: JSON.stringify(data) });
  } catch (error) {
    console.log("err", error);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCrud = (req, res) => {
  return res.render("test/crud.ejs");
};

let postCrud = (req, res) => {
  console.log("data", req.body);
  return res.send("post crud from server");
};

let login = (req, res) => {
  return res.render("auth/login.ejs");
};

let register = (req, res) => {
  return res.render("auth/register.ejs");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCrud: getCrud,
  postCrud: postCrud,
  login: login,
  register: register,
};
