const ProductModel = require("../models/productModel");

const search = async (req, res) => {
  try {
    const { keyword } = req.params;
    console.log('keyword', keyword);

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const results = await ProductModel.find({
      $or: [
        { productName: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        // { category: { $regex: keyword, $options: "i" } },
        // { brand: { $regex: keyword, $options: "i" } },
        // { price: { $regex: keyword, $options: "i" } },
        // { color: { $regex: keyword, $options: "i" } },
        // { size: { $regex: keyword, $options: "i" } },
        // { quantity: { $regex: keyword, $options: "i" } },
        // { rating: { $regex: keyword, $options: "i" } },
        // { reviews: { $regex: keyword, $options: "i" } }
      ],
    }).select("-image");

    res.json(results);
    console.log(results)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = search;
