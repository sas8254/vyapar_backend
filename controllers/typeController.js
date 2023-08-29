const Type = require("../models/type");

exports.newType = async (req, res) => {
  try {
    const type = new Type({
      name: req.body.name,
    });
    await type.save();
    res.status(200).json({
      type,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.find({});
    res.status(200).json({
      types,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
exports.getType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.Id);
    res.status(200).json({
      type,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
exports.editType = async (req, res) => {
  try {
    const type = await Type.findByIdAndUpdate(
      req.params.Id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.status(200).json({
      type,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
exports.deleteType = async (req, res) => {
  try {
    const removedType = await Type.findByIdAndRemove(req.params.Id);
    if (removedType === null) {
      return res.status(500).json("No type found!");
    }
    res.status(200).json("Type Deleted Successfully");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
