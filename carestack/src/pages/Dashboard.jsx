import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatButton from "./ChatButton"; // Import the ChatButton component
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import "./UserStyle.css";

const Dashboard = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "purple", "orange"]; // Add more colors if needed
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  const workLogData = [
    { id: 1, work: "Task A", status: "complete" },
    { id: 2, work: "Task B", status: "ongoing" },
    { id: 3, work: "Task C", status: "pending" },
    { id: 4, work: "Task D", status: "complete" },
    { id: 5, work: "Task E", status: "ongoing" },
    { id: 6, work: "Task F", status: "ongoing" },
  ];

  function getStatusColor(status) {
    switch (status) {
      case "complete":
        return "text-green-500";
      case "ongoing":
        return "text-blue-500";
      case "pending":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  }

  // Sample schedule data array
  const scheduleData = [
    { time: "09:00 AM", meeting: "Team Standup" },
    { time: "02:00 PM", meeting: "Client Presentation" },
    { time: "04:30 PM", meeting: "Code Review" },
  ];


  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem('userId');
  fetch("https://gta-xqet.onrender.com/users/me/", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `bearer ${userId}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
        setUserData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });


  return (
    <div className="flex bg-primary overflow-hidden " ref={ref}>
      {/* Sidebar */}
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
          <div className="mt-10">
            <Link to="/user">
              <p className="m-5">Home</p>
            </Link>
            <Link to="/dashboard">
              <p className="m-5">Dashbord</p>
            </Link>
            <Link to="/profile">
              <p className="m-5">Profile</p>
            </Link>
            <Link to="/announcement">
              <p className="m-5">Announcements</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-0 sm:ml-60" : "ml-0"
        }`}
      >
        <nav className="bg-navbar-color p-4 bg-fixed  w-full z-50  top-0 ">
          <div className="flex items-center justify-between">
            <button
              onClick={handleSidebarToggle}
              className="text-custom-blackk"
            >
              {sidebarOpen ? null : (
                <div className="flex items-center  ">
                  <MenuIcon />
                  <img
                    src="./images/logo.jpg"
                    alt="Logo"
                    className="h-8 w-32 ml-4"
                  />
                </div>
              )}
            </button>
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <Link to={"/announcement"}>
                <button className="text-secondary">
                  <NotificationsIcon />
                </button>
              </Link>

              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Link to={"/profile"}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaQlO7ukqmBVlJd_ToyW9nDJXU8UCmpCjGYjhK79PIA&s"
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="bg-primary min-h-screen overflow-y-auto scroll-ms-0">
          {/* ... (main content) */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4">
            {/* First Container */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 flex-1">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Points</h2>
                  <p className="text-gray-600 mb-6">
                    Number of Points Earned this month
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="text-2xl font-semibold">
                      {userData.epoint}
                    </p>
                  </div>
                </div>

                <div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Skill Level</h2>

                    <div className="flex items-center ">
                      <div
                        className={`text-base sm:text-[38px]  font-tertiary ${
                          userData.skillp > 50
                            ? "text-green-500"
                            : "text-red-500"
                        }  sm:mt-4`}
                      >
                        {inView ? (
                          <CountUp
                            start={0}
                            end={userData.skillp}
                            duration={1}
                          />
                        ) : null}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional content like skills can be added here */}
            </div>

            {/* Second Container */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 flex-1">
              <h2 className="text-xl font-semibold mb-3">Schedule</h2>
              <p className="text-gray-600 mb-6">{getCurrentDate()}</p>

              <div className="schedule-list">
                {scheduleData.map((schedule, index) => (
                  <div key={index} className="schedule-item">
                    <p className="text-gray-400">{schedule.time}</p>
                    <div className="flex-auto h-px bg-yellow-500 mx-8 my-0"></div>
                    <p className="text-black">{schedule.meeting}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Third Container */}

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 mt-4">
            <h2 className="text-xl font-semibold mb-3">Work Log</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workLogData.map((log) => (
                <div
                  key={log.id}
                  className="border border-gray-300 p-4 rounded-lg shadow-md flex flex-col justify-between transition transform hover:scale-105"
                >
                  <div>
                    <div className="text-lg font-semibold mb-2">{log.work}</div>
                    <div
                      className={`${getStatusColor(log.status)} text-sm mb-2`}
                    >
                      {log.status}
                    </div>
                  </div>
                  {log.status !== "complete" && (
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                      Mark as Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
        <ChatButton /> {/* Add the ChatButton component here */}
      </div>
    </div>
  );
};

export default Dashboard;




