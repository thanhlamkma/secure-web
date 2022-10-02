const jwt = require("jsonwebtoken");
const _app = require("./_app");

// make => Tạo mã token
let makeToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: user },
      _app.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: _app.TOKEN_TIME_LIFE,
      },
      (err, _token) => {
        if (err) {
          return reject(err);
        }
        return resolve(_token);
      }
    );
  });
};

// check => Xác thực mã đúng, sai, hết hạn
let checkToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _app.ACCESS_TOKEN, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = {
  make: makeToken,
  check: checkToken
};
