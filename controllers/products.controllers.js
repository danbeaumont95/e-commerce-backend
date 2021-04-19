const {
  selectAllProducts,
  addNewProduct,
  selectProductsByType,
  selectProductByName,
  deleteProductByItemName,
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

exports.getProductsByType = (req, res, next) => {
  const { item_type } = req.params;
  selectProductsByType(item_type)
    .then((products) => {
      res.status(200).send({ products });
    })
    .catch(next);
};

exports.getProductByName = (req, res, next) => {
  const { item_name } = req.params;
  selectProductByName(item_name)
    .then((product) => {
      res.status(200).send({ product });
    })
    .catch(next);
};

exports.removeProductByItemName = (req, res, next) => {
  const { item_name } = req.params;
  deleteProductByItemName(item_name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
};
