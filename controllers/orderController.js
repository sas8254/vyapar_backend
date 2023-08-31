const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const { orderNo, totalPrice, dueDate, orderDate, customer, products } =
      req.body;

    const newOrder = await new Order({
      orderNo,
      dueDate,
      totalPrice,
      orderDate,
      customer,
      products,
    });

    await newOrder.save();

    // await newOrder
    //   .populate("customer")
    //   .populate("products.product")
    //   .execPopulate();

    res.status(201).json({
      message: "Order created successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("customer")
      .populate("products.product");
    if (!orders) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders.",
      error,
    });
  }
};

exports.getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.Id)
      .populate("customer")
      .populate("products.product");
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
};

exports.editOrder = async (req, res) => {
  try {
    const { orderNo, totalPrice, dueDate, orderDate, customer, products } =
      req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.Id,
      {
        orderNo,
        dueDate,
        totalPrice,
        orderDate,
        customer,
        products,
      },
      { new: true }
    )
      .populate("customer")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    await order.save();
    res.status(201).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order.",
      error,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.Id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    console.log("run");
    res.status(200).json({
      message: "Order deleted successfully.",
    });
    console.log("runs");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order." });
  }
};
