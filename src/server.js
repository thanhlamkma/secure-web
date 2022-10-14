import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import authRouter from "./routes/auth.router";
import homeRouter from "./routes/home.router";
import adminRouter from "./routes/admin.router";
import _authMiddleware from "./middleware/_authMiddleware";
import expressEjsLayouts from "express-ejs-layouts";
import connectDb from "./config/connectDb";
import flash from "req-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
require("dotenv").config();

let app = express();

// Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Setup flash
app.use(cookieParser());
app.use(session({ secret: "secret" }));
app.use(flash());

// Static files
// app.use("/js", express.static(__dirname + "/public/js"));
app.use(express.static(__dirname + "/public"));

// Set templating engine
app.use(expressEjsLayouts);
app.set("layout", false);
viewEngine(app);

// Routers
authRouter(app);
app.use(_authMiddleware.isAuth);
homeRouter(app);
adminRouter(app);
app.get("*", function (req, res) {
  res.status(404).render("404.ejs");
});

connectDb();

// var lessonRouter = require("./routes/lesson.router");

// app.use("/", lessonRouter);

let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server listening on http://localhost:" + port);
});
