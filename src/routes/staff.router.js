import express from "express";
import staffController from "../controllers/staff.controller";

let router = express.Router();

let staffRoutes = (app) => {
  // GET
  router.get("/", staffController.getHomePage);

  router.get("/profile/:id", staffController.getProfile);

  router.get("/change-password/:id", staffController.getChangePassword);

  // POST

  // PUT
  router.post("/put-user", staffController.putUser);

  router.post("/put-password/:id", staffController.changePassword);

  return app.use("/staff", router);
};

module.exports = staffRoutes;
