import React from "react";
import { Link } from "react-router-dom";

function JobCatalogue() {
  fetch("https://gta-xqet.onrender.com/admin_notifcation", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const jobs = [
    {
      title: "Job 1",
      description: "This is the description for Job 1.",
      deadline: "2023-08-31",
      employeeName: "John Doe",
    },
    {
      title: "Job 2",
      description: "This is the description for Job 2.",
      deadline: "2023-09-15",
      employeeName: "Jane Smith",
    },
    {
      title: "Job 3",
      description: "This is the description for Job 3.",
      deadline: "2023-09-30",
      employeeName: "Alex Johnson",
    },
    // Add more job items as needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Your Assigned Jobs</h1>
      <div className="space-y-4 md:space-y-6">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-1 md:mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-gray-500">Deadline: {job.deadline}</p>
            <p className="text-gray-500">Assigned to: {job.employeeName}</p>
            <div className="flex flex-col md:flex-row justify-end mt-2">
              <button className="bg-green-500 text-white py-1 px-2 md:py-1 md:px-3 rounded-md text-sm md:text-base hover:bg-green-600 mt-2 md:mt-0 md:ml-2">
                Accept
              </button>
              <button className="bg-red-500 text-white py-1 px-2 md:py-1 md:px-3 rounded-md text-sm md:text-base hover:bg-red-600 mt-2 md:mt-0 md:ml-2">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to={"/admin"}>
        <div className="mt-4 md:mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm md:text-base hover:bg-blue-600">
            Back to Home
          </button>
        </div>
      </Link>
    </div>
  );
}

export default JobCatalogue;
