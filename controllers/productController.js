const ProductModel = require("../models/productModel");

const CreateProduct = async (req, res) => {
  try {
    const { productName, description, price, category } = req.body;
    const newProduct = new ProductModel({
      productName,
      price,
      image: req.file.filename,
      description,
      category,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error: ${error}`,
    });
  }
};

const GetProduct = async (req, res) => {
  try {
    const productList = await ProductModel.find();
    if (!productList) {
      res.status(404).json({
        message: "No products found",
      });
    }
    res.status(200).json({
      data: productList,
    });
    // console.log(productList)
  } catch (error) {
    console.log(error);
  }
};

const GetProductById = async (req, res) => {
  try {
    // console.log('Received req.params:', req.params);
    const productId = req.params.id;
    // console.log('Received Product ID:', productId);
    const product = await ProductModel.findById(productId);
    // console.log(product)
    if (!product) {
      return res.status(404).json({ message: "No such product found" });
    }
    res.status(200).json({ message: "Product found", product: product });
  } catch (error) {
    console.log("Error in getting the specific product", error);
  }
};

const EditProduct = async (req, res) => {
  try {
    const { productName, description, price, category } = req.body;
    const updateData = { productName, description, price, category };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const productId = await req.params.id;
    const editedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      }
    );
    if (!editedProduct) {
      res.status(404).json({
        message: "No such product found",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const productId = await req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({
        message: "No such product found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateProduct, GetProduct, EditProduct, DeleteProduct, GetProductById };
