const {
  selectAllProducts,
  addNewProduct,
} = require("../models/products.models");

exports.getAllProducts = (req, res, next) => {
  selectAllProducts()
    .then((products) => {
      res.status(200).send({ products });
    })
    .catch(next);
};

exports.postNewProduct = (req, res, next) => {
  // const { item_name, price, img_url, description, seller, item_type };
  const newProduct = req.body;
  addNewProduct(newProduct)
    .then((product) => {
      res.status(201).send({ product });
    })
    .catch(next);
};
