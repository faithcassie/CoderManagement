const express = require("express");
const router = express.Router();

/* USER API. */
const userAPI = require("./user.api");
router.use("/users", userAPI);
/* TASK API. */

const taskAPI = require("./task.api");
router.use("/tasks", taskAPI);

module.exports = router;
