import bcrypt from "bcrypt";
import db from "../models/index";
import _jwt from "../common/_jwt";
import jwt from "jsonwebtoken";
import userService from "../services/userService";

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

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        let hashPassword = await userService.handleHashPassword(data.password);
        let success = await db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          gender: data.gender,
          roleId: data.roleId,
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
      // let password = await userService.handleHashPassword(data.password);
      let success = await db.User.update(
        { ...data, password: await userService.handleHashPassword(data.password) },
        {
          where: {
            id: data.id,
          },
        }
      );
      let user;
      if (success) {
        user = await db.User.findByPk(data.id, { raw: true });
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

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};
