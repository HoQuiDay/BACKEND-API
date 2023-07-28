const Project = require("../models/project");
const aqp = require("api-query-params");
module.exports = {
  createProject: async (project) => {
    try {
      if (project.type === "EMPTY-PROJECT") {
        let result = await Project.create(project);
        return result;
      } else if (project.type === "ADD-USER") {
        let myProject = await Project.findById(project.projectId).exec();
        for (let i = 0; i < project.userInfo.length; i++) {
          await myProject.userInfo.push(project.userInfo[i]);
        }
        let result = await myProject.save();
        return result;
      } else if (project.type === "REMOVE-USERS") {
        let myProject = await Project.findById(project.projectId).exec();
        for (let i = 0; i < project.userInfo.length; i++) {
          await myProject.userInfo.pull(project.userInfo[i]);
        }
        let result = await myProject.save();
        return result;
      }
    } catch (error) {
      return null;
    }
  },
  getProjects: async (project) => {
    try {
      let { population } = aqp(project);
      console.log("🚀 >>>>> getProjects: >>>>> population:", population);
      if (project.Id) {
        let result = await Project.findById(project.id).populate(population);
        return result;
      } else {
        if (!project.page && !project.limit) {
          let result = await Project.find({}).populate(population);
          return result;
        } else {
          let offset = (project.page - 1) * project.limit;
          let { filter, limit } = aqp(project);
          delete filter.page;
          let result = await Project.find(filter).populate(population).limit(limit).skip(offset).exec();
          return result;
        }
      }
    } catch (error) {
      return null;
    }
  },
  editProject: async (project) => {
    try {
      let id = project.projectId;
      delete project.projectId;
      let resolve = await Project.updateOne({ _id: id }, project);
      console.log("🚀 >>>>> editProject: >>>>> project:", project);
      return resolve;
    } catch (error) {
      return null;
    }
  },

  deleteProject: async (projectId) => {
    try {
      let resolve = await Project.deleteById(projectId);
      return resolve;
    } catch (error) {
      return null;
    }
  }
};
