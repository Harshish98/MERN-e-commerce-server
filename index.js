const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnection = require("./config/db");
const {
  user,
  product,
  cart,
  wishlist,
  address,
  payment,
  contact,
} = require("./router");

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(user);
app.use(product);
app.use(cart);
app.use(wishlist);
app.use(address);
app.use(payment);
app.use(contact);
app.use(express.static("assets"));

const port = process.env.PORT;

DBConnection().then(() => {
  app.listen(port, () =>
    console.log(`application is listening on port- ${port}`)
  );
});
