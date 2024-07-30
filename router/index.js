const express = require("express");
const {
  CreateProduct,
  GetProduct,
  EditProduct,
  DeleteProduct,
  GetProductById,
} = require("../controllers/productController");
const {
  UserSignUp,
  UserLogin,
  GetUserDetails,
  ForgotPassword,
  ResetPassword,
} = require("../controllers/userController");

const {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
} = require("../controllers/cartController");
const {
  AddToWishlist,
  GetWishlistedProducts,
  RemoveWishlistProduct,
} = require("../controllers/wishlistController");
const upload = require("../middleware/multer");
const { AddAddress } = require("../controllers/addressController");
const Payment = require("../controllers/payment");
const auth = require("../middleware/authToken");
const search = require("../controllers/search");
const { SendMessage, GetMessages } = require("../controllers/contactController");

const user = express.Router();

user.post("/create-user", UserSignUp);
user.post("/user-login", UserLogin);
user.get("/user-data", GetUserDetails);
user.post("/forgot-password", ForgotPassword);
user.post("/reset-password/:id/:token", ResetPassword);

const product = express.Router();

product.post("/create-product", upload.single("file"), CreateProduct);
product.get("/products", GetProduct);
product.get("/products/:id", GetProductById);
product.put("/edit-product/:id", upload.single("file"), EditProduct);
product.delete("/delete-product/:id", DeleteProduct);
product.get("/search/:keyword", search);

const cart = express.Router();
cart.post("/add-to-cart/:id", auth, AddToCart);
cart.get("/cart-products", auth, GetCartProducts);
cart.delete("/cart-product-delete/:id", auth, DeleteCartProduct);

const wishlist = express.Router();
wishlist.post("/add-to-wishlist/:id", auth, AddToWishlist);
wishlist.get("/get-wishlist-product", auth, GetWishlistedProducts);
wishlist.delete("/remove-from-wishlist/:id", auth, RemoveWishlistProduct);

const address = express.Router();
address.post("/add-address", auth, AddAddress);

const payment = express.Router();
payment.post("/payment", auth, Payment);

const contact = express.Router();
contact.post("/send-message", SendMessage);
contact.get("/get-messages", GetMessages);

module.exports = { user, product, cart, wishlist, address, payment, contact };
