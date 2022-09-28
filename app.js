var express = require("express");
var app = express();

// Setup body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Routers
var homeRouter = require("./app/routes/home.router");
var lessonRouter = require("./app/routes/lesson.router");

app.use("/", homeRouter);
app.use("/", lessonRouter);

app.listen(3000, function () {
  console.log("Server listening on http://localhost:3000");
});
