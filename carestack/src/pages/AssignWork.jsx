import React, { useState } from "react";
import { Link } from "react-router-dom";

const jobNames = ["Frontend Dev", "Android Dev", "Backend"];
const skills = ["React", "flutter", "kotlin", "Python","Dart"];

const priorities = ["easy", "medium", "hard"];

// const employees = [
//   {
//     id: 1,
//     name: "John Doe",
//     avatarUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaQlO7ukqmBVlJd_ToyW9nDJXU8UCmpCjGYjhK79PIA&s",
//     rating: 4.5,
//   },
// ];

function AssignWork() {
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState(""); // New state for job title
  const [showCards, setShowCards] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("158a7e52-58c3-47d4-9d21-d34bd0482f64");
  const [employeeList, setEmployeeList] = useState([{}]); // New state for employee list

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };
  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      selectedJob,
      selectedSkill,
      selectedPriority,
      jobDescription,
      jobTitle,
      deadline, // Add the deadline here
    };

    async function fetchEmployeeData(selectedEmployee) {
      try {
        const response = await fetch("https://gta-xqet.onrender.com/get_emp", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: selectedEmployee,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setEmployeeList(data); // Assuming setEmployeeList is a valid function
      } catch (error) {
        console.error("Error:", error);
      }
    }



    async function postData() {
      try {
        const response = await fetch("https://gta-xqet.onrender.com/add_job", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedJob,
            skill: selectedSkill,
            discription: jobDescription,
            difficulty: selectedPriority,
            deadline: deadline,
          }),
        });
    
        const data = await response.json();
        console.log(data);
        setSelectedEmployee(data.userid);
        await fetchEmployeeData(data.userid);
        console.log(data.userid);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
    postData();
    
    // fetch("https://gta-xqet.onrender.com/add_job", {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: selectedJob,
    //     skill: selectedSkill,
    //     discription: jobDescription,
    //     difficulty: selectedPriority,
    //     deadline: deadline,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setSelectedEmployee(data.userid);
    //     fetchEmployeeData(selectedEmployee);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    // fetch("https://gta-xqet.onrender.com/get_emp", {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     uuid: selectedEmployee,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setEmployeeList(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    
    
    setShowCards(true);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen gap-4 bg-gray-100">
      <div className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Assign Work</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <label htmlFor="jobName" className="block w-1/3 font-medium">
              Job Name
            </label>
            <select
              id="jobName"
              className="w-2/3 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={selectedJob}
              onChange={handleJobChange}
            >
              <option value="">Select a Job</option>
              {jobNames.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <label htmlFor="skill" className="block w-1/3 font-medium">
              Skill
            </label>
            <select
              id="skill"
              className="w-2/3 border rounded px-3 py-2 mt-1"
              value={selectedSkill}
              onChange={handleSkillChange}
            >
              <option value="">Select a Skill</option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <label htmlFor="jobTitle" className="block w-1/3 font-medium">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              className="w-2/3 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={jobTitle}
              onChange={handleJobTitleChange}
              placeholder="Enter job title..."
            />
          </div>
          <div className="flex space-x-4">
            <label htmlFor="description" className="block w-1/3 font-medium">
              Job Description
            </label>
            <textarea
              id="description"
              className="w-2/3 border rounded px-3 py-2 mt-1 resize-none focus:outline-none focus:ring focus:border-blue-300"
              value={jobDescription}
              onChange={handleDescriptionChange}
              rows="4"
              placeholder="Enter job description here..."
            />
          </div>
          <div className="flex space-x-4">
            <label htmlFor="deadline" className="block w-1/3 font-medium">
              Deadline
            </label>
            <input
              type="text"
              id="deadline"
              className="w-2/3 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={deadline}
              onChange={handleDeadlineChange}
              placeholder="Enter deadline..."
            />
          </div>

          <div className="flex space-x-4">
            <label htmlFor="priority" className="block w-1/3 font-medium">
              Priority
            </label>
            <select
              id="priority"
              className="w-2/3 border rounded px-3 py-2 mt-1"
              value={selectedPriority}
              onChange={handlePriorityChange}
            >
              <option value="">Select a Priority</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center flex gap-10">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Assign
            </button>
            <Link to={"/admin"}>
              <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Home
              </button>
            </Link>
          </div>
        </form>
      </div>

      

      {showCards && (
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-lg mt-4 md:mt-0">
          <h4 className="font-bold pb-2">The work is assigned to</h4>
          <div
            key={employeeList.id}
            className="mb-4 p-4 bg-gray-200 rounded-lg flex items-center"
          >
            <div
              className="w-16 h-16 rounded-full bg-gray-300 mr-4"
              style={{
                backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaQlO7ukqmBVlJd_ToyW9nDJXU8UCmpCjGYjhK79PIA&s")`,
                backgroundSize: "cover",
              }}
            ></div>
            <div>
              <p className="text-lg font-semibold">{employeeList.name}</p>
              <p className="text-gray-600">
                Skill level: {employeeList.skillp}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignWork;
