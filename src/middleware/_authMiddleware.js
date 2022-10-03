let isAuth = async (req, res, next) => {
  var _jwt = require("../common/_jwt");
  var _token = req.headers.authorization;
  if (_token) {
    try {
      var authData = await _jwt.check(_token);
      req.auth = authData;
      next();
    } catch (error) {
      return res.send({ data: "Mã token không hợp lệ" });
    }
  } else {
    return res.send({ data: "Bạn chưa gửi token" });
  }
};

module.exports = {
  isAuth: isAuth,
};
