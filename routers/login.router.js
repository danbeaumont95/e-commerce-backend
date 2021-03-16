const loginRouter = require("express").Router();
const { postAccount } = require("../controllers/login.controllers");

loginRouter.route("/").post(postAccount);

module.exports = loginRouter;
