import express from "express";
import adminController from "../controllers/admin.controller";
import _jwt from "../common/_jwt";

let router = express.Router();

let adminRoutes = (app) => {
  // GET
  router.get("/", adminController.getManagePage);

  // POST
  router.post("/post-user", adminController.postUser);

  // PUT
  router.post("/put-user", adminController.putUser);

  // DELETE
  router.get("/delete-user/:id", adminController.deleteUser);

  return app.use("/admin", router);
};

module.exports = adminRoutes;
