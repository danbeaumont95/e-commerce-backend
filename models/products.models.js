const connection = require("../db/connection");

exports.selectAllProducts = () => {
  return connection.select("*").from("products");
};
