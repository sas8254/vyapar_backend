const Order = require("../models/order")

exports.createOrder = async (req, res) => {
    return res.send(req.body)
    try {
        const [orderNo, dueDate, totalPrice, orderDate, customerId, products] = req.body;

        const order = new Order({
            orderNo, dueDate, totalPrice, orderDate, customerId, products
        })

        await order.save()
        res.status(201).json({
            message:"Order created successfully",
            order
        })

    } catch (error) {
        res.status(500).json({
            message: "An error occured",
            error
        })

    }
}