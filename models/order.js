const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
