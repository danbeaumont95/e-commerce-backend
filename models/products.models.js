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

exports.deleteProductByItemName = (item_name) => {
  return connection("products")
    .delete()
    .where({ item_name })
    .then((count) => {
      if (count === 0) {
        throw { status: 404, msg: "No item found" };
      }
    });
};

exports.selectAllTypes = () => {
  return connection
    .select("*")
    .from("products")
    .then((types) => {
      if (!types) return Promise.reject({ status: 404, msg: "No types found" });
      else {
        let filteredTypes = [];
        for (let i = 0; i < types.length; i++) {
          if (!filteredTypes.includes(types[i].item_type)) {
            filteredTypes.push(types[i].item_type);
          }
        }
        return filteredTypes;
      }
    });
};
