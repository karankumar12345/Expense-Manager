import React, { useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */
import AddNewUser from './AddNewUser';
import RemoveUser from './RemoveUser';
import ExpenseList from './ExpenseList';
import Analysis from './CompleteAnalysis';
import ExpenseListBySingle from './ExpenseListByIndiv';
import AddNewExpense from './NewExpense';
import Category from './category';
import { account } from '../../appwrite/config';
import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
      const getData = account.get();
      getData.then(
        function (response) {
          setUserDetails(response);
        },
        function (error) {
          console.log(error);
        }
      );
    }, []);
  const [activeTab, setActiveTab] = useState('NewExpense'); // State to track active content

  const renderContent = () => {
    switch (activeTab) {
      case 'AddUser':
        return <AddNewUser userDetails={userDetails}/>;
    
      case 'RemoveUser':
        return <RemoveUser userDetails={userDetails}/>
      case 'Analysis':
        return <Analysis userDetails={userDetails}/>;
      case 'Expenses':
        return <ExpenseList userDetails={userDetails}/>;
    
      case 'BySingleUser':
        return <ExpenseListBySingle userDetails={userDetails}/>;
      case 'NewExpense':
        return <AddNewExpense userDetails={userDetails}/>;
      case 'Category':
        return <Category userDetails={userDetails}/>;
      default:
        return <div>Select an Option from Sidebar</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-gray-800 text-white flex flex-col">
        <h1 className="text-xl font-bold p-4 border-b border-gray-700">Expense Manager</h1>
        <nav className="flex flex-col space-y-2 p-4">
          <button
            onClick={() => setActiveTab('AddUser')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'AddUser' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
      Add New User
          </button>
          <button
            onClick={() => setActiveTab('RemoveUser')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'RemoveUser' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            Remove User
          </button>
          <button
            onClick={() => setActiveTab('Analysis')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'Analysis' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            Show Complete Analysis
          </button>
          <button
            onClick={() => setActiveTab('Expenses')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'Expenses' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            ALl Exps List
          </button>
          <button
            onClick={() => setActiveTab('BySingleUser')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'BySingleUser' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
          Single User List
          </button>
          <button
            onClick={() => setActiveTab('NewExpense')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'NewExpense' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
         Add New Expense
          </button>
          <button
            onClick={() => setActiveTab('Category')}
            className={`py-2 px-4 rounded-lg text-left ${
              activeTab === 'Category' ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
         Add New Category
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
