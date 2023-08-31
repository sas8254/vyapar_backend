const express = require("express")
const orderController = require("../controllers/orderController")

const router = express.Router()

router.post("/", orderController.createOrder)

router.get("/", orderController.getAllOrders);

router.get("/:Id", orderController.getOneOrder);

router.patch("/:Id", orderController.editOrder);

router.delete("/:Id", orderController.deleteOrder);





module.exports = router