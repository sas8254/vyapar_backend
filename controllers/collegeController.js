const College = require("../models/College")
const Student = require("../models/Student")
const Project = require("../models/Project")
const bcrypt = require("bcrypt")

exports.addStudent = async (req, res) => {
   try {
      const { studentName, email, password, enrollmentNumber } = req.body

      const college = await College.findById(req.user.id)
      const hashedPassword = await bcrypt.hash(password, 10)
      const newStudent = new Student({
         studentName,
         email,
         password: hashedPassword,
         enrollmentNumber,
         collegeId: college._id
      })

      const student = await newStudent.save()
      college.students.push(student._id)
      await college.save()

      res.status(201).json({
         message: "Student added successfully",
         student
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}

exports.getAllProjects = async (req, res) => {
   try {
      const college = await College.findById(req.user.id).populate({
         path: "students",
         populate: {
            path: "projects",
            model: "Project"
         }
      })

      const projects = college.students.flatMap((student) => student.projects)

      res.status(200).json({
         projects
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}

exports.updateProjectStatus = async (req, res) => {
   try {
      const { status } = req.body
      const { projectId } = req.params

      const project = await Project.findById(projectId)
      project.status = status
      await project.save()

      res.status(200).json({
         message: "Project status updated",
         project
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}

exports.getAllStudents = async (req, res) => {
   try {
      const college = await College.findById(req.user.id).populate("students")
      const students = college.students

      res.status(200).json({
         students
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}

exports.getStudent = async (req, res) => {
   try {
      const student = await Student.findById(req.params.studentId)
      res.status(200).json({
         student
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}
