const express = require("express");
const productController = require("../controllers/productController");
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/productImages')
    },
    filename: function (req, file, cb) {
        cb(null, '/' + Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

const router = express.Router();

router.post("/", upload.single("productImage"), productController.addProduct);

router.get("/", productController.getAllProducts);

router.get("/:Id", productController.getProduct);

router.patch("/:Id", productController.editProduct);

router.delete("/:Id", productController.deleteProduct);

module.exports = router;
