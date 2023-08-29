const express = require("express");
const typeController = require("../controllers/typeController");

const router = express.Router();

router.post("/", typeController.newType);

router.get("/", typeController.getAllTypes);

router.get("/:Id", typeController.getType);

router.patch("/:Id", typeController.editType);

router.delete("/:Id", typeController.deleteType);

module.exports = router;
