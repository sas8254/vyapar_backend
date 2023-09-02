const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
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

module.exports = mongoose.model("Transport", transportSchema);
