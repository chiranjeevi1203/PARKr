const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const { connectMongoDB } = require("./connnection");

// Import Google OAuth strategy
require("./auth/googleAuth");

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Express session (required for Passport)
app.use(
  session({
    secret: "secret", // change this to a strong secret
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/PARKr").then(() => {
  console.log("MongoDB Connected");
});

// Routes
app.use("/user", userRoutes);

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Redirect to frontend ParkrPage after successful Google login
    res.redirect("http://localhost:5173/parkrpage");
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
