import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../appwrite/config';

const RemoveUser = () => {
  const params = useParams();
  const id = params.id; // Get the ID of the document
  const [users, setUsers] = useState([]); // State for all users

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database.getDocument(
          '65abf1f6ab18fc1967f8', // Replace with your database ID
          '6783225b0021b7ad3ffe', // Replace with your collection ID
          id // Document ID (if applicable)
        );

        setUsers(response.users || []); // Handle potential absence of "users" field
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleRemove = async (userName) => {
    try {
      // Remove the user from the list in the document
      const updatedUsers = users.filter((user) => user !== userName);

      // Update the document with the new list of users (excluding the removed user)
      await database.updateDocument(
        '65abf1f6ab18fc1967f8', // Replace with your database ID
        '6783225b0021b7ad3ffe', // Replace with your collection ID
        id, // Document ID to update
        {
          users: updatedUsers // Updated list without the removed user
        }
      );

      // Update state to reflect the removed user (optional)
      setUsers(updatedUsers); // Update state with the new list
    } catch (error) {
      console.error('Error updating document:', error);
      // Handle update error (e.g., display an error message)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {/* List of users */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        <ul className="space-y-4">
          {users.length === 0 ? (
            <p>No users to display.</p>
          ) : (
            users.map((user, index) => (
              <li key={index} className="flex justify-between items-center p-3 border-b border-gray-300">
                <div>
                  <p className="font-semibold">{user}</p> {/* Display name or email if available */}
                </div>
                <button
                  onClick={() => handleRemove(user)} // Pass user name directly here
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RemoveUser;
