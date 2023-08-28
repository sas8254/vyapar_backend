const express = require("express");
const projectController = require("../controllers/projectController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.isStudent,
  projectController.uploadProject
);
router.get("/download/:projectId", projectController.downloadProject);

module.exports = router;
