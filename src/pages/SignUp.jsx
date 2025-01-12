import React, { useState } from "react";
import { account, database } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signupUser = async (e) => {
    e.preventDefault();
  
    try {
      // Create account and document in parallel
      const [accountResponse, databaseResponse] = await Promise.all([
        account.create(uuid(), user.email, user.password, user.name),
        database.createDocument(
          "65abf1f6ab18fc1967f8",
          "6780a7930039a0477728",
          uuid(),
          {
            name: user.name,
            email: user.email,
            password: user.password,
          }
        ),
      ]);
  
      // Log responses for debugging
      console.log(accountResponse);
      console.log(databaseResponse);
  
      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      // Handle any errors that occurred in the async operations
      console.log("Error during signup:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={signupUser}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;