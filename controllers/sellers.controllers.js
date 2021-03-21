const { selectAllSellers } = require("../models/sellers.models");

exports.getAllSellers = (req, res, next) => {
  selectAllSellers()
    .then((sellers) => {
      res.status(200).send({ sellers });
    })
    .catch(next);
};
