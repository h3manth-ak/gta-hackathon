import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications"; // Import the NotificationsIcon
// import ChatButton from "./ChatButton.jsx"; // Import the ChatButton component
// import  Chat from "@mui/icons-material"; // Import the Chat icon from Material-UI
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";

const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const userId = localStorage.getItem('userId');
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  fetch("https://gta-xqet.onrender.com/users/me/", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      `bearer ${userId}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setName(data.name);
      setSkillLevel(data.skillp);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <div className="flex bg-primary overflow-hidden ">
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

        <main
          className="bg-primary min-h-screen overflow-y-auto scroll-ms-0 bg-cover bg-center bg-blu  "
          style={{
            backgroundImage:
              "url(https://source.unsplash.com/E8Ufcyxz514/2400x1823)",
          }}
        >
          <h1 className="text-5xl flex justify-center   backdrop:blur-lg items-center  mt-28 font-bold ">
            Welcome {name}
          </h1>
          <h3 className="flex text-lg  justify-center items-center">
            software engineer
          </h3>

          <div className=" flex justify-evenly items-center h-full mt-10 pt-10 gap-10 ">
            {/* Log Card */}
            <div className="bg-white rounded-lg shadow-md p-6 min-w-[250px] border border-gray-300 h-[300px] flex flex-col ">
              <h2 className="text-xl font-semibold mb-3 text-center">
                Work Log
              </h2>
              <div className="flex flex-col items-center m-auto justify-center">
                <p className="text-gray-600 text-center">
                  Total Works completed: <strong>10</strong>
                </p>
                <p className="text-gray-600 mt-4 text-center">
                  Pending Works: <strong>1</strong>
                </p>
              </div>
            </div>
            {/* Rating Card */}
            <div className="bg-white rounded-lg shadow-md p-6 min-w-[250px] border border-gray-300 h-[300px] flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex justify-center items-center text-white text-2xl font-semibold">
                  {skillLevel}%
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xl font-semibold mb-3">Skill level</p>
              </div>
            </div>
          </div>
          {/* <Link></Link> */}
          <Link to="/chat">
            <button className="bg-blue-500 text-white p-3 h-15 w-15 rounded-full  fixed bottom-4 right-4  ">
              {" "}
              <ChatIcon />{" "}
            </button>
          </Link>
        </main>
      </div>
      {/* Add the ChatButton component here */}
    </div>
  );
};

export default User;
