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
  orderDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      variants: [
        {
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color",
            required: true,
          },
        },
      ],
      totalQuantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  grandTotal: {
    type: Number,
    required: true,
  },
  totalOrderQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
