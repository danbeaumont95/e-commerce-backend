const apiRouter = require("express").Router();
const { getAllAPIS } = require("../controllers/api.controllers");
const loginRouter = require("./login.router");

apiRouter.get("/", getAllAPIS);

apiRouter.use("/login", loginRouter);

module.exports = apiRouter;
