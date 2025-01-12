import React, { useEffect, useState } from 'react';
import { account } from "../appwrite/config";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
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

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Profile
        </h2>
        {userDetails ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Name:</p>
              <p className="text-lg font-bold text-gray-900">{userDetails.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email:</p>
              <p className="text-lg font-bold text-gray-900">{userDetails.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
