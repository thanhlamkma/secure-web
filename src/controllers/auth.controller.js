import userService from "../services/userService";

let auth = (req, res) => {
  return res.render("auth/auth.ejs");
};

let postLogin = async (req, res) => {
  let user = await userService.login(req.body);
  if (user) return res.redirect(`/profile/${user.id}`);
  else return res.send({ data: "Email or password is invalid" });
};

let postRegister = async (req, res) => {
  let data = await userService.createUser(req.body);
  return res.send({ data: data });
};

module.exports = {
  auth: auth,
  postLogin: postLogin,
  postRegister: postRegister,
};
