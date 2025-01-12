import React from 'react';
import AllList from './Lists/AllList';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
    const handlesubmit = () => {
        window.location.href = '/add-new-list';
    };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Track and Split Expenses Effortlessly
        </h1>
        <p className="text-gray-600 text-lg">
          Simplify your finances with real-time tracking and group expense management.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handlesubmit}>
          <AddIcon className="mr-2" /> Add New Expense
        </button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Track Expenses
          </h3>
          <p className="text-gray-600">
            Stay updated on how your money is spent with detailed insights.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Split Bills
          </h3>
          <p className="text-gray-600">
            Share expenses fairly among your group members.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Monthly Summaries
          </h3>
          <p className="text-gray-600">
            Get a complete overview of your spending every month.
          </p>
        </div>
      </div>

      {/* Expense List Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Expenses</h2>
        <AllList />
      </div>
    </div>
  );
};

export default HomePage;
