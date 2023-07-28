const { uploadSingleFile } = require("../services/uploadFileServices");
const {
  createCustomer,
  createCustomers,
  getCustomer,
  editCustomer,
  deleteCustomer,
  deleteListCustomer
} = require("../services/customerService");
module.exports = {
  handleCreateCustomer: async (req, res) => {
    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }
    let customerData = { ...req.body, image: imageUrl };
    let customer = await createCustomer(customerData);
    if (customer) {
      return res.status(200).json({
        EC: 0,
        data: customer
      });
    } else {
      return res.status(200).json({
        EC: 1,
        data: customer
      });
    }
  },
  handleCreateCustomers: async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      let result = await createCustomers(req.body.Customers);
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
  },
  handleGetCustomer: async (req, res) => {
    let result = await getCustomer(req.query);
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
  handleEditCustomer: async (req, res) => {
    let result = await editCustomer(req.body);
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
  handleDeleteCustomer: async (req, res) => {
    let result = "";
    if (Array.isArray(req.body.id)) {
      result = await deleteListCustomer(req.body.id);
    } else {
      result = await deleteCustomer(req.body.id);
    }
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
