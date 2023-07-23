const { response } = require('express');
const apiServices = require('../services/apiServices')
let handleCreateUser = async (req, res) => {
    let user = req.body;
    let message = await apiServices.createUser(user);
    return res.status(200).json(message)
};
let handleGetAllUsers = async (req, res) => {
    let users = await apiServices.getAllUsers();
    return res.status(200).json(users)
}
let handleGetUserById = async (req, res) => {
    let userId = req.query.id;
    let message = await apiServices.getUserById(userId);
    return res.status(200).json(message)
};
let handleEditUser = async (req, res) => {
    let userEdit = req.body;
    let message = await apiServices.editUser(userEdit);
    return res.status(200).json(message)
};
let handleDeleteUser = async (req, res) => {
    let userIdDelete = req.body.id;
    let message = await apiServices.deleteUser(userIdDelete);
    return res.status(200).json(message)
};
module.exports = {
    handleCreateUser: handleCreateUser,
    handleGetAllUser: handleGetAllUsers,
    handleGetUserById: handleGetUserById,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}


