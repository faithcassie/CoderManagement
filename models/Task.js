const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    description: {
      type: String,
      required: [true, "Please provide decription"],
    },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      required: [true, "Please provide status"],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Please provide user"],
    // },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre(/^find/, function (next) {
  if (!("isDeleted" in taskSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }

  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
