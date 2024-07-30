const ProductModel = require("../models/productModel");

const AddToWishlist = async (req, res) => {
  try {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(404).json({
    //     message: "Authorization header missing",
    //   });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(404).json({
    //     message: "Token missing from header",
    //   });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //   return res.status(401).json({
    //     message: "Invaild token",
    //   });
    // }

    // const existingUser = await UserModel.findById(decoded.userId);
    // if (!existingUser) {
    //   return res.status(404).json({
    //     message: "User not found",
    //   });
    // }
    const existingUser = req.user;
    const addProduct = await ProductModel.findById(req.params.id);
    if (!addProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    existingUser.wishlist.push(addProduct);
    await existingUser.save();

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist: addProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetWishlistedProducts = async (req, res) => {
  try {
    //     const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(404).json({
    //     message: "Authorization header missing",
    //   });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(404).json({
    //     message: "Token missing from header",
    //   });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //   return res.status(401).json({
    //     message: "Invaild token",
    //   });
    // }
    const existingUser = req.user;
    const existingProduct = await existingUser.populate("wishlist");
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      wishlist: existingUser.wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

const RemoveWishlistProduct = async (req, res) => {
  try {
    //     const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(404).json({
    //     message: "Authorization header missing",
    //   });
    // }

    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //   return res.status(404).json({
    //     message: "Token missing from header",
    //   });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //   return res.status(401).json({
    //     message: "Invaild token",
    //   });
    // }
    const existingUser = req.user;
    const productId = req.params.id;

    existingUser.wishlist = existingUser.wishlist.filter(
      (product) => product.toString() !== productId
    );
    await existingUser.save();
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  AddToWishlist,
  GetWishlistedProducts,
  RemoveWishlistProduct,
};
