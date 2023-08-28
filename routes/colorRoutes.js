const express = require("express");
const colorController = require("../controllers/colorController");

const router = express.Router();

router.post("/", colorController.newColor);

router.get("/", colorController.getAllColors);

router.get("/:Id", colorController.getColor);

router.patch("/:Id", colorController.editColor);

router.delete("/:Id", colorController.deleteColor);

module.exports = router;
