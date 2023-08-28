const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const Project = require("../models/Project");
const Student = require("../models/Student");

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadProject = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { projectName, description } = req.body;
      const { originalname, buffer } = req.file;

      const uploadedFile = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              public_id: `${projectName}_${originalname}`,
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      });

      const student = await Student.findById(req.user.id);

      const newProject = new Project({
        projectName,
        description,
        studentId: student._id,
        fileLink: uploadedFile.secure_url,
      });

      const project = await newProject.save();
      student.projects.push(project._id);
      await student.save();

      res.status(201).json({
        message: "Project uploaded successfully",
        project,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error,
      });
    }
  },
];

exports.downloadProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    res.set("Content-Disposition", `attachment; filename=${project.fileLink}`);
    res.redirect(project.fileLink);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};
