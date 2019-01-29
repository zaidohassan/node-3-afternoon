require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const { checkForSession } = require("./middlewares/checkForSession.js");
const { getAll } = require("./controllers/swag_controller");
const {
  login,
  register,
  signout,
  getUser
} = require("./controllers/auth_controller");

const { add, deleteItem, checkout } = require("./controllers/cart_controller");
const { search } = require("./controllers/search_controller");

const app = express();
const port = process.env.SERVER_PORT;

app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
    // cookie: {maxAge: 1000 * 60* 60* 24* 7* 4}
  })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get("/api/swag", getAll);
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/signout", signout);
app.get("/api/user", getUser);
app.post("/api/cart", add);
app.post("/api/cart/checkout", checkout);
app.delete("/api/cart", deleteItem);
app.get("/api/search", search);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
