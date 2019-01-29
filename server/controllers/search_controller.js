const swag = require("../models/swag");

const search = (req, res) => {
  const { category } = req.query;
  if (!category) {
    res.status(200).json(index);
  } else {
    const filteredSwag = swag.filter(swag => swag.category === category);
    res.status(200).json(filteredSwag);
  }
};

module.exports = { search };
