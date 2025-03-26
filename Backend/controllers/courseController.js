const { Course } = require("../models/models");

// Add a new course
const addCourse = async (req, res) => {
  try {
    const { title, description, videoPath } = req.body;
    const newCourse = new Course({
      title,
      description,
      videoPath,
    });

    await newCourse.save();
    return res.status(201).json(newCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    console.log(course);
    return res.status(200).json({
      msg: "Course retrieved successfully",
      data: course,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({});
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    return res.status(200).json({
      msg: "Courses retrieved successfully",
      data: course,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getCourse,
  getAllCourses,
  addCourse,
};
