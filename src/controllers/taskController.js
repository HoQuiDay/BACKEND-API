const { createTask, getTasks, editTask, deleteTask } = require("../services/taskServices");
const Joi = require("joi");
module.exports = {
  handleCreateTask: async (req, res) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email()
    });
    let result = await createTask(req.body);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result
      });
    } else {
      return res.status(200).json({
        EC: 1,
        data: result
      });
    }
  },
  handleGetTasks: async (req, res) => {
    let result = await getTasks(req.query);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result
      });
    } else {
      return res.status(200).json({
        EC: 1,
        data: result
      });
    }
  },
  handleEditTask: async (req, res) => {
    let result = await editTask(req.body);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result
      });
    } else {
      return res.status(200).json({
        EC: 1,
        data: result
      });
    }
  },
  handleDeleteTask: async (req, res) => {
    let result = await deleteTask(req.body.projectId);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result
      });
    } else {
      return res.status(200).json({
        EC: 1,
        data: result
      });
    }
  }
};
