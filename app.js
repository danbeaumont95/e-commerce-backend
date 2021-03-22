const express = require("express");
const homepageRouter = require("./routers/homepageRouter");
const apiRouter = require("./routers/api.router");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", homepageRouter);

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({
    status: 404,
    msg: "please go to the following path",
    path: "https://pitch-perfect-api.herokuapp.com/api",
  });
});

app.use((err, req, res, next) => {
  // handle custom error
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  // handle sql/database error
  if (err.code) {
    console.log(err);
    res.status(400).send({ msg: err.detail });
  }
});
app.use((err, req, res, next) => {
  // handle server error
  res.sendStatus(500);
});

module.exports = app;
