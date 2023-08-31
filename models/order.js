const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
    // required: true,
  },
  dueDate: {
    type: Date,
    // required: true,
  },
  totalPrice: {
    type: Number,
    // required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    // required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        // required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      // totalQuantity
      // totalPrice
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
