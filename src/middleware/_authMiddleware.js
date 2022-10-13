import _jwt from "../common/_jwt";

let isAuth = async (req, res, next) => {
  req.headers.authorization = req.flash("accessToken");
  var _token = req.headers.authorization;
  console.log("req", req.headers);

  if (!_token) {
    req.flash("message", "Access token not found!");
    return res.status(401).redirect("/auth");
  }

  try {
    var authData = await _jwt.check(_token);
    req.user = authData;
    next();
  } catch (error) {
    req.flash("message", "You do not have permission to access the website");
    return res.status(401).redirect("/auth");
  }
};

module.exports = {
  isAuth: isAuth,
};
