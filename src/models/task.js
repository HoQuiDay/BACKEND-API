const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String
  },
  { _id: false }
);
const projectSchema = new mongoose.Schema(
  {
    name: String,
    startDate: String,
    endDate: String,
    description: String
  },
  { _id: false }
);
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    userInfo: userSchema,
    projectInfo: projectSchema,
    status: String,
    startDate: String,
    endDate: String
  },
  { timestamps: true }
);
taskSchema.plugin(mongoose_delete, { overrideMethods: "all" });
let Task = mongoose.model("Task", taskSchema);
module.exports = Task;
