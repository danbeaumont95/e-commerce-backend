exports.up = function (knex) {
  console.log("creating products table");
  return knex.schema.createTable("products", (productsTable) => {
    productsTable.string("item_name").primary();
    productsTable.string("price").notNullable();
    productsTable.string("img_url");
    productsTable.string("description");
    productsTable.string("seller").notNullable();
    productsTable.string("item_type");
  });
};

exports.down = function (knex) {
  console.log("dropping products table");
  return knex.schema.dropTable("products");
};
