const connection = require("../db/connection");

exports.selectAllSellers = () => {
  return connection.select("*").from("sellers");
};

exports.selectSellerBySellerName = (seller_name) => {
  return connection("sellers").returning("*").where({ seller_name });
};
