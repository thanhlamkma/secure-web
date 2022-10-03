import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import homeRouter from "./routes/home.router";
import _authMiddleware from "./middleware/_authMiddleware";
import connectDb from "./config/connectDb";
require("dotenv").config();

let app = express();

// Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

viewEngine(app);

// Routers
homeRouter(app);

connectDb();

// app.use(_authMiddleware.isAuth);
// var lessonRouter = require("./routes/lesson.router");

// app.use("/", lessonRouter);

let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server listening on http://localhost:" + port);
});
