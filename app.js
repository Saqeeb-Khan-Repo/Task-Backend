const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080; // Match your container port
const app = express();
const MongoConnect = require("./db/Mongo");
const {
  PostReq,
  GetTasks,
  ToggleComplete,
  GetCompletedTasks,
  CompletedDelete,
  DeleteTask,
} = require("./controllers/controller");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Your backend is live" });
});

// ✅ FIXED ROUTES
app.post("/create", PostReq);
app.get("/tasks", GetTasks);
app.put("/tasks/:id/toggle", ToggleComplete);
app.get("/tasks/completed", GetCompletedTasks);
app.delete("/tasks/:id", DeleteTask); // General delete
app.delete("/tasks/completed/:id", CompletedDelete); // Completed delete

// ✅ WAIT FOR DB BEFORE STARTING SERVER
const startServer = async () => {
  try {
    await MongoConnect();
    app.listen(PORT, () => {
      console.log(`✅ Backend is live At ${PORT} | MongoDB Connected`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
