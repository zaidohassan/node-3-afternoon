const users = require("../models/users");
let id = 1;

const login = (req, res, next) => {
  const { session } = req;
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (user) {
    session.user.username = user.username;
    res.status(200).send(session.user);
  } else {
    res.status(500).send("Unauthorized.");
  }

  //   console.log(req.session);
};

const register = (req, res, next) => {
  const { session } = req;
  const { username, password } = req.body;
  users.push({ username, password, id });
  id++;
  session.user.username = username;
  //   console.log(req.session);
  //   console.log("Res", req.session.user);
  res.status(200).send(session.user);
};

const signout = (req, res, next) => {
  req.session.destroy();
  console.log(req.session);
  res.status(200).json(req.session);
};

const getUser = (req, res, next) => {
  res.status(200).json(req.session.user);
};
module.exports = {
  login,
  register,
  signout,
  getUser
};
