const connection = require("../db/connection");

exports.selectAllProducts = () => {
  return connection.select("*").from("products");
};

exports.addNewProduct = (product) => {
  return connection("products")
    .insert(product)
    .returning("*")
    .then(([product]) => {
      return product;
    });
};

exports.selectProductsByType = (item_type) => {
  return connection("products").returning("*").where({ item_type });
};

exports.selectProductByName = (item_name) => {
  return connection("products").returning("*").where({ item_name });
};
