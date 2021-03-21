const apiRouter = require("express").Router();
const { getAllAPIS } = require("../controllers/api.controllers");
const loginRouter = require("./login.router");
const productsRouter = require("./products.router");
const sellersRouter = require("./sellers.router");

apiRouter.get("/", getAllAPIS);

apiRouter.use("/login", loginRouter);

apiRouter.use("/products", productsRouter);

apiRouter.use("/sellers", sellersRouter);

module.exports = apiRouter;
