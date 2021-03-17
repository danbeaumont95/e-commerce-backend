const productsRouter = require("express").Router();
const { getAllProducts } = require("../controllers/products.controllers");

productsRouter.route("/").get(getAllProducts);

module.exports = productsRouter;
