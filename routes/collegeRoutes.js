const express = require("express")
const collegeController = require("../controllers/collegeController")
const authMiddleware = require("../utils/authMiddleware")

const router = express.Router()

router.post("/add-student", authMiddleware.isCollege, collegeController.addStudent)
router.get("/projects", authMiddleware.isCollege, collegeController.getAllProjects)
router.patch("/projects/:projectId", authMiddleware.isCollege, collegeController.updateProjectStatus)
router.get("/students", authMiddleware.isCollege, collegeController.getAllStudents)
router.get("/student/:studentId", authMiddleware.isCollege, collegeController.getStudent)

module.exports = router
