import React, { useState, useEffect } from 'react';
import { database } from '../../appwrite/config'; // Import your Appwrite config
import { useParams } from 'react-router-dom'; // Use useParams to get the id from the route
import Select from 'react-select';

const AddNewUser = ({ userDetails }) => {
  const [userData, setUserData] = useState({
    email: '',
  });

  const [users, setUsers] = useState([]); // List of users
  const [error, setError] = useState(''); // For displaying any error messages
  const [currentUsers, setCurrentUsers] = useState([]); // Store current users from the database

  const params = useParams();
  const id = params.id; // Get the document ID from the route

  // Handle change in user selection
  const handleUserChange = (selectedOptions) => {
    const selectedUsers = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setCurrentUsers(selectedUsers); // Ensure currentUsers is always an array
  };

  // Fetch current users when the component mounts
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await database.getDocument(
          '65abf1f6ab18fc1967f8', // Your Appwrite Database ID
          '6783225b0021b7ad3ffe', // Your Appwrite Collection ID
          id // The ID of the document you want to fetch
        );

        // Assuming 'users' is an array of emails in the document, ensure it's an array
        setCurrentUsers(Array.isArray(response.users) ? response.users : []);
      } catch (error) {
        console.error('Error fetching document:', error);
        setError('Failed to fetch existing users. Please try again.');
      }
    };

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
    fetchDocument();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Append the new email to the existing list of users
      const updatedUsers = [...currentUsers, userData.email];

      console.log(updatedUsers);
      // Update the document with the new users list
      const response = await database.updateDocument(
        '65abf1f6ab18fc1967f8', // Your Appwrite Database ID
        '6780a7930039a0477728', // Your Appwrite Collection ID
        id, // The document ID you want to update
        { users: updatedUsers } // Updated users list
      );

      console.log('User added successfully:', response);

      // Reset the form and state after successful update
      setUserData({ email: '' });
      setCurrentUsers(updatedUsers); // Update the state with the new users list
      setError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error adding new user:', error);
      setError('Failed to add user. Please try again.');
    }
  };

  // Map users to the corresponding options for react-select
  const userOptions = users.map((user) => ({
    label: user.email, // You can modify this if you have more user data, e.g., name
    value: user.email,
  }));

  const selectedUserOptions = currentUsers.map((user) => ({
    label: user, // Adjust if you have more detailed user information
    value: user,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New User</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message display */}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Users Involved</label>
            <Select
              options={userOptions}
              isMulti
              onChange={handleUserChange}
              placeholder="Select users"
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedUserOptions} // Pre-select the users already in currentUsers
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;
