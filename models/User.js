const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Manager", "Employee"],
      default: "Employee", //not sure
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre(/^find/, function (next) {
  if (!("isDeleted" in userSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
