const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.addProduct);

router.get("/", productController.getAllProducts);

router.get("/:Id", productController.getProduct);

router.patch("/:Id", productController.editProduct);

router.delete("/:Id", productController.deleteProduct);

module.exports = router;
