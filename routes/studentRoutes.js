const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get(
  "/projects",
  authMiddleware.isStudent,
  studentController.getStudentProjects
);

module.exports = router;
