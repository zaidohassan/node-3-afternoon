const swag = require("../models/swag");

const getAll = (req, res, next) => {
  console.log(swag);

  res.status(200).json(swag);
};

module.exports = {
  getAll
};
