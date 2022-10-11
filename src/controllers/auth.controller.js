import userService from "../services/userService";

let auth = (req, res) => {
  return res.render("auth/auth.ejs", { message: req.flash("message") });
};

let postLogin = async (req, res) => {
  let user = await userService.login(req.body);
  if (!user) {
    req.flash("message", "Login");
    return res.redirect("/auth")
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
  postLogin: postLogin,
  postRegister: postRegister,
};
