const jwt = require("jsonwebtoken");

const isCollege = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");

    if (decodedToken.role === "college") {
      req.user = {
        id: decodedToken.id,
        role: decodedToken.role,
      };
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const isStudent = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");

    if (decodedToken.role === "student") {
      req.user = {
        id: decodedToken.id,
        role: decodedToken.role,
      };
      next();
    } else {
      res.status(403).json({ message: "Forbidden xx" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  isCollege,
  isStudent,
};
