import express from "express";
import homeController from "../controllers/home.controller";
import _jwt from "../common/_jwt";

let router = express.Router();

let initRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  router.get("/crud", homeController.getCrud);

  router.post("/post-crud", homeController.postCrud);

  router.post("/login", homeController.login);

  router.post("/register", homeController.register);

  router.get("/token", async (req, res) => {
    var user = {
      name: "admin",
      email: "admin@gmail.com",
    };
    const _token = await jwt.make(user);
    res.send({ token: _token });
  });

  router.get("/check_token", async (req, res) => {
    try {
      var _token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY2NDgwOTc2MywiZXhwIjoxNjY0ODEzMzYzfQ.WcT6ugTxZurhkenwIkUHEqRBRU2nEmks4UoiJ1Eu4Ms";
      const data = await jwt.check(_token);
      res.send({ data: data });
    } catch (error) {
      res.send({ data: "Mã token không hợp lệ" });
    }
  });

  return app.use("/", router);
};

module.exports = initRoutes;
