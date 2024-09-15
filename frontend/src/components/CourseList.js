// src/components/CourseList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseList.css";

const CourseList = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
    fetchCourses(); // Fetch all courses by default
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchCourses = async (categoryId = null) => {
    try {
      // Keep this as is; it correctly fetches courses by category
      const response = await axios.get(`http://localhost:8080/api/courses/${categoryId ? `?category_id=${categoryId}` : ""}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };
  

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchCourses(categoryId);
  };

  return (
    <div className="course-list">
      <h1>All Courses</h1>

      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="courses">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.course_id} className="course-card">
              <img src={course.image_url} alt={course.title} />
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>Price: ${course.price}</p>
              {course.discount_price && <p>Discount Price: ${course.discount_price}</p>}
              <p>Level: {course.level}</p>
              <p>Rating: {course.average_rating}</p>
              <p>Language: {course.language}</p>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
