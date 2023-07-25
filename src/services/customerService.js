const Customer = require("../models/customers");
module.exports = {
  createCustomer: async (customer) => {
    try {
      let result = await Customer.create(customer);
      return result;
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  },
  createCustomers: async (customer) => {
    try {
      let result = await Customer.insertMany(customer);
      return result;
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  },
  getCustomer: async (customerId) => {
    try {
      if (customerId) {
        let result = await Customer.findById(customerId);
        return result;
      } else {
        let result = await Customer.find({});
        return result;
      }
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  },
  editCustomer: async (customer) => {
    try {
      let result = await Customer.updateOne({ _id: customer._id }, customer);
      return result;
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  },
  deleteCustomer: async (customerID) => {
    try {
      let result = await Customer.deleteById(customerID);
      return result;
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  },
  deleteListCustomer: async (listCustomerID) => {
    try {
      let result = await Customer.delete({ _id: { $in: listCustomerID } });
      console.log("🚀 >>>>> deleteListCustomer: >>>>> result:", result);
      return result;
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  }
};
