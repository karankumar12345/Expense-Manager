import React, { useEffect, useState } from 'react';
import { database, account } from '../../appwrite/config'; // Import your Appwrite config
import { useNavigate } from 'react-router-dom'; // Use navigate for programmatic navigation

const AllList = () => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null); // To store authenticated user
  const navigate = useNavigate(); // Initialize the navigation function

  // Fetch user info and expenses on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the current authenticated user from Appwrite
        const currentUser = await account.get(); // Get authenticated user details
        setUser(currentUser); // Set the authenticated user

        // Fetch expenses only if the user is authenticated
        if (currentUser) {
          fetchExpenses(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle unauthenticated state or redirect to login if needed
      }
    };

    const fetchExpenses = async (currentUser) => {
      try {
        const response = await database.listDocuments(
          '65abf1f6ab18fc1967f8', // Your Appwrite Database ID
          '6783225b0021b7ad3ffe' // Your Appwrite Collection ID
        );

        console.log(response);
        // Filter the expenses to only include those related to the authenticated user
        const userExpenses = response.documents.filter((expense) => 
          Array.isArray(expense.users) && expense.users.includes(currentUser.email) // Filter by email or other user identifier
        );

        setExpenses(userExpenses); // Update state with the filtered expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchUser(); // Call function to fetch user and expenses
  }, []); // Empty dependency array means it runs on mount

  // Handle redirection on clicking an expense item
  const handleSubmit = (id) => {
    navigate(`/List-item/${id}`); // Navigate to the expense detail page using the expense ID
  };

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">Please log in to see your expenses.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Your Expense Manager Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div
              key={expense.$id} // Use the expense ID as the key
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleSubmit(expense.$id)} // Navigate to expense details on click
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {expense.title}
              </h2>
              <p className="text-gray-600">
                <strong>Total Expense:</strong> ${expense.amount}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Contributions:</h3>
                <ul className="space-y-2">
                  {Array.isArray(expense.users) && expense.users.length > 0 ? (
                    expense.users.map((user, userIndex) => (
                      <li key={userIndex} className="flex justify-between text-gray-600">
                        <span>{user}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">No contributions available</li>
                  )}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No expenses found for your account.</div>
        )}
      </div>
    </div>
  );
};

export default AllList;
