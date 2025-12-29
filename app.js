const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
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

// middleware to parse JSON
app.use(express.json()); // important for req.body [web:83][web:89]
app.use(cors());

// db
MongoConnect();

//routes
app.get("/", (req, res) => {
  res.json({ message: "your Welcome" });
});
app.post("/create", PostReq);
app.get("/tasks", GetTasks);
app.put("/tasks/:id/toggle", ToggleComplete);
app.get("/tasks/completed", GetCompletedTasks);
app.delete("/tasks/:id", CompletedDelete);
app.delete("/delete/:id",DeleteTask)

app.listen(PORT, () => {
  console.log(`Backend is live At ${PORT}`);
});
