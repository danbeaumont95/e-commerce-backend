const { selectAllProducts } = require("../models/products.models");

exports.getAllProducts = (req, res, next) => {
  selectAllProducts()
    .then((products) => {
      res.status(200).send({ products });
    })
    .catch(next);
};
