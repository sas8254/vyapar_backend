const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const collegeRoutes = require("./routes/collegeRoutes");
// const studentRoutes = require("./routes/studentRoutes");
// const projectRoutes = require("./routes/projectRoutes");
// const authRoutes = require("./routes/authRoutes");
const colorRoutes = require("./routes/colorRoutes");
const bodyParser = require("body-parser");

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/vyapar")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
// app.use("/api/colleges", collegeRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/colors", colorRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
