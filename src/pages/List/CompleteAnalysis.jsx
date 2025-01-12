import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../appwrite/config';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis = () => {

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


  // Group expenses by category for the graph
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  // Data for the chart
  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Total Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Complete Expense Analysis</h2>

      {/* Expense Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Total Expenses by Category</h3>
        <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Expenses Analysis' } } }} />
      </div>
    </div>
  );
};

export default Analysis;
