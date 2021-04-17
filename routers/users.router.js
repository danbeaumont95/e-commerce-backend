const usersRouter = require("express").Router();
const {
  getAllUsers,
  postNewUser,
} = require("../controllers/users.controllers");

usersRouter.route("/").get(getAllUsers).post(postNewUser);

module.exports = usersRouter;
