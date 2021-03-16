exports.up = function (knex) {
  console.log("creating users table");
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary();
    usersTable.string("password").notNullable();
    usersTable.string("first_name").notNullable();
    usersTable.string("surname").notNullable();
    usersTable.string("avatar_url");
  });
};

exports.down = function (knex) {
  console.log("dropping users table");
  return knex.schema.dropTable("users");
};
