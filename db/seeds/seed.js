const dbData = require("../data/index");

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("users").insert(dbData["usersData"]));
};
