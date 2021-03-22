const sellersRouter = require("express").Router();
const {
  getAllSellers,
  getSellerBySellerName,
} = require("../controllers/sellers.controllers");

sellersRouter.route("/").get(getAllSellers);
sellersRouter.route("/:seller_name").get(getSellerBySellerName);

module.exports = sellersRouter;
