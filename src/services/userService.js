import bcrypt from "bcrypt";
import db from "../models/index";
import _jwt from "../common/_jwt";
import randToken from "rand-token";
import jwt from "jsonwebtoken";

const saltRounds = 10;

let handleHashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(password, saltRounds).then(function (hash) {
        resolve(hash);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: data.email },
        raw: true,
      });
      if (!user) resolve();

      let isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) resolve();

      const accessToken = await _jwt.make({
        email: user.email,
        role: user.role,
        id: user.id,
      });
      if (!accessToken) resolve();

      let refreshToken = randToken.generate(process.env.REFRESH_TOKEN_SIZE);
      if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await db.User.update(
          { ...user, refreshToken: refreshToken },
          { where: { id: user.id } }
        );
      } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
      }
      // console.log("object", { ...user, refreshToken, accessToken });
      resolve({ ...user, refreshToken, accessToken });
    } catch (error) {
      reject(error);
    }
  });
};

let refreshToken = async (req, res) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  if (!accessTokenFromHeader) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "Don't find this access token" });
  }

  // Lấy refresh token từ body
  const refreshTokenFromBody = req.body.refreshToken;
  if (!refreshTokenFromBody) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "Don't find this refresh token" });
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

  // Decode access token đó
  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
    ignoreExpiration: true,
  });
  if (!decoded) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "Access token is invalid" });
  }

  const email = decoded.payload.email; // Lấy username từ payload

  const user = await db.User.findOne({ where: { email: email }, raw: true });
  if (!user) {
    return res.status(401).send("User không tồn tại.");
  }

  if (refreshTokenFromBody !== user.refreshToken) {
    return res.status(400).send("Refresh token không hợp lệ.");
  }

  // Tạo access token mới
  const dataForAccessToken = {
    username,
  };

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife
  );
  if (!accessToken) {
    return res
      .status(400)
      .send("Tạo access token không thành công, vui lòng thử lại.");
  }
  return res.json({
    accessToken,
  });
};

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        let hashPassword = await handleHashPassword(data.password);
        let success = await db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          gender: data.gender,
        });
        resolve(success);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let success = await db.User.update(data, {
        where: {
          id: data.id,
        },
      });
      let user;
      if (success) {
        user = await db.User.findByPk(data.id);
        resolve(user);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findByPk(id, {
        raw: true,
      });
      if (user) resolve(user);
      else resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let updatePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findByPk(data.id, {
        raw: true,
      });

      console.log("user", user);
      if (user) {
        let success = await bcrypt.compare(data.currentPassword, user.password);
        console.log("success", success);

        if (success) {
          await db.User.update(
            { ...user, password: await handleHashPassword(data.newPassword) },
            {
              where: {
                id: data.id,
              },
            }
          );
          resolve(user);
        } else resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  login: login,

  createUser: createUser,
  updateUser: updateUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updatePassword: updatePassword,

  handleHashPassword: handleHashPassword,
  refreshToken: refreshToken,
};
