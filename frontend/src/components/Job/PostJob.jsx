import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  // const [salaryFrom, setSalaryFrom] = useState("");
  // const [salaryTo, setSalaryTo] = useState("");
  // const [fixedSalary, setFixedSalary] = useState("");
  // const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
  
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        {
          title,
          description,
          category,
          country,
          city,
          location,
          // Add other required fields here if needed
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW OPPORTUNITY</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">
                  Dermatology
                </option>
                <option value="Emergency Medicine">
                  Emergency Medicine
                </option>
                <option value="Family Medicine">
                  Family Medicine
                </option>
                <option value="Forensic Pathology">Forensic Pathology</option>
                <option value="General Surgery">
                  General Surgery
                </option>
                <option value="Hospital Medicine">Hospital Medicine</option>
                <option value="Neurologyt">
                  Neurologyt
                </option>
                <option value="Orthopaedic Surgery">
                  Orthopaedic Surgery
                </option>
                <option value="Pathology">Pathology</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            {/* <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div> */}
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button type="submit">Create Opportunity</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
