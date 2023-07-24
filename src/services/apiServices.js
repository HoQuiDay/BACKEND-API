const User = require("../models/userDb");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
let createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmailFormat = /\S+@\S+\.\S+/;
      let arrInput = ["email", "password", "fullName", "address", "gender", "roleId", "phoneNumber"];
      for (let index = 0; index < arrInput.length; index++) {
        if (!user[arrInput[index]]) {
          resolve({
            errorCode: 1,
            errorMessage: `Missing parameter: ${arrInput[index]}.`
          });
        }
      }
      let check = await checkEmail(user.email);
      if (checkEmailFormat.test(user.email) === false) {
        resolve({
          errorCode: 1,
          errorMessage: `Email format is not correct`
        });
      } else if (check === true) {
        resolve({
          errorCode: 2,
          errorMessage: "Email already exists."
        });
      } else {
        let encryptPassword = await hashPassword(user.password);
        await User.create({
          email: user.email,
          password: encryptPassword,
          fullName: user.fullName,
          address: user.address,
          gender: user.gender === "1" ? true : false,
          roleId: user.roleId,
          phoneNumber: user.phoneNumber
        });
        resolve({
          errorCode: 0,
          errorMessage: "Create user success."
        });
      }
    } catch (error) {
      reject({
        errCode: 1,
        errMessage: error
      });
    }
  });
};
let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        email: userEmail
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      users = await User.find({}, "-password");
      resolve({
        errCode: 0,
        errMessage: "Get All User Success:",
        users
      });
    } catch (error) {
      reject({
        errCode: 1,
        errMessage: error,
        users
      });
    }
  });
};
let getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userFind = "";
      userFind = await User.findOne(
        {
          id: userId
        },
        "-password"
      );
      if (userFind) {
        resolve({
          errCode: 0,
          errMessage: "Ok",
          userFind
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Not Found User",
          userFind
        });
      }
    } catch (error) {
      reject({
        errCode: 1,
        errMessage: error
      });
    }
  });
};
let editUser = (userEdit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userFind = await User.findOne({ _id: userEdit.id });
      if (userFind) {
        let arrEdit = ["email", "fullName", "address", "gender", "roleId", "phoneNumber"];
        for (let index = 0; index < arrEdit.length; index++) {
          userFind[arrEdit[index]] =
            userEdit[arrEdit[index]] === "" ? userFind[arrEdit[index]] : userEdit[arrEdit[index]];
        }
        let data = await User.updateOne({ _id: userEdit.id }, userFind);
        resolve({
          errCode: 0,
          errMessage: "Edit User success.",
          data
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Not Found User"
        });
      }
    } catch (error) {
      reject({
        errCode: 1,
        errorMessage: error
      });
    }
  });
};
let deleteUser = (userIdDelete) => {

  return new Promise(async (resolve, reject) => {
    try {
      if (!userIdDelete) {
        resolve({
          errCode: 2,
          errMessage: "Missing User Id."
        });
      }
      let checkUserDelete = await User.findOne({ _id: userIdDelete });
      if (!checkUserDelete) {
        resolve({
          errCode: 2,
          errMessage: "Not Found User."
        });
      } else {
        let userDelete = await User.deleteOne({ _id: userIdDelete });
        resolve({
          errCode: 0,
          errMessage: "Delete User Success.",
          userDelete
        });
      }
    } catch (error) {
      console.log("🚀 >>>>> returnnewPromise >>>>> error:", error.reason)
      reject({
        errCode: 1,
        errMessage: error.reason
      });
    }
  });
};
module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUserById: getUserById,
  editUser: editUser,
  deleteUser: deleteUser
};
