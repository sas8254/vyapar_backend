const Customer = require("../models/customer");

exports.addCustomer = async (req, res) => {
  try {
    const { name, agencyName, email, transportId, address, GSTNo, contactNo } =
      req.body;
    const newCustomer = new Customer({
      name,
      email,
      agencyName,
      transportId,
      address,
      GSTNo: GSTNo,
      contactNo: parseInt(contactNo),
    });
    const customer = await newCustomer.save();
    res.status(201).json({
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.Id).populate(
      "transportId"
    );
    if (customer === null) {
      return res.json("No customer found!");
    }
    res.status(200).json({
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customer = await Customer.find({}).populate("transportId");
    res.status(200).json({
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.editCustomer = async (req, res) => {
  try {
    const { name, agencyName, email, transportId, address, GSTNo, contactNo } =
      req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.Id,
      {
        name,
        email,
        agencyName,
        transportId,
        address,
        GSTNo: GSTNo,
        contactNo: parseInt(contactNo),
      },
      { new: true }
    );
    res.status(200).json({
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const removedType = await Customer.findByIdAndRemove(req.params.Id);
    if (removedType === null) {
      return res.status(500).json("No customer found!");
    }
    res.status(200).json("Customer Deleted Successfully");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
