const db = require("../common/connect");

const Lesson = function (lesson) {
  this.id = lesson.id;
  this.name = lesson.name;
  this.course = lesson.course;
  this.teacherName = lesson.teacherName;
};

Lesson.getAll = function (result) {
  db.query("SELECT * FROM lessons", (err, lesson) => {
    if (err) result(null);
    else result(lesson);
  });
};

Lesson.getById = function (id, result) {
  db.query("SELECT * FROM lessons WHERE id = ?", id, (err, lesson) => {
    if (err || lesson.length === 0) {
      console.log("error:", err);
      result(null);
    } else {
      result(lesson);
    }
  });
};

Lesson.create = function (data, result) {
  db.query("INSERT INTO lessons SET ?", data, (err, lesson) => {
    if (err) result(null);
    else result({ id: lesson.insertId, ...data });
  });
};

Lesson.update = function (data, result) {
  db.query(
    "UPDATE lessons SET name=?, course=?, teacherName=? WHERE id=?",
    [data.name, data.course, data.teacherName, data.id],
    (err, lesson) => {
      if (err) result(null);
      else result(data);
    }
  );
};

Lesson.delete = function (id, result) {
  db.query("DELETE FROM lessons WHERE id = ?", id, (err, lesson) => {
    if (err) result(null);
    else result("Xóa dữ liệu bài giảng có id = " + id + " thành công");
  });
};

module.exports = Lesson;
