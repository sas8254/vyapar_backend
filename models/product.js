const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  ],
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  setRate: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
