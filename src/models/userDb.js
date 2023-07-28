const mongoose = require("mongoose");
const userDbSchema = new mongoose.Schema({
  email: String,
  password: { type: String, select: false },
  fullName: String,
  address: String,
  gender: String,
  roleId: String,
  image: String,
  phoneNumber: String,
  positionId: String
});
const User = mongoose.model("userdb", userDbSchema);
module.exports = User;
