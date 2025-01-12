import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../appwrite/config';

const ExpenseList = () => {
  const params = useParams();
  const id = params.id; // Get the ID from the route (if applicable)
  const [expenses, setExpenses] = useState([]); // State for all expenses

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database.listDocuments(
          '65abf1f6ab18fc1967f8', // Replace with your database ID
          '67839cb3001f268cd5d4' // Replace with your collection ID
        );

        // Filter expenses based on MainListId (if provided in the route)
        const filteredExpenses = id
          ? response.documents.filter((expense) => expense.MainListId === id)
          : response.documents;

        setExpenses(filteredExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Expense List</h2>

      {/* List of Expenses */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Expenses</h3>
        <ul className="space-y-4">
          {expenses.length === 0 ? (
            <p>No expenses recorded yet.</p>
          ) : (
            expenses.map((expense) => (
              <li
                key={expense.$id}
                className="flex justify-between items-center p-3 border-b border-gray-300"
              >
                <div>
                  <p className="font-semibold">{expense.user}</p>
                  <p className="text-gray-500">{expense.category}</p>
                </div>
                <div className="text-blue-500">₹{expense.amount}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;