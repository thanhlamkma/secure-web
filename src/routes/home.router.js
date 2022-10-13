import express from "express";
import homeController from "../controllers/home.controller";
import _jwt from "../common/_jwt";
import _authMiddleware from "../middleware/_authMiddleware";

let router = express.Router();
const isAuth = _authMiddleware.isAuth;

let initRoutes = (app) => {
  // GET
  router.get("/", homeController.getHomePage);

  router.get("/profile/:id", homeController.getProfile);

  router.get("/change-password/:id", homeController.getChangePassword);

  // POST

  // PUT
  router.post("/put-user", homeController.putUser);

  router.post("/put-password/:id", homeController.changePassword);

  return app.use("/", router);
};

module.exports = initRoutes;
