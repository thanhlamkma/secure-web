var express = require("express");
var jwt = require("../common/_jwt");

var router = express.Router();
var homeController = require("../controllers/home.controller");

router.get("/", homeController.home);

router.get("/about", homeController.about);

router.get("/token", async (req, res) => {
  var user = {
    name: "admin",
    email: "admin@gmail.com",
  };
  const _token = await jwt.make(user);
  res.send({ token: _token });
});

router.get("/check_token", async (req, res) => {
  try {
    var _token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY2NDcyOTQ3MiwiZXhwIjoxNjY0NzMzMDcyfQ.clXCHF_F8cL3KkjpWYJQYjfozcT5Cdye2CpO_ljUc44";
    const data = await jwt.check(_token);
    res.send({ data: data });
  } catch (error) {
    res.send({ data: "Mã token không hợp lệ" });
  }
});

module.exports = router;
