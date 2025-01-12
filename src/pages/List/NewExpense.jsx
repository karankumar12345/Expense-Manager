import React, { useState, useEffect } from "react";
import { database } from "../../appwrite/config"; // Import your Appwrite configuration
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const AddNewExpense = ({ currentUser }) => {
  const [categories, setCategories] = useState([]); // State to store list of categories
  const [users, setUsers] = useState([]); // State to store users for the select dropdown
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    slip: null, // State for the optional slip of amount
    selectedUserId: "" // State for the selected user
  });
  const params = useParams();
  const id = params.id; // Get the document ID from the route
 // State to store user data
  const [expenses, setExpenses] = useState([]); // State to store expenses

  // Fetch categories, users, and user data
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


    const fetchData = async () => {
      try {
        const response = await database.getDocument(
          '65abf1f6ab18fc1967f8', // Your Appwrite Database ID
          '6783225b0021b7ad3ffe', // Your Appwrite Collection ID
          id // The ID of the document you want to fetch
        );
        console.log(response);
        setUsers(response); // Update state with fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCategories();
  
    fetchData();
  }, [id]);

  console.log(users)
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };



  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!newExpense.category || !newExpense.amount || !newExpense.selectedUserId) {
      alert("Please fill in all required fields.");
      return;
    }

 

    // Calculate the new total amount after adding the new expense
    const updatedAmount = users.amount + parseFloat(newExpense.amount); // Add the new amount to the existing total amount
    
    const newExpenseData = {
      category: newExpense.category,
      amount: newExpense.amount,
     // Add the uploaded slip's URL (if available)
      email: newExpense.selectedUserId, // Ensure email is properly passed
      MainListId: users.$id,
    // Add selected user ID to the expense
    };

    // Create the new expense document
    try {
      const response = await database.createDocument(
        "65abf1f6ab18fc1967f8", // Replace with your database ID
        "67839cb3001f268cd5d4", // Replace with your collection ID
        uuidv4(), // Auto-generate a unique ID for the document
        newExpenseData
      );


      try {
   
        await database.updateDocument(
          '65abf1f6ab18fc1967f8', // Your Appwrite Database ID
          '6783225b0021b7ad3ffe', // Your Appwrite Collection ID
          id, // The user's document ID
          { amount: updatedAmount } // Updated amount field
        );

        setExpenses([...expenses, response]); // Update local state with the new expense
        setNewExpense({ category: "", amount: "", slip: null, selectedUserId: "" }); // Reset form
        alert("Expense added successfully!");
      } catch (updateError) {
        console.error("Error updating user data:", updateError);
        alert("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add the expense. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{currentUser ? currentUser.name : "User"}'s New Expense</h2>

      {/* New Expense Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category.$id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Select User Dropdown */}
        <div>
          <label htmlFor="selectedUserId" className="block text-sm font-semibold text-gray-700 ">
            Select User
          </label>
          <select
            id="selectedUserId"
            name="selectedUserId"
            value={newExpense.selectedUserId}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>Select a User</option>
            {users?.users?.map((userOption) => (
              <option key={userOption.$id} value={userOption.$id}>
                {userOption} {/* Or any other user field */}
              </option>
            ))}
          </select>
        </div>

    

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewExpense;
