// index.js
// Week 4 REST API Lab - Exercises 1,2,3,4 in order

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 5000;

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ====================
   Exercise 1 - Basic
   ==================== */
app.get("/", (req, res) => {
  res.send("hello it is my first express application");
});

/* ====================
   Exercise 2 - Extra routes
   ==================== */
app.get("/about", (req, res) => {
  res.send("This is basic express application");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  // returns route params as JSON
  res.json(req.params);
});

/* ====================
   Exercise 3 - JSON file handling (GET)
   ==================== */
app.get("/GetStudents", (req, res) => {
  fs.readFile(path.join(__dirname, "Student.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Error reading Student.json" });
    }
    res.json({
      status: true,
      Status_Code: 200,
      requested_at: new Date().toISOString(),
      requrl: req.url,
      requestMethod: req.method,
      studentdata: JSON.parse(data)
    });
  });
});

app.get("/GetStudentid/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "Student.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Error reading Student.json" });
    }
    const students = JSON.parse(data);
    const student = students["Student" + req.params.id]; // Student1, Student2...
    if (student) {
      return res.json(student);
    } else {
      return res.json({
        status: true,
        Status_Code: 200,
        requested_at: new Date().toISOString(),
        requrl: req.url,
        requestMethod: req.method,
        studentdata: students
      });
    }
  });
});

/* ====================
   Exercise 4 - HTML form & POST
   ==================== */
app.get("/studentinfo", (req, res) => {
  res.sendFile("StudentInfo.html", { root: __dirname });
});

app.post("/submit-data", (req, res) => {
  // Build readable response from form fields
  const name = `${req.body.firstName || ""} ${req.body.lastName || ""}`.trim();
  const age = req.body.myAge || "";
  const gender = req.body.gender || "";
  const qual = Array.isArray(req.body.Qual) ? req.body.Qual.join(", ") : (req.body.Qual || "");

  res.json({
    status: true,
    message: "form Details",
    data: {
      name: name,
      age: age,
      gender: gender,
      Qualification: qual,
      email: req.body.email || ""
    }
  });
});

/* ====================
   Start server
   ==================== */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
