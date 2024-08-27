const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors= require("cors")
// const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(cors());

// Advanced setup: Allow only your frontend domain
const corsOptions = {
  origin: 'http://localhost:3000/', // Replace with your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable cookies and HTTP authentication
};
app.use(cors(corsOptions));


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
