var Lesson = require("../models/lesson.model");

exports.getList = (req, res) => {
  Lesson.getAll(function (data) {
    res.send({ result: data });
  });
};

exports.getDetail = (req, res) => {
  var data = Lesson.getById(req.params.id);
  res.send({ result: data });
};

exports.addLesson = (req, res) => {
  var data = req.body;
  Lesson.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.editLesson = (req, res) => {
  var data = req.body;
  Lesson.update(data, function (response) {
    res.send({ result: response });
  });
};

exports.removeLesson = (req, res) => {
  var id = req.params.id;
  Lesson.delete(id, function (response) {
    res.send({ result: response });
  });
};
