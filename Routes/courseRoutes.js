const express = require("express");
const router = express.Router();
const {
  getCourse,
  addCourse,
  getAllCourses,
} = require("../controllers/courseController");

// Get course by ID
router.route("/course/:id").get(getCourse);
// Get courses
router.route("/course").get(getAllCourses);
// Add new course
router.route("/course").post(addCourse);

module.exports = router;
