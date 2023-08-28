const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const College = require("../models/College")
const Student = require("../models/Student")

const generateToken = (id, role) => {
   return jwt.sign({ id, role }, "secret", {
      expiresIn: "1d"
   })
}

exports.registerCollege = async (req, res) => {
   try {
      const { collegeName, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)

      const college = new College({
         collegeName,
         email,
         password: hashedPassword
      })

      await college.save()

      res.status(201).json({
         message: "College registered successfully",
         college
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}

exports.loginCollege = async (req, res) => {
   try {
      const { email, password } = req.body
      const college = await College.findOne({ email })

      if (!college || !(await bcrypt.compare(password, college.password))) {
         return res.status(401).json({
            message: "Invalid email or password"
         })
      }

      const token = generateToken(college._id, "college")

      res.status(200).json({
         message: "College logged in successfully",
         token,
         college
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}

exports.loginStudent = async (req, res) => {
   try {
      const { email, password } = req.body
      const student = await Student.findOne({ email })

      if (!student || !(await bcrypt.compare(password, student.password))) {
         return res.status(401).json({
            message: "Invalid email or password"
         })
      }

      const token = generateToken(student._id, "student")

      res.status(200).json({
         message: "Student logged in successfully",
         token,
         student
      })
   } catch (error) {
      res.status(500).json({
         message: "An error occurred",
         error
      })
   }
}
