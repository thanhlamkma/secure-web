var express = require("express");
var router = express.Router();

var lessonController = require("../controllers/lesson.controller");

router.get("/lesson/list", lessonController.getList);

router.get("/lesson/detail/:id", lessonController.getDetail);

router.post("/lesson/add", lessonController.addLesson);

router.put("/lesson/edit", lessonController.editLesson);

router.delete("/lesson/delete/:id", lessonController.removeLesson);

module.exports = router;
