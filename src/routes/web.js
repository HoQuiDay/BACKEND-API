const express = require('express')
const homeController = require('../controllers/homeController')
const router = express.Router();
// router.post('/create-user', createNewUser)
router.post('/api/createUser', homeController.handleCreateUser)
router.get('/api/getAllUser', homeController.handleGetAllUser)
router.get('/api/getUserById:id', homeController.handleGetUserById)
router.put('/api/editUser', homeController.handleEditUser)
router.delete('/api/deleteUser', homeController.handleDeleteUser)
module.exports = router