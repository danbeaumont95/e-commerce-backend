const {
  selectAllSellers,
  selectSellerBySellerName,
} = require("../models/sellers.models");

exports.getAllSellers = (req, res, next) => {
  selectAllSellers()
    .then((sellers) => {
      res.status(200).send({ sellers });
    })
    .catch(next);
};

exports.getSellerBySellerName = (req, res, next) => {
  const { seller_name } = req.params;
  selectSellerBySellerName(seller_name)
    .then((seller) => {
      res.status(200).send({ seller });
    })
    .catch(next);
};
