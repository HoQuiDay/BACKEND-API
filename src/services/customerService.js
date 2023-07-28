const Customer = require("../models/customers");
const aqp = require("api-query-params");
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
  getCustomer: async (customer) => {
    try {
      if (customer.id) {
        let result = await Customer.findById(customer.id);
        return result;
      } else {
        if (!customer.page && !customer.limit) {
          let result = await Customer.find({});
          return result;
        } else {
          let offset = (customer.page - 1) * customer.limit;
          let { filter } = aqp(customer);
          delete filter.page;
          let result = await Customer.find(filter).limit(customer.limit).skip(offset).exec();
          return result;
        }
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

      return result;
    } catch (error) {
      console.log("🚀 >>>>> createCustomer: >>>>> error:", error);
      return null;
    }
  }
};
