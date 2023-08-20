import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [userSkill, setUserSkill] = useState([{}]);

  fetch("https://gta-xqet.onrender.com/users", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtaSIsImlkIjozLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE2OTI1MTM2NzJ9.OiYeNPxF_zmTLXXbAxXb68M3CVXAgjjV7tmykMu9GNM",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // setUserSkill(data.skill);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(userSkill);
  // Sample data for scheduled meetings
  const scheduledMeetings = [
    {
      id: 1,
      date: "2023-08-25",
      time: "14:00",
      department: "Sales",
    },
    {
      id: 2,
      date: "2023-08-27",
      time: "10:30",
      department: "Marketing",
    },
    // Add more scheduled meetings here
  ];

  const chartData = [
    ["role", "no of employee"],
    ["front end engg", 20],
    ["project manager", 2],
    ["backend engg", 8],
    ["ui/ux designer", 6],
    ["3D artist", 4],
  ];

  return (
    <div className="flex">
      <div
        className={`fixed h-full w-full sm:w-60 bg-gray-700 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button onClick={handleSidebarToggle} className="text-white">
            <div className="flex items-center ">
              <CloseIcon />
              <img
                src="./images/logo.jpg"
                alt="Logo"
                className="h-8 w-32 ml-4"
              />
            </div>
          </button>

          {/* Navigation Links in Sidebar */}
          <div className={`mt-8 ${sidebarOpen ? "block" : "hidden"} sm:block`}>
            <a href="#" className="block text-white mt-2">
              Home
            </a>
            <a href="#" className="block text-white mt-2">
              Assign Work
            </a>
            <a href="#" className="block text-white mt-2">
              Add Employee
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-0 sm:ml-60" : "ml-0"
        }`}
      >
        <nav className="bg-blue-600 p-4">
          <div className="flex items-center justify-between">
            <button onClick={handleSidebarToggle} className="text-white">
              {sidebarOpen ? null : (
                <div className="flex items-center">
                  <MenuIcon />
                  <img
                    src="./images/logo.jpg"
                    alt="Logo"
                    className="h-8 w-32 ml-4"
                  />
                </div>
              )}
            </button>
            <div className="flex items-center space-x-4 gap-5 md:flex hidden">
              {/* New Links */}
              <Link to={"/admin"} className="text-white">
                Home
              </Link>
              <Link to={"/assignwork"} className="text-white">
                Assign Work
              </Link>
              <Link to={"/addemployee"} className="text-white">
                Add Employee
              </Link>
              <Link to={"/"} className="text-white">
                Log out
              </Link>
            </div>

            <div className="flex items-center space-x-4 gap-5 ">
              {/* Notification Icon */}

              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaQlO7ukqmBVlJd_ToyW9nDJXU8UCmpCjGYjhK79PIA&s"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="p-4 flex pt-10 gap-16 ">
          <div>
            <h1 className="text-2xl font-semibold mb-4">Scheduled Meetings</h1>

            {/* Card for scheduled meetings */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Upcoming Meeting</h2>
              {scheduledMeetings.length > 0 ? (
                <div>
                  <p>Date: {scheduledMeetings[0].date}</p>
                  <p>Time: {scheduledMeetings[0].time}</p>
                  <p>Department: {scheduledMeetings[0].department}</p>
                </div>
              ) : (
                <p>No upcoming meetings</p>
              )}
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Schedule New Meeting
                </button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md">
                  View All Meetings
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-4">Scheduled Meetings</h1>

            {/* Card for scheduled meetings */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Upcoming Meeting</h2>
              {scheduledMeetings.length > 0 ? (
                <div>
                  <p>Date: {scheduledMeetings[0].date}</p>
                  <p>Time: {scheduledMeetings[0].time}</p>
                  <p>Department: {scheduledMeetings[0].department}</p>
                </div>
              ) : (
                <p>No upcoming meetings</p>
              )}
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Schedule New Meeting
                </button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md">
                  View All Meetings
                </button>
              </div>
            </div>
          </div>
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            data={chartData}
            options={{
              title: "Employee roles",
            }}
          />
        </main>
        <div className="flex gap-10 flex-col  justify-center items-center">
          <Link
            className="flex gap-10 flex-col w-full justify-center items-center"
            to={"adminannouncement"}
          >
            <button className="bg-blue-500 w-1/6 text-white px-3 py-1 rounded-md">
              Announcement
            </button>
          </Link>
          <Link
            to={"jobcata"}
            className="flex gap-10 flex-col w-full justify-center items-center"
          >
            <button className="bg-blue-500 w-1/6 text-white px-3 py-1 rounded-md">
              Job catalogue
            </button>
          </Link>
          <Link
            to={"joblog"}
            className="flex gap-10 flex-col w-full justify-center items-center"
          >
            <button className="bg-blue-500 w-1/6 text-white px-3 py-1 rounded-md">
              Job Log
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
