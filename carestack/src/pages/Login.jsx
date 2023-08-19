import React, { useState } from "react";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Employee ID:", employeeId);
    console.log("Password:", password);
    // You can perform further actions here, such as sending the data to a server
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl text-center mb-2">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-gray-700 mb-1">
              Employee Id
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              className="w-full px-4 py-2 sm:px-6 sm:py-3 rounded-md border border-gray-300 focus:ring focus:ring-gray-200 focus:border-gray-300"
              placeholder="Enter your Employee Id"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 sm:px-6 sm:py-3 rounded-md border border-gray-300 focus:ring focus:ring-gray-200 focus:border-gray-300"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="text-red-600 font-bold text-sm mb-5 text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-gray-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
