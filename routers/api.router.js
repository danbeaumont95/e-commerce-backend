const apiRouter = require("express").Router();
const { getAllAPIS } = require("../controllers/api.controllers");
const loginRouter = require("./login.router");
const productsRouter = require("./products.router");
const sellersRouter = require("./sellers.router");
const usersRouter = require("./users.router");

apiRouter.get("/", getAllAPIS);

apiRouter.use("/login", loginRouter);

apiRouter.use("/products", productsRouter);

apiRouter.use("/sellers", sellersRouter);

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
