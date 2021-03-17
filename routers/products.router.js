const productsRouter = require("express").Router();
const {
  getAllProducts,
  postNewProduct,
} = require("../controllers/products.controllers");

productsRouter.route("/").get(getAllProducts).post(postNewProduct);

module.exports = productsRouter;
