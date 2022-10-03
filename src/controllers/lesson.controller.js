var Lesson = require("../models/lesson");

exports.getList = (req, res) => {
  Lesson.getAll(function (data) {
    res.send({ result: data });
  });
};

exports.getDetail = (req, res) => {
  Lesson.getById(req.params.id, (data) => {
    res.send({ result: data });
  });
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
