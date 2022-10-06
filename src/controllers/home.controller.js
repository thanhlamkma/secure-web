import db from "../models/index";
import crudService from "../services/crudService";

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

let login = (req, res) => {
  return res.render("auth/login.ejs");
};

let register = (req, res) => {
  return res.render("auth/register.ejs");
};

// Learning => Done => Edit name and remove
let getCrud = (req, res) => {
  return res.render("test/crud.ejs");
};

let postCrud = async (req, res) => {
  let response = await crudService.createUser(req.body);
  return res.send({ response: response });
};

let getProfile = async (req, res) => {
  return res.render("test/view-profile.ejs");
};

// Learning => Done => Edit name and remove

module.exports = {
  getHomePage: getHomePage,
  login: login,
  register: register,
  // Learning
  getAboutPage: getAboutPage,
  getCrud: getCrud,
  postCrud: postCrud,
  getProfile: getProfile,
};
