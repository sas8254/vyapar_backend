const orderController = require("../controllers/orderController")
const express = require("express")

const router = express.Router()

router.post("/", orderController.createOrder)



module.exports = router