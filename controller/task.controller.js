const mongoose = require("mongoose");

const Task = require("../models/Task");
const { createCustomError } = require("../middleware/custom-error");
const taskController = {};

//  CREATE A NEW TASK
/**
 * @route POST api/tasks
 * @description Create a new task
 * @access private, manager
 * @requiredBody: name, description, status
 */
taskController.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS
/**
 * @route GET api/tasks/
 * @description Get tasks
 * @access public
 */
taskController.getAllTasks = async (req, res, next) => {
  try {
    const { name, status, createdAt, updatedAt } = req.query;
    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }
    const tasks = await Task.find(filter);
    //sort
    if (createdAt) {
      tasks = tasks.sort("createdAt");
    }
    if (updatedAt) {
      tasks = tasks.sort("updatedAt");
    }
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// GET A SINGLE TASK BY ID
/**
 * @route PUT api/tasks/:id
 * @description Get data of a task by id
 */
taskController.getTask = async (req, res, next) => {
  try {
    const {
      params: { id: taskId },
    } = req;
    const task = await Task.findOne({
      _id: taskId,
    });
    if (!task) {
      return next(createCustomError(`No task with id ${taskId}`, 404));
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

// ASSIGN A TASK TO A USER OR UNASSIGN
/**
 * @route PUT api/tasks/:id
 * @description Update data of a task
 * @access private, manager
 * @requiredBody: status
 * when the status is set to done,
 * it can't be changed to other value except archive
 */
taskController.editTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { assignedTo, status } = req.query;
    let updateBody = {};
    if (assignedTo) {
      updateBody.assignedTo = assignedTo;
    }
    console.log(status);
    if (status) {
      updateBody.status = status;
    }
    const isArchived = await Task.findOne({
      _id: taskId,
      status: "archive",
    });
    if (status && isArchived) {
      return next(createCustomError(`Task with id ${taskId} is archived`, 400));
    }
    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },
      updateBody,
      { runValidators: true, new: true }
    );

    if (!task) {
      return next(createCustomError(`No task with id ${taskId}`, 404));
    }

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

// DELETE
/**
 * @route DELETE api/tasks/:id
 * @description Delete a task
 * @access private, manager
 */
taskController.deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!task) {
      return next(createCustomError(`No task with id ${taskId}`, 404));
    }
    res.status(200).json({ message: "Deleted task successfully", task });
  } catch (error) {
    next(error);
  }
};

module.exports = taskController;
