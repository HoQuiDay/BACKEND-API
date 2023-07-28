const { createProject, getProjects, editProject, deleteProject } = require("../services/projectService");
module.exports = {
  handleCreateProject: async (req, res) => {
    let result = await createProject(req.body);
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
  handleGetProjects: async (req, res) => {
    let result = await getProjects(req.query);
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
  handleEditProject: async (req, res) => {
    let result = await editProject(req.body);
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
  handleDeleteProject: async (req, res) => {
    let result = await deleteProject(req.body.projectId);
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
