const express = require("express");
const homeController = require("../controllers/homeController");
const customerController = require("../controllers/customerController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const apiRouters = express.Router();
// router.post('/create-user', createNewUser)
apiRouters.post("/user", homeController.handleCreateUser);
apiRouters.get("/user", homeController.handleGetUsers);
apiRouters.put("/user", homeController.handleEditUser);
apiRouters.delete("/user", homeController.handleDeleteUser);
//api import files
apiRouters.post("/file", homeController.handleUploadSingleFile);
apiRouters.post("/files", homeController.handleUploadMultipleFile);
//api customer
apiRouters.post("/customer", customerController.handleCreateCustomer);
apiRouters.post("/customers", customerController.handleCreateCustomers);
apiRouters.get("/customer", customerController.handleGetCustomer);
apiRouters.put("/customer", customerController.handleEditCustomer);
apiRouters.delete("/customer", customerController.handleDeleteCustomer);
//api project
apiRouters.post("/project", projectController.handleCreateProject);
apiRouters.get("/project", projectController.handleGetProjects);
apiRouters.put("/project", projectController.handleEditProject);
apiRouters.delete("/project", projectController.handleDeleteProject);
apiRouters.post("/task", taskController.handleCreateTask);
apiRouters.get("/task", taskController.handleGetTasks);
apiRouters.put("/task", taskController.handleEditTask);
apiRouters.delete("/task", taskController.handleDeleteTask);
module.exports = apiRouters;
