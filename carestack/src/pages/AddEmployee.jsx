import React, { useState } from "react";
import { Link } from "react-router-dom";

const roles = ["Admin", "Manager", "Employee"];
const skills = ["React", "flutter", "Node.js", "kotlin", "Java", "Python" , "C++", "C", "C#", "PHP", "Ruby", "Go", "Swift", "TypeScript", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Julia", "Elixir", "Clojure", "Groovy", "R", "Erlang"];

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

function AddEmployee() {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const employeeData = {
      employeeId,
      name,
      password,
      confirmPassword,
      address,
      email,
      phoneNumber,
      role: selectedRole,
      skill: selectedSkill,
      skillLevel,
    };
    console.log("Employee data submitted:", employeeData);
    // Show the popup
    setShowPopup(true);
    setSuccessMessage("Employee data submitted successfully.");

    fetch("https://gta-xqet.onrender.com/add_employee", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        password: password,
        email: email,
        role: selectedRole,
        skillp: skillLevel,
        skill: selectedSkill,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container items-center justify-center  mx-auto mt-8">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Employee Details
      </h2>
      <div className="bg-gray-200  rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Employee ID:
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Employee ID"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Password"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Address:
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Address"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Phone Number:
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Role:
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Skills:
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
            >
              <option value="">Select Skill</option>
              {skills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3 font-medium text-right mr-4">
              Skill Level:
            </label>
            <input
              type="text"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="flex-grow border px-3 py-2 rounded"
              placeholder="Skill Level"
            />
          </div>

          <div className="text-center flex justify-center gap-10 ml-32 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <Link to={"/admin"}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Home
              </button>
            </Link>
          </div>
        </form>
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

export default AddEmployee;
