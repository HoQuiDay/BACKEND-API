const Task = require("../models/task");
const aqp = require("api-query-params");
module.exports = {
  createTask: async (task) => {
    try {
      if (task.type === "EMPTY-TASK") {
        let result = await Task.create(task);
        return result;
      }
    } catch (error) {
      return null;
    }
  },
  getTasks: async (task) => {
    try {
      if (task.Id) {
        let result = await Task.findById(task.id);
        return result;
      } else {
        if (!task.page && !task.limit) {
          let result = await Task.find({});
          return result;
        } else {
          let offset = (task.page - 1) * task.limit;
          let { filter, limit } = aqp(task);
          delete filter.page;
          let result = await Task.find(filter).limit(limit).skip(offset).exec();
          return result;
        }
      }
    } catch (error) {
      return null;
    }
  },
  editTask: async (task) => {
    try {
      let id = task.taskId;
      delete task.taskId;
      let resolve = await Task.updateOne({ _id: id }, task);
      console.log("🚀 >>>>> editTask: >>>>> task:", task);
      return resolve;
    } catch (error) {
      return null;
    }
  },

  deleteTask: async (taskId) => {
    try {
      let resolve = await Task.deleteById(taskId);
      return resolve;
    } catch (error) {
      return null;
    }
  }
};
