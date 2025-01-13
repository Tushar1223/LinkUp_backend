const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors= require("cors")
// const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}


const allowedOrigins = [
  'https://linkup-frontend1.onrender.com', // Render frontend (if applicable)
  'https://link-up-two.vercel.app', // Replace with your actual Vercel frontend domain
  'http://localhost:3000', // Local development
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, sessions, etc.)
  allowedHeaders: ['Authorization', 'Content-Type'], // Ensure necessary headers are allowed
};

app.use(
  cors({
    origin: "https://link-up-two.vercel.app",
    credentials: true,
  })
);
// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

module.exports = app;
