import express from "express";
import homeController from "../controllers/home.controller";
import authController from "../controllers/auth.controller";
import _jwt from "../common/_jwt";

let router = express.Router();

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
