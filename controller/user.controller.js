const mongoose = require("mongoose");
const User = require("../models/User");
const Task = require("../models/Task");
const { createCustomError } = require("../middleware/custom-error");

const userController = {};

//  CREATE NEW USER WITH NAME
/**
 * @route POST api/users
 * @description Create a new user
 * @access private, manager
 * @requiredBody: name
 */
userController.createUser = async (req, res, next) => {
  // req.body.createdBy = req.user.userId;
  const user = await User.create(req.body);
  res.status(201).json({ user });
};

// GET ALL USERS WITH FILTERS
/**
 * @route GET api/users
 * @description Get a list of users
 * @access private
 * @allowedQueries: name
 */
userController.getAllUsers = async (req, res, next) => {
  try {
    const { name, role } = req.query;
    // console.log(name);
    let filter = {};
    if (name) {
      filter = { name: { $regex: name, $options: "i" } };
    }
    if (role) {
      filter.role = role;
    }
    const users = await User.find(filter);

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  SEARCH FOR AN EMPLOYEE BY NAME?
/**
 * @route GET api/users
 * @description Get user by id
 * @access public
 */
userController.getUser = async (req, res, next) => {
  try {
    const { name } = req.query;
    const task = await User.findOne(name);
    if (!task) {
      return next(createCustomError(`No user with name ${name}`), 404);
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS OF 1 USER ( BY NAME OR BY ID)
/**
 * @route GET api/users/:id
 * @description Get all tasks by user id
 * @access public
 */
userController.getTasksByUserId = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    const tasks = await Task.find({ assignedTo: userId });
    if (!tasks) {
      return next(createCustomError(`No task with user id ${userId}`), 404);
    }
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
