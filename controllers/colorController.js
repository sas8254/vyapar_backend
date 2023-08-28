const Color = require("../models/color");

exports.newColor = async (req, res) => {
  try {
    const color = new Color({
      name: req.body.name,
    });
    await color.save();
    res.status(200).json({
      color,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.find({});
    res.status(200).json({
      colors,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
exports.getColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.Id);
    res.status(200).json({
      color,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
exports.editColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(
      req.params.Id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.status(200).json({
      color,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
exports.deleteColor = async (req, res) => {
  try {
    const removedColor = await Color.findByIdAndRemove(req.params.Id);
    if (removedColor === null) {
      return res.status(500).json("No color found!");
    }
    res.status(200).json("Color Deleted Successfully");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
