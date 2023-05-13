const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  getTasksByUserId,
} = require("../controller/user.controller");
const router = express.Router();

//  CREATE A NEW USER
router.post("/", createUser);

// READ ALL USERS WITH FILTERS ( NAME??? ROLES ) url/api/users?name=ABC
router.get("/", getAllUsers);

//SEARCH A USER BY NAME ??? DUPLICATE ROUTE? url/api/users?name=ABC
router.get("/", getUser);

// READ ALL TASKS OF 1 USER ( BY NAME OR BY USER ID)
router.get("/:id/tasks", getTasksByUserId);

module.exports = router;
