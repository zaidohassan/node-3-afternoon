const swag = require("../models/swag");

const add = (req, res, next) => {
  const { id } = req.query;
  let { cart } = req.session.user;

  // This will return -1 if it isn't in the cart
  const index = cart.findIndex(swag => swag.id == id);

  if (index === -1) {
    const selectedSwag = swag.find(swag => swag.id == id);

    cart.push(selectedSwag);
    req.session.user.total += selectedSwag.price;
  }

  res.status(200).send(req.session.user);
};

const deleteItem = (req, res, next) => {
  const { id } = req.query;
  const { cart } = req.session.user;
  const selectedSwag = swag.find(swag => swag.id == id);
  if (selectedSwag) {
    const index = cart.findIndex(swag => swag.id === id);
    cart.splice(index, 1);
    req.session.user.total -= selectedSwag.price;
  }
  res.status(200).json(req.session.user);
};
const checkout = (req, res, next) => {
  req.session.user.cart = [];
  req.session.user.total = 0;
  res.status(200).json(req.session.user);
  //   console.log(req.session.user);
};

module.exports = {
  add,
  deleteItem,
  checkout
};
