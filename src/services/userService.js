import bcrypt from "bcrypt";
import db from "../models/index";
import _jwt from "../common/_jwt";
import randToken from "rand-token";

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

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await handleHashPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone,
        gender: data.gender,
        // roleId: data.roleId,
      });
      resolve("Create user successfully");
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

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.destroy({
        where: {
          id: id,
        },
      });
      resolve(data);
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
  deleteUserById: deleteUserById,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updatePassword: updatePassword,

  handleHashPassword: handleHashPassword,
};
