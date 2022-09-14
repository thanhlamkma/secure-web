var express = require("express");
var router = express.Router();

var homeController = require("../controllers/home.controller");
router.get("/", homeController.home);

router.get("/about", homeController.about);

router.get("/json", (req, res) => {
  var data = [{ id: 1, name: "demo" }];
  res.send({ books: data });
});

module.exports = router;
