const productsRouter = require("express").Router();
const {
  getAllProducts,
  postNewProduct,
  getProductByName,
  getProductsByType,
} = require("../controllers/products.controllers");

productsRouter.route("/").get(getAllProducts).post(postNewProduct);
productsRouter.route("/:item_name").get(getProductByName);
productsRouter.route("/type/:item_type").get(getProductsByType);

module.exports = productsRouter;
