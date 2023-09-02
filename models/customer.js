const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agencyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  transportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transport",
  },
  address: {
    addressLine: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  GSTNo: {
    type: String,
    required: true,
    // unique: true,
  },
  contactNo: {
    type: Number,
    required: true,
    // unique: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
