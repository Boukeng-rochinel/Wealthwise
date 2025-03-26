import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VideoRendering() {
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(4);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/course")
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      });
  }, []);

  const loadMore = () => {
    setVisibleCourses((prev) => prev + 4);
  };

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container-fluid py-5 bg-light">
      <h2 className="text-center mb-5 text-primary">Course Catalog</h2>

      {/* 4 Cards per Row */}
      <div className="row g-4">
        {courses.slice(0, visibleCourses).map((course) => (
          <div key={course._id} className="col-md-3 col-sm-6">
            <div className="card h-100 shadow-sm">
              <div
                className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                style={{ height: "180px" }}
              >
                {course.videoPath ? (
                  <video className="w-100 h-100 object-fit-cover" controls>
                    <source src={course.videoPath} type="video/mp4" />
                  </video>
                ) : (
                  <span className="text-white">No preview</span>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text text-muted line-clamp-2">
                  {course.description}
                </p>
              </div>
              <div className="card-footer bg-white border-0">
                <button className="btn btn-primary w-100">View Course</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {visibleCourses < courses.length && (
        <div className="text-center mt-5">
          <button onClick={loadMore} className="btn btn-outline-primary px-4">
            View More Courses
          </button>
        </div>
      )}

      {/* Loading State */}
      {courses.length === 0 && !error && (
        <div className="text-center py-5 text-muted">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading courses...</p>
        </div>
      )}
    </div>
  );
}
