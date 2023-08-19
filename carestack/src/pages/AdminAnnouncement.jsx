import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminAnnouncement() {
  const [announcement, setAnnouncement] = useState("");

  const handleAnnouncementChange = (event) => {
    setAnnouncement(event.target.value);
  };

  const handlePostAnnouncement = () => {
    // You can add code here to handle posting the announcement, e.g. sending it to a backend API.
    console.log("Announcement posted:", announcement);
    // Clear the text field after posting
    setAnnouncement("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-4 bg-gray-200 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Admin Announcement
        </h1>
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
    </div>
  );
}

export default AdminAnnouncement;
