const productsRouter = require("express").Router();
const {
  getAllProducts,
  postNewProduct,
  getProductByType,
} = require("../controllers/products.controllers");

productsRouter.route("/").get(getAllProducts).post(postNewProduct);
productsRouter.route("/type/:item_type").get(getProductByType);

module.exports = productsRouter;
