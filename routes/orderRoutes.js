const express = require("express")
const orderController = require("../controllers/orderController")

const router = express.Router()

router.post("/", orderController.createOrder)

router.get("/", (req, res)=>{
    res.send('gethit')
})



module.exports = router