const db = require("./models/db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// Secret key for JWT
const secretKey = "abcd1234!@#$";

// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend's origin
  methods: ['GET', 'PUT', 'OPTIONS', 'DELETE', 'PATCH', 'POST'],       // Allow these methods
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow these headers
  allowCredentials: true
}));

// Route: Test Server
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Route: Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  //console.log("Login attempt:", username, password)

  // Hardcoded credentials for testing purposes
  if (username === "Lakshmi" && password === "Lakshmi") {
    // Generate a token
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    console.log("Login successful");
    return res.status(200).json({ token });
  }
  console.log("Invalid login attempt");
  // Invalid credentials
  res.status(401).json({ message: "Invalid credentials" });
});

// Middleware: JWT Authentication

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token
  if (!token) return res.sendStatus(403); // Forbidden if no token is provided

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Attach user to request
    next();
  });
};


// Route: Summary Chart Data
app.get("/api/summary-chart", authenticateToken, (req, res) => {
  const data = {
    labels: ["GPT-2", "GPT-3", "GPT-4", "DALL·E", "Stable Diffusion"],
    values: [75, 85, 90, 80, 88],
  };
  res.status(200).json(data);
});

// Route: Reports Chart Data
app.get("/api/reports-chart", authenticateToken, (req, res) => {
  const data = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    values: [5, 10, 20, 35, 50, 75, 120, 180, 250],
  };
  res.json(data);
});

// Start the server
app.listen(PORT, () => console.log(`Backend is running on port ${PORT}`));
