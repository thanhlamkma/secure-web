const jwt = require("jsonwebtoken");

// make => Tạo mã token
let makeToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
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
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
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
