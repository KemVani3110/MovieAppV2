const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const SECRET_KEY = "dgkljdshbnjfjdrkhgjkdrsvjursw131313213";

// Middleware
app.use(cors({ origin: "*" })); // Hạn chế thành URL cụ thể nếu cần
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "khoi31102003",
  database: "movie_booking",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được
  }
  console.log("Connected to MySQL database.");
});

// Utility function: Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Register Endpoint
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12); // Sử dụng 12 rounds để tăng bảo mật

    const query = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    db.query(query, [email, username, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email or Username already exists." });
        }
        return res.status(500).json({ message: "Database error.", error: err });
      }
      res.status(201).json({ message: "User registered successfully." });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err });
  }
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "Username/Email and password are required." });
  }

  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [emailOrUsername, emailOrUsername], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error.", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username/email or password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  });
});

// Endpoint to check if server is running
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
