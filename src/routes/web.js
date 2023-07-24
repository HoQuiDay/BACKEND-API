const express = require('express')
const homeController = require('../controllers/homeController')
const router = express.Router();
// router.post('/create-user', createNewUser)
router.post('/api/createUser', homeController.handleCreateUser)
router.get('/api/getUser:id', homeController.handleGetUsers)
router.put('/api/editUser', homeController.handleEditUser)
router.delete('/api/deleteUser', homeController.handleDeleteUser)
module.exports = router