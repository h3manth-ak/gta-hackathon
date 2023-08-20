import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Announcement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generalInstructions, setGeneralInstructions] = useState([]);
  const [jobData, setJobData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [skillLevel, setSkillLevel] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleComplete = () => {
    console.log("clicked");
    fetch("https://gta-xqet.onrender.com/admin_confirm", {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `bearer ${userId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("https://gta-xqet.onrender.com/show_anounce", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          heading: item.tittle,
          description: item.desc,
        }));
        setGeneralInstructions(formattedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://gta-xqet.onrender.com/show_currentuser_jobs", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `bearer ${userId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobName(data.jname);
        setJobDescription(data.discription);
        setJobDeadline(data.deadline);
        setSkillLevel(data.skill);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const jobAssignments = [
    {
      heading: "New Job Assignment",
      description:
        "A new job has been assigned to you. Please review the details and start working on it.",
      deadline: "Deadline: 2023-09-30",
      stack: "Stack: React, Node.js, MongoDB",
      overview: "Overview: Develop a web application for project management.",
    },
    // Add more job assignments here
  ];

  console.log(jobData);
  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden ">
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
        <div className="m-4">
          <h1 className="text-3xl font-semibold mb-6">Announcements</h1>
          <h2 className="text-xl font-semibold mb-4">General Instructions</h2>
          {generalInstructions.map((instruction, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <Typography variant="h6" component="h2" className="mb-2">
                  {instruction.heading}
                </Typography>
                <Typography color="textSecondary">
                  {instruction.description}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <h2 className="text-xl font-semibold mb-4">Job Assignments</h2>
          {
            <Card  className="mb-4">
              <CardContent>
                <Typography variant="h6" component="h2" className="mb-2">
                  {jobName}
                </Typography>
                <Typography color="textSecondary">
                  {jobDescription}
                </Typography>
                <Typography color="textSecondary">
                  {jobDeadline}
                </Typography>
                <Typography color="textSecondary">
                  {skillLevel}

                </Typography>
                <div className="mt-4 flex gap-4">
                  <Button
                    onClick={() => {
                      handleComplete();
                    }}
                    variant="contained"
                    color="primary"
                    className="mr-2"
                  >
                    completed..?
                  </Button>
                </div>
              </CardContent>
            </Card>
          }
        </div>
      </div>
    </div>
  );
};

export default Announcement;
