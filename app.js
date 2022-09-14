var express = require("express");
var app = express();

// Routers
var homeRouter = require("./app/routes/home.router");

app.use("/", homeRouter);

app.listen(3000, function () {
  console.log("Server listening on http://localhost:3000");
});
