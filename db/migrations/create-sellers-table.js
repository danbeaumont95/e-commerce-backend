exports.up = function (knex) {
  // console.log("creating sellers table");
  return knex.schema.createTable("sellers", (sellersTable) => {
    sellersTable.string("seller_name").primary();
    sellersTable.string("img_url");
    sellersTable.integer("amount_of_products");
    sellersTable.string("reviews");
    sellersTable.integer("year_joined");
    sellersTable.string("location");
  });
};

exports.down = function (knex) {
  // console.log("dropping sellers table");
  return knex.schema.dropTable("sellers");
};
