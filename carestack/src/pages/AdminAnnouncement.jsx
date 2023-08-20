import React, { useState } from "react";
import { Link } from "react-router-dom";
function Popup({ message, onClose }) {
  return (
    <div className="fixed flex justify-center items-center flex-col top-0 left-0 right-0 bg-white p-4 shadow-lg">
      <p className="text-center text-green-700 font-bold">{message}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 w-20 rounded hover:bg-blue-600"
        onClick={onClose}
      >
        Home
      </button>
    </div>
  );
}

function AdminAnnouncement() {
  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAnnouncementChange = (event) => {
    setAnnouncement(event.target.value);
  };

  const handlePostAnnouncement = () => {
    // You can add code here to handle posting the announcement, e.g. sending it to a backend API.
    console.log("Announcement posted:", title, announcement);
    fetch("https://gta-xqet.onrender.com/anounce", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tittle: title,
        discription: announcement,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Clear the title and announcement fields
    setTitle("");
    setAnnouncement("");
    setShowPopup(true);
    setSuccessMessage("Annoncement posted successfully.");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-4 bg-gray-200 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Admin Announcement
        </h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter announcement title..."
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Enter announcement here..."
            value={announcement}
            onChange={handleAnnouncementChange}
          />
        </div>
        <div className="space-x-2 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handlePostAnnouncement}
          >
            Post
          </button>
          <Link to={"/admin"}>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Home
            </button>
          </Link>
        </div>
      </div>
      {showPopup && (
        <Popup
          message={successMessage}
          onClose={() => {
            setShowPopup(false);
            setSuccessMessage("");
          }}
        />
      )}
    </div>
  );
}

export default AdminAnnouncement;
