const apiRouter = require("express").Router();
const { getAllAPIS } = require("../controllers/api.controllers");
const loginRouter = require("./login.router");
const productsRouter = require("./products.router");

apiRouter.get("/", getAllAPIS);

apiRouter.use("/login", loginRouter);

apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
