import React from 'react';
import { Link } from "react-router-dom";

const jobData = [
  {
    title: 'Job 1',
    description: 'job 1 description',
    assignedMember: 'John Doe',
    status: 'completed',
    deadline: '2023-08-31',
  },
  {
    title: 'Job 2',
    description: 'job 2 description',
    assignedMember: 'Jane Smith',
    status: 'pending',
    deadline: '2023-09-10',
  },
  {
    title: 'Job 3',
    description: 'job 3 description',
    assignedMember: 'Alex Johnson',
    status: 'reassigned',
    deadline: '2023-09-05',
  },{
    title: 'Job 1',
    description: 'job 1 description',
    assignedMember: 'John Doe',
    status: 'completed',
    deadline: '2023-08-31',
  },
  {
    title: 'Job 2',
    description: 'job 2 description',
    assignedMember: 'Jane Smith',
    status: 'pending',
    deadline: '2023-09-10',
  },
  {
    title: 'Job 3',
    description: 'job 3 description',
    assignedMember: 'Alex Johnson',
    status: 'reassigned',
    deadline: '2023-09-05',
  },
  
];

const statusColors = {
  completed: 'bg-green-500',
  pending: 'bg-yellow-500',
  reassigned: 'bg-red-500',
};

function JobLog() {
    return (
      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Job Log</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {jobData.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <div className={`px-4 py-3 ${statusColors[job.status]}`}>
                <span className="text-white font-bold">{job.status}</span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.description}</p>
                <p className="text-sm text-gray-500">
                  Assigned to: {job.assignedMember}
                </p>
                <p className="text-sm text-gray-500">
                  Deadline: {job.deadline}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
            <Link to={'/admin'}>
            
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go Back to Home
          </button>
            </Link>
        </div>
      </div>
    );
  }
  
  export default JobLog;