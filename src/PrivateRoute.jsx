import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { account } from './appwrite/config'; // Import your Appwrite account instance

const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially, it's null to show loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get(); // Get current user
        
        if (user && user.email) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        setIsAuthenticated(false); // Handle error if the user is not authenticated
      }
    };

    checkAuth(); // Check authentication status when the component mounts
  }, []);

  // If the authentication status is still loading, render nothing or a loading indicator
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or other UI
  }

  // If the user is authenticated, return the element; otherwise, redirect to the login page
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
