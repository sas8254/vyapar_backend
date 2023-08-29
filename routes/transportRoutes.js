const express = require("express");
const transportController = require("../controllers/transportController");

const router = express.Router();

router.post("/", transportController.addTransport);

router.get("/", transportController.getAllTransport);

router.get("/:Id", transportController.getTransport);

router.patch("/:Id", transportController.editTransport);

router.delete("/:Id", transportController.deleteTransport);

module.exports = router;
