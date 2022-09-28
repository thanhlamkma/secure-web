const db = require("../common/connect")

const Lesson = function (lesson) {
  this.id = lesson.id;
  this.name = lesson.name;
};

Lesson.getAll = function (result) {
  db.query("SELECT * FROM lessons", (err, lesson) => {
    if(err) result(err)
    result(lesson)
  })

  result(data);
};

Lesson.getById = function (id) {
  var data = {
    id: id,
    name: "Lesson 1",
  };

  return data;
};

Lesson.create = function (data, result) {
  result(data);
};

Lesson.update = function (data, result) {
  result(data);
};

Lesson.delete = function (id, result) {
  result("Delete lesson have id " + id + " successfully!");
};

module.exports = Lesson;
