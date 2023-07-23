const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
let createUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let arrInput = ['email', 'password', 'fullName', 'address', 'gender', 'roleId', 'phoneNumber'];
            for (let index = 0; index < arrInput.length; index++) {
                if (!user[arrInput[index]]) {
                    resolve({
                        errorCode: 1,
                        errorMessage: `Missing parameter: ${arrInput[index]}.`,
                    });
                }
            }
            let check = checkEmail(user.email);
            if (check === true) {
                resolve({
                    errorCode: 2,
                    errorMessage: 'Email already exists.',
                });
            } else {
                let encryptPassword = await hashPassword(user.password);
                await db.User.create({
                    email: user.email,
                    password: encryptPassword,
                    fullName: user.fullName,
                    address: user.address,
                    gender: user.gender === "1" ? true : false,
                    roleId: user.roleId,
                    phoneNumber: user.phoneNumber,
                });
                resolve({
                    errorCode: 0,
                    errorMessage: 'Create user success.',
                });
            }
        } catch (error) {
            reject({
                errCode: 1,
                errMessage: error,
            });
        }
    });
}
let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
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
            users = await db.User.findAll({
                attributes: { exclude: ["password"] },
            });
            resolve(
                {
                    errCode: 0,
                    errMessage: "Ok",
                    users,
                }
            );
        } catch (error) {
            reject({
                errCode: 1,
                errMessage: error,
                users,
            });
        }
    });
}
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userFind = ""
            userFind = await db.User.findOne({
                where: { id: userId },
                attributes: { exclude: ['password'] }
            })
            if (userFind) {
                resolve(
                    {
                        errCode: 0,
                        errMessage: "Ok",
                        userFind
                    })
            } else {
                resolve(
                    {
                        errCode: 1,
                        errMessage: "Not Found User",
                        userFind
                    })
            }

        } catch (error) {
            reject({
                errCode: 1,
                errMessage: error,

            })
        }
    })
}
let editUser = (userEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userFind = await db.User.findOne({
                where: { id: userEdit.id },
                raw: false
            })
            if (userFind) {
                let arrEdit = ['email', 'fullName', 'address', 'gender', 'roleId', 'phoneNumber'];
                for (let index = 0; index < arrEdit.length; index++) {
                    userFind[arrEdit[index]] = userEdit[arrEdit[index]] === '' ? userFind[arrEdit[index]] : userEdit[arrEdit[index]]
                }
                await userFind.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Edit User success.'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Not Found User'
                })
            }
        } catch (error) {
            reject({
                errCode: 1,
                errorMessage: error
            })
        }
    })

}
let deleteUser = (userIdDelete) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userIdDelete) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing User Id need delete'
                })
            }
            let checkUserDelete = await db.User.findOne({
                where: { id: userIdDelete }
            })
            if (checkUserDelete) {
                await db.User.destroy({
                    where: { id: userIdDelete }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Delete User Success.'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Not Found User."
                })
            }
        } catch (error) {
            reject({
                errCode: 1,
                errMessage: error
            })
        }
    })

}
module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    getUserById: getUserById,
    editUser: editUser,
    deleteUser: deleteUser
}