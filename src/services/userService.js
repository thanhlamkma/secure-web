import bcrypt from "bcrypt";
import db from "../models/index";

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
        roleId: data.roleId,
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
      let user = db.User.findOne({ where: { id: data.id } });
      if(user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.address = data.address;
        user.phone = data.phone;
        user.gender = data.gender;
      }
      await db.User.update({

      });
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
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser: createUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
};
