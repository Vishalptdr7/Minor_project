// src/pages/Categories.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token"); // Make sure the token exists
        if (!token) {
          throw new Error("No token found");
        }
    
        const response = await axios.get("http://localhost:8080/categories", {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is sent correctly
          },
        });
    
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.category_id}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
