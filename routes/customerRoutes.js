const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();

router.post("/", customerController.addCustomer);

router.get("/", customerController.getAllCustomers);

router.get("/:Id", customerController.getCustomer);

router.patch("/:Id", customerController.editCustomer);

router.delete("/:Id", customerController.deleteCustomer);

module.exports = router;
