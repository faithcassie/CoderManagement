var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv/config");
const cors = require("cors");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

var indexRouter = require("./routes/index");

var app = express();
//middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`DB connected.`))
  .catch((err) => console.log(err));

console.log(`Running on port ${port}`);
app.use("/api", indexRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = app;
