const ProductModel = require("../models/productModel");

const AddToCart = async (req, res) => {
  try {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(404).json({
    //     message: "Authorization header missing",
    //   });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({
    //     message: "Token missing from header",
    //   });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //   return res.status(401).json({
    //     message: "Invalid token",
    //   });
    // }

    // const existingUser = await UserModel.findById(decoded.userId);
    // if (!existingUser) {
    //   return res.status(404).json({
    //     message: "User not found",
    //   });
    // }

    const { productId, quantity } = req.body;
    const existingUser = req.user;
    const addProduct = await ProductModel.findById(productId);
    if (!addProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingProduct = existingUser.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      existingUser.products.push({ productId, quantity });
    }

    await existingUser.save();

    res.status(200).json({
      message: "Product added to cart",
      product: addProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const GetCartProducts = async (req, res) => {
  try {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(404).json({
    //     message: "Authorization header missing",
    //   });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({
    //     message: "Token missing from header",
    //   });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //   return res.status(401).json({
    //     message: "Invalid token",
    //   });
    // }
    const existingUser = req.user;
    const existingProduct = await existingUser.populate("products.productId");
    if (!existingProduct) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    const products = existingProduct.products.map((item) => ({
      ...item.productId.toObject(),
      quantity: item.quantity,
    }));
    const subtotal = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const total = subtotal;

    res.status(200).json({ products, subtotal, total });
  } catch (error) {
    console.log(error);
  }
};

const DeleteCartProduct = async (req, res) => {
  try {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(404).json({
    //     message: "Authorization header missing",
    //   });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({
    //     message: "Token missing from header",
    //   });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //   return res.status(401).json({
    //     message: "Invalid token",
    //   });
    // }
    const existingUser = req.user;
    const productId = req.params.id;

    existingUser.products = existingUser.products.filter(
      (product) => product.productId.toString() !== productId
    );

    await existingUser.save();

    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { AddToCart, GetCartProducts, DeleteCartProduct };
