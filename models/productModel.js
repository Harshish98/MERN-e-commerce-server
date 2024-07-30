const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
    enum: ['fashion', 'sports', 'gadgets']
  }
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;
