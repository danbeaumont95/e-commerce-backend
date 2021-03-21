const sellersRouter = require("express").Router();
const { getAllSellers } = require("../controllers/sellers.controllers");

sellersRouter.route("/").get(getAllSellers);

module.exports = sellersRouter;
