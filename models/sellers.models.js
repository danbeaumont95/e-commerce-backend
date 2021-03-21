const connection = require("../db/connection");

exports.selectAllSellers = () => {
  return connection.select("*").from("sellers");
};
