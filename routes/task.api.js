const express = require("express");
const {
  createTask,
  getTask,
  getAllTasks,
  editTask,
  deleteTask,
} = require("../controller/task.controller");
const router = express.Router();

//  CREATE A NEW TASK
router.post("/", createTask);

// READ ALL TASKS WITH FILTER ( name, status, createdAt, updatedAt)
router.get("/", getAllTasks);

//READ A TASK BY ID
router.get("/:id", getTask);

// UPDATE - assignedTo, status
router.put("/:id", editTask);

// DELETE
router.delete("/:id", deleteTask);

module.exports = router;
