import bcrypt from "bcrypt";
import db from "../models/index";
import _jwt from "../common/_jwt";
import randToken from "rand-token";
import jwt from "jsonwebtoken";

const saltRounds = 10;

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
          roleId: data.roleId
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
  createUser: createUser,
  updateUser: updateUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updatePassword: updatePassword,
};
