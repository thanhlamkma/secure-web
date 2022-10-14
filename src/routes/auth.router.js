import express from "express";
import authController from "../controllers/auth.controller";
import _jwt from "../common/_jwt";

let router = express.Router();

let authRoutes = (app) => {
  // GET
  router.get("/auth", authController.auth);

  router.get("/forgot-password", authController.getForgotPassword);

  router.get("/logout", authController.logout);

  // POST
  router.post("/post-login", authController.postLogin);

  router.post("/post-register", authController.postRegister);

  router.post("/post-email-otp", authController.postEmailOtp);

  router.post("/post-forgot-password", authController.postForgotPassword);

  return app.use("/", router);

  // AUTHENTICATE
  // router.get("/token", async (req, res) => {
  //   var user = {
  //     name: "admin",
  //     email: "admin@gmail.com",
  //   };
  //   const _token = await jwt.make(user);
  //   res.send({ token: _token });
  // });

  // router.get("/check_token", async (req, res) => {
  //   try {
  //     var _token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY2NDgwOTc2MywiZXhwIjoxNjY0ODEzMzYzfQ.WcT6ugTxZurhkenwIkUHEqRBRU2nEmks4UoiJ1Eu4Ms";
  //     const data = await jwt.check(_token);
  //     res.send({ data: data });
  //   } catch (error) {
  //     res.send({ data: "Mã token không hợp lệ" });
  //   }
  // });
};

module.exports = authRoutes;
