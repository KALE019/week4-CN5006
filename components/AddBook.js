import React, { useState } from "react";
import axios from 'axios';

export default function Book_Form() {
  const url = "http://localhost:5000/";

  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setState({
      ...state,
      [name]: type === "range" ? Number(value) : value,
    });
  };

  const OnSubmit = (e) => {
    e.preventDefault();

    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate
    };

    axios.post(url + "addbooks", bookdata)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Add Book</h3>
      <form onSubmit={OnSubmit}>

        {/* Book Title */}
        <div className="form-group">
          <label>Book Title:</label>
          <input
            className="form-control"
            type="text"
            name="booktitle"
            value={state.booktitle}
            onChange={handleChange}
          />
        </div>

        {/* Authors */}
        <div className="form-group">
          <label>Book Authors:</label>
          <input
            className="form-control"
            name="author"
            value={state.author}
            onChange={handleChange}
          />
        </div>

        {/* Topic */}
        <div className="form-group">
          <label>Pick Book Topic:</label>
          <select
            className="form-control"
            name="Topic"
            value={state.Topic}
            onChange={handleChange}
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            <option value="AI">AI</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        {/* Format */}
        <div className="form-group">
          <label>Format:</label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="formate"
              value="Hard Copy"
              checked={state.formate === "Hard Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label">Hard Copy</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="formate"
              value="Electronic Copy"
              checked={state.formate === "Electronic Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label">Electronic Copy</label>
          </div>
        </div>

        {/* Publication Year */}
        <div className="form-group">
          <label>
            Publication Year (1980–2025): {state.PubYear}
          </label>
          <input
            type="range"
            className="form-range"
            name="PubYear"
            min="1980"
            max="2025"
            value={state.PubYear}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className="form-group">
          <center>
            <input
              type="submit"
              value="Add this book"
              className="btn btn-primary"
            />
          </center>
        </div>

      </form>
    </div>
  );
}
