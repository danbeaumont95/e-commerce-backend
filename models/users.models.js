const connection = require("../db/connection");

exports.selectAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then((users) => {
      if (!users) {
        return Promise.reject({ status: 404, msg: "No users found" });
      } else {
        formattedUsers = users.map((user) => {
          return {
            username: user.username,
            firstname: user.first_name,
            lastname: user.surname,
            avatar_url: user.avatar_url,
          };
        });
      }
      return formattedUsers;
    });
};

exports.addNewUser = (username, password, first_name, surname) => {
  return connection
    .insert({ username, password, first_name, surname })
    .into("users")
    .returning("*")
    .then((users) => {
      return users[0];
    });
};
