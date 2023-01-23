import axios from "axios";
import "../App.css";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [data, setData] = useState({
    project_name: "",
    version: "",
    build_no: null,
    release_note: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/", data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form-group d-flex flex-column container center_div mt-5">
      <div className="mt-5">
        <h1>Add New Notes</h1>
      </div>

      <div className="mb-3 mt-3">
        <input
          className="form-control"
          type="text"
          placeholder="Project title"
          name="project_name"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Version"
          name="version"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Build Number"
          name="build_no"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows={5}
          type="text"
          placeholder="Note Description"
          name="release_note"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleClick}>
          Add
        </button>
      </div>

      
      <div className="mb-3">
        <Link to="/">
          <button className="btn btn-primary">Go Back</button>
        </Link>
        {error && "Something went wrong!"}
      </div>
    </div>
  );
};

export default Add;
