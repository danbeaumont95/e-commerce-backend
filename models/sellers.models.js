const connection = require("../db/connection");

exports.selectAllSellers = () => {
  return connection.select("*").from("sellers");
};

exports.selectSellerBySellerName = (seller_name) => {
  return connection("sellers").returning("*").where({ seller_name });
};

exports.selectProductsBySellerName = (seller_name) => {
  return (
    connection
      .select("*")
      .from("products")
      // .where({ seller_name })
      .fullOuterJoin("sellers", "sellers.seller_name", "products.seller_name")
      .where("sellers.seller_name", "=", seller_name)
  );
};
