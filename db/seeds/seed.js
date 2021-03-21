const dbData = require("../data/index");

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("users").insert(dbData["usersData"]))
    .then(() => knex("products").insert(dbData["productsData"]))
    .then(() => knex("sellers").insert(dbData["sellersData"]));
};
