const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskDescription: { type: String },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    }, //true or false
  },
  { timestamps: true }
);

const Task = new mongoose.model("Task", TaskSchema);

module.exports = Task;
