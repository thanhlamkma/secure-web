import express from "express";
import homeController from "../controllers/home.controller";
import _jwt from "../common/_jwt";

let router = express.Router();

let initRoutes = (app) => {
  // GET
  router.get("/", homeController.getHomePage);

  router.get("/profile/:id", homeController.getProfile);

  router.get("/change-password/:id", homeController.getChangePassword);

  router.get("/auth", homeController.auth);

  // POST
  router.post("/post-login", homeController.postLogin);

  router.post("/post-register", homeController.postRegister);

  // PUT
  router.post("/put-user", homeController.putUser);

  // AUTHENTICATE
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
