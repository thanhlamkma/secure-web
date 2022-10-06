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
        gender: data.gender === "male" ? true : false,
        roleId: data.roleId,
      });
      resolve("Create user successfully");
      // console.log("data from service", data);
      // console.log("hassPassword", hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser: createUser,
};
