const sellersRouter = require("express").Router();
const {
  getAllSellers,
  getSellerBySellerName,
  getProductsBySellerName,
} = require("../controllers/sellers.controllers");

sellersRouter.route("/").get(getAllSellers);
sellersRouter.route("/:seller_name").get(getSellerBySellerName);
sellersRouter.route("/:seller_name/products").get(getProductsBySellerName);

module.exports = sellersRouter;
