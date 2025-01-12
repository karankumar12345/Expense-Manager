import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs
import { database } from "../../appwrite/config"; // Import your Appwrite database configuration

const Category = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "" }); // State for form data
  const [categories, setCategories] = useState([]); // State to store list of categories

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await database.listDocuments(
          "65abf1f6ab18fc1967f8", // Replace with your database ID
          "67839d2c00193e4ef9e6" // Replace with your collection ID
        );
        setCategories(response.documents); // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await database.createDocument(
        "65abf1f6ab18fc1967f8", // Replace with your database ID
        "67839d2c00193e4ef9e6", // Replace with your collection ID
        uuidv4(), // Generate unique ID for the document
        { name: formData.name }
      );
      console.log("Category added successfully:", response);

      // Update the list of categories
      setCategories((prevCategories) => [...prevCategories, response]);

      // Clear the input field
      setFormData({ name: "" });

      // Call the parent component's callback, if provided
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add New Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Category"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Add Category
        </button>
      </form>

      {/* Display List of Categories */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Categories List</h3>
        <ul className="list-disc pl-5 space-y-2">
          {categories.map((category) => (
            <li key={category.$id} className="text-gray-700">
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
