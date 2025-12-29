// taskController.js - Complete Fixed Controller
const Task = require("../models/task");

const PostReq = async (req, res) => {
  try {
    // ✅ FIX: Don't overwrite req, use req.body directly
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(400).json({ error: err.message });
  }
};

const GetTasks = async (req, res) => {
  try {
    // ✅ Get all tasks (both pending and completed)
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Fetch tasks error:", error);
    // ✅ FIX: Always send error response
    res.status(500).json({ error: "Internal server error" });
  }
};

const ToggleComplete = async (req, res) => {
  try {
    // ✅ Validate input
    if (typeof req.body.isCompleted !== "boolean") {
      return res.status(400).json({ error: "isCompleted must be boolean" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isCompleted: req.body.isCompleted },
      { new: true, runValidators: true } // ✅ return updated doc + validate
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Toggle task error:", err);
    res.status(500).json({ error: err.message });
  }
};

const GetCompletedTasks = async (req, res) => {
  try {
    // ✅ Get only completed tasks
    const completedTasks = await Task.find({ isCompleted: true });
    res.json(completedTasks);
  } catch (err) {
    console.error("Fetch completed tasks error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const CompletedDelete = async (req, res) => {
  try {
    // ✅ Delete by MongoDB _id (for completed tasks only)
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete completed task error:", err);
    res.status(500).json({ error: err.message });
  }
};

const DeleteTask = async (req, res) => {
  try {
    // ✅ FIX: Pass id directly, not { id }
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  PostReq,
  GetTasks,
  ToggleComplete,
  GetCompletedTasks,
  CompletedDelete,
  DeleteTask,
};
