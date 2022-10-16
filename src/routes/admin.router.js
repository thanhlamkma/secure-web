import express from "express";
import adminController from "../controllers/admin.controller";
import _jwt from "../common/_jwt";

let router = express.Router();

let adminRoutes = (app) => {
  // GET
  router.get("/", adminController.getManagePage);
  router.get("/user/:id", adminController.getUserInfo);
  router.get("/permission", adminController.getPermission);
  router.get("/permission/:id", adminController.getUserPermission);

  // POST
  router.post("/add-user", adminController.addUser);

  // PUT
  router.post("/edit-user", adminController.editUser);

  // DELETE
  router.post("/delete-user", adminController.deleteUser);

  return app.use("/admin", router);
};

module.exports = adminRoutes;
