import React, { useState } from "react";
// import { MenuIcon, CloseIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const attendanceData = [
    "2023-08-01",
    "2023-08-03",
    "2023-08-07",
    "2023-08-08",
    "2023-08-09",
    "2023-08-10",
    "2023-08-11",
    "2023-08-14",
    "2023-08-15",
    "2023-08-16",
    "2023-08-17",
    "2023-08-18",
    "2023-08-21",
    "2023-08-22",
    "2023-08-24",
    "2023-08-26",
    "2023-08-27",
    "2023-08-28",
    "2023-08-30",
    "2023-08-31",
    // ... add more dates
  ];

  // Function to check if a date has attendance
  const hasAttendance = (date) => attendanceData.includes(date);
  const [userData, setUserData] = useState({});

  // Create an array of dates for the current month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const datesInMonth = Array.from(
    { length: daysInMonth },
    (_, index) => new Date(currentYear, currentMonth, index + 1)
  );
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
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
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
        {/* Navbar */}
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

        <main className="bg-gray-100 p-4">
          {/* First Section */}
          <section className="mb-8">
            <div className="flex justify-center gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 w-96 flex">
                {/* Picture */}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaQlO7ukqmBVlJd_ToyW9nDJXU8UCmpCjGYjhK79PIA&s"
                  alt="Profile"
                  className="h-32 w-32 rounded-full"
                />

                {/* Details */}
                <div className="flex flex-col justify-center ml-4">
                  <h3 className="text-lg font-semibold">{userData.name}</h3>
                  <div className="flex items-center mt-1">
                    <span
                      className="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Active
                    </span>
                  </div>
                  <p className="mt-2">Role:  {userData.role}</p>
                  <p>Email: {userData.email}</p>
                  <p>Phone: +123 456 7890</p>
                  <p>Company:Tesla</p>
                </div>
              </div>

              {/* Second Card */}
              <div className="bg-white rounded-lg shadow-md p-6 w-72 mt-4">
                {/* ... (content for the second card) */}
                <h3 className="text-lg font-semibold mb-4">Calendar</h3>
                <div className="grid grid-cols-7 gap-1">
                  {datesInMonth.map((date) => (
                    <div
                      key={date}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        hasAttendance(date.toISOString().split("T")[0])
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {date.getDate()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Second Section */}
          <section className="flex mt-6 space-x-4">
            {/* First Row */}
            <div className="bg-white rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <AccountCircleIcon />
                  <p className="text-gray-600 mb-1">Employee ID</p>
                </div>
                <p>12345</p>
                <div className="flex items-center space-x-2">
                  <WorkIcon />
                  <p className="text-gray-600 mb-1">Hire Date</p>
                </div>
                <p>2020-07-15</p>
                <div className="flex items-center space-x-2">
                  <SchoolIcon />
                  <p className="text-gray-600 mb-1">Number of Years</p>
                </div>
                <p>3</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="bg-white rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="flex items-center space-x-2">
                <AccountCircleIcon />
                <p className="text-gray-600 mb-1">Date of Birth</p>
              </div>
              <p>1990-05-10</p>
              <div className="flex items-center space-x-2">
                <LocationOnIcon />
                <p className="text-gray-600 mb-1">Address</p>
              </div>
              <p>123 Main Street, City, Country</p>
              <div className="flex items-center space-x-2">
                {/* <SchoolIcon /> */}
                <p className="text-gray-600 mb-1">Marital Status</p>
              </div>
              <p>Married</p>
            </div>

            {/* Third Row */}
            <div className="bg-white rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-lg font-semibold mb-4">
                Occupational Information
              </h3>
              <div className="flex items-center space-x-2">
                <WorkIcon />
                <p className="text-gray-600 mb-1">Job Type</p>
              </div>
              <p>Full Time</p>
              <div className="flex items-center space-x-2">
                <SchoolIcon />
                <p className="text-gray-600 mb-1">Highest Qualification</p>
              </div>
              <p>Master's Degree</p>
              <div className="flex items-center space-x-2">
                <LocationOnIcon />
                <p className="text-gray-600 mb-1">Current Address</p>
              </div>
              <p>456 Business Avenue, City, Country</p>
            </div>
          </section>
        </main>
        <div className="flex items-center justify-center">
          <Link to={"/"}>
            <button className="bg-blue-500 text-white px-4 py-2 flex  rounded ">
              Log out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
