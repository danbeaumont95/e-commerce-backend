const productsRouter = require("express").Router();
const {
  getAllProducts,
  postNewProduct,
  getProductsByType,
} = require("../controllers/products.controllers");

productsRouter.route("/").get(getAllProducts).post(postNewProduct);
productsRouter.route("/type/:item_type").get(getProductsByType);

module.exports = productsRouter;
