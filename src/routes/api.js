const express = require('express')
const homeController = require('../controllers/homeController')
const apiRouters = express.Router();
// router.post('/create-user', createNewUser)
apiRouters.post('/user', homeController.handleCreateUser)
apiRouters.get('/user', homeController.handleGetUsers)
apiRouters.put('/user', homeController.handleEditUser)
apiRouters.delete('/user', homeController.handleDeleteUser)
module.exports = apiRouters