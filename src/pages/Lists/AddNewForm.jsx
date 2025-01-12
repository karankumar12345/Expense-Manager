/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Import react-select
import { v4 as uuidv4 } from "uuid"; // Import Appwrite SDK
import { database } from '../../appwrite/config';

const AddExpenseForm = ({ onSubmit }) => {
    const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    users: [],
    description: '',
  });
  const [error, setError] = useState('');

  useEffect(()=>{
const fetchData = async () => {
      try {
        const response = await database.listDocuments(
          '65abf1f6ab18fc1967f8', // Your Appwrite Database ID
          '6780a7930039a0477728' // Your Appwrite Collection ID
        );
        console.log(response);
        setUsers(response.documents || []); // Assuming response.documents contains the list of users
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load users. Please try again.');
      }
    };

    fetchData();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, users: selectedUsers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();

  // Convert users array to a comma-separated string (same as before)
  const usersString = formData.users.join(',');

  // Create the document using the 'data' object
  const promises = database.createDocument('65abf1f6ab18fc1967f8', '6783225b0021b7ad3ffe',uuidv4(), {
 title: formData.title,
amount: formData.amount,
  users: formData.users, // Use the comma-separated string
  description: formData.description,
  });


    promises
      .then(response => {
        console.log('Expense added successfully:', response);
        if (onSubmit) {
          onSubmit(formData);
        
          // Pass data to parent component
        }
      })
      .catch(error => {
        console.error('Error adding expense:', error);
      });
      window.location.href = '/';
  

  };
  const userOptions = users.map((user) => ({
    label: user.email, // You can modify this if you have more user data, e.g., name
    value: user.email,
  }));

  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Expense Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Expense Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Users */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Users Involved</label>
          <Select
            options={userOptions}
            isMulti
            onChange={handleUserChange}
            placeholder="Select users"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description for the expense"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
