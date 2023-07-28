const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String
  },
  { _id: false }
);
const customerSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    email: String
  },
  { _id: false }
);
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: String,
    endDate: String,
    description: String,
    customerInfo: customerSchema,
    userInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "userdb" }],
    leader: userSchema,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }]
  },
  { timestamps: true }
);
projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
