const { validateAccount } = require("../models/login.models");

exports.postAccount = (req, res, next) => {
  const { username, password, isUser } = req.body;
  validateAccount(username, password, isUser)
    .then(() => res.sendStatus(200))
    .catch(next);
};
