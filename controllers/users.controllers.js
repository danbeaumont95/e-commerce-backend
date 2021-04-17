const { selectAllUsers, addNewUser } = require("../models/users.models");

exports.getAllUsers = (req, res, next) => {
  selectAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.postNewUser = (req, res, next) => {
  const { username, password, first_name, surname, avatar_url } = req.body;
  addNewUser(username, password, first_name, surname)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
