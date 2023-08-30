const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  try {
    const { name, colors, type, quantity, price, imageUrl } =
      req.body;
    const newProduct = new Product({
      name,
      colors,
      type,
      quantity,
      price,
      imageUrl
    });
    const product = await newProduct.save();
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.Id);
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { name, colors, type, quantity, price, imageUrl } =
      req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.Id,
      {
        name,
      colors,
      type,
      quantity,
      price,
      imageUrl
      },
      { new: true }
    );
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const removedType = await Product.findByIdAndRemove(req.params.Id);
    if (removedType === null) {
      return res.status(500).json("No product found!");
    }
    res.status(200).json("Product Deleted Successfully");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
