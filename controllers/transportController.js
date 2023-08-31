const Transport = require("../models/transport");


exports.addTransport = async (req, res) => {
  try {
    const { name, email, addressLine, city, state, pincode, GSTNo, contactNo } =
      req.body;
    const newTransport = new Transport({
      name,
      email,
      address: {
        addressLine,
        city,
        state,
        pincode: parseInt(pincode),
      },
      GSTNo: parseInt(GSTNo),
      contactNo: parseInt(contactNo),
    });
    const transport = await newTransport.save();
    res.status(201).json({
      message: "Transport added successfully",
      transport,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getTransport = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.Id);
    if (transport === null) {
      return res.json("No transport found!");
    }
    res.status(200).json({
      transport,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllTransports = async (req, res) => {
  try {
    const transport = await Transport.find({});
    res.status(200).json({
      transport,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.editTransport = async (req, res) => {
  try {
    const { name, email, addressLine, city, state, pincode, GSTNo, contactNo } =
      req.body;

    const transport = await Transport.findByIdAndUpdate(
      req.params.Id,
      {
        name,
        email,
        address: {
          addressLine,
          city,
          state,
          pincode: parseInt(pincode),
        },
        GSTNo: parseInt(GSTNo),
        contactNo: parseInt(contactNo),
      },
      { new: true }
    );
    res.status(200).json({
      transport,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.deleteTransport = async (req, res) => {
  try {
    const removedType = await Transport.findByIdAndRemove(req.params.Id);
    if (removedType === null) {
      return res.status(500).json("No transport found!");
    }
    res.status(200).json("Transport Deleted Successfully");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
