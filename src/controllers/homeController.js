const apiServices = require('../services/apiServices')
const uploadFileServices = require('../services/uploadFileServices')
let handleCreateUser = async (req, res) => {
    let user = req.body;
    let message = await apiServices.createUser(user);
    return res.status(200).json(message)
};
let handleGetUsers = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        let users = await apiServices.getAllUsers();
        return res.status(200).json(users)
    } else {
        let message = await apiServices.getUserById(userId);
        return res.status(200).json(message)
    }
}
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
let handleUploadSingleFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    } else {
        file = req.files.importFile;
        let message = await uploadFileServices.uploadSingleFile(file)
        return res.status(200).json(message)
    }
}
let handleUploadMultipleFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    } else {
        listFiles = req.files.importFile;
        let message = await uploadFileServices.uploadMultipleFile(listFiles)
        return res.status(200).json(message)
    }
}
module.exports = {
    handleCreateUser: handleCreateUser,
    handleGetUsers: handleGetUsers,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleUploadSingleFile: handleUploadSingleFile,
    handleUploadMultipleFile: handleUploadMultipleFile
}


