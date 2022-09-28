var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3308,
  user: "admin",
  password: "admin",
  database: "secure_web",
});

connection.connect((err) => {
  if (err) {
    // console.log("err", err);
    console.log("Kết nối CSDL không thành công");
  } else console.log("Thành công");
});

module.exports = connection;
