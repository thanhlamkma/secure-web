import db from "../models/index";
import _jwt from "../common/_jwt";
import userService from "../services/userService";

let getPermissionByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        where: {
          userId: userId,
        },
        raw: true,
      });
      if (user) resolve(user);
      else resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let createPermission = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let success = await db.Permission.create(data);
      resolve(success);
    } catch (error) {
      reject(error);
    }
  });
};

let updatePermission = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Permission.findOne({
        where: { userId: data.userId },
      });
      if (!user) createPermission(data);
      let success = await db.Permission.update(data, {
        where: {
          userId: data.userId,
        },
      });
      if (success) resolve(success);
      else resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getPermissionByUserId,
  createPermission,
  updatePermission,
};
