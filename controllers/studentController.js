const Student = require("../models/Student");

exports.getStudentProjects = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate("projects");

    res.status(200).json({
      projects: student.projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
