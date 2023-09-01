const Product = require("../models/product");
const fs = require("fs");

const deleteFile = (imageUrl) => {
  const filePath = "./files/productImages" + imageUrl;

  fs.unlink(filePath, (error) => {
    if (error) {
      throw error;
    }
  });
};

exports.addProduct = async (req, res) => {
  try {
    const { name, colors, type, quantity, price,setRate } = req.body;
    const newProduct = new Product({
      name,
      colors,
      type,
      quantity,
      price,
      setRate,
      imageUrl: req.file.filename,
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
    const product = await Product.findById(req.params.Id)
    .populate("colors")
    .populate("type")
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
    const product = await Product.find({}).populate("colors")
    .populate("type");
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
    let { name, colors, type, quantity, price, setRate } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.filename;
    } else {
      const foundProduct = await Product.findById(req.params.Id);
      imageUrl = foundProduct.imageUrl;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.Id,
      {
        name,
        colors,
        type,
        quantity,
        price,
        setRate,
        imageUrl,
      },
      { new: true }
    ).populate("colors")
    .populate("type");
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
    if (removedType && removedType.imageUrl) {
      await deleteFile(removedType.imageUrl);
    }

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
