var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var filesRouter = require("./routes/files");
var UserRouter = require("./routes/users.js");
require("dotenv").config();

var app = express();

app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://127.0.0.1:8020",
   "https://astro-ten.vercel.app/"
    "http://localhost:3001",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,accesstoken"
  );
  next();
});

const mongoose = require("mongoose");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("front-end/out"));
}
//these are routes
app.use("/", indexRouter);
app.use("/files", filesRouter);
app.use("/astro/v1/users", UserRouter);

//here is the mongodb connection
mongoose.Promise = global.Promise;
// Connect MongoDB at default port 27017.
mongoose.connect(
  process.env.CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Connected to MongoDb Successfully!");
    } else {
      console.log("error in connection", err);
    }
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
