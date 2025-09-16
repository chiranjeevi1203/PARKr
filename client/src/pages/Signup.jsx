import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../public/Signup.module.css";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Simple email regex for validation
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // ✅ Frontend validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/user/signup", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/login"); // ✅ Redirect to login
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.log("Error in sending signup data", err);
      setError("Error signing up. Try again later.");
    }
  }

  return (
    <div className={styles.signupBox}>
      <p className="h1">Signup</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Username */}
        <div className={styles["flex-column"]}>
          <label>Username</label>
        </div>
        <div className={styles.inputForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className={styles["flex-column"]}>
          <label>Email</label>
        </div>
        <div className={styles.inputForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className={styles["flex-column"]}>
          <label>Password</label>
        </div>
        <div className={styles.inputForm}>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ✅ Show error message */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" className={styles["button-submit"]}>
          Signup
        </button>

        <p className={styles.p}>
          Already have an account?{" "}
          <span
            className={styles.span}
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Login
          </span>
        </p>
        <p className={`${styles.p} ${styles.line}`}>Or With</p>

        {/* Google button with SVG logo */}
        <div className={styles["flex-row"]}>
          <button type="button" className={`${styles.btn} ${styles.google}`}>
            <svg
              version="1.1"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FBBB00"
                d="M113.47,309.408L95.648,375.94l-65.139,1.378
                  C11.042,341.211,0,299.9,0,256
                  c0-42.45,10.32-82.48,28.62-117.73l57.99,10.63l25.4,57.64
                  c-5.32,15.5-8.21,32.14-8.21,49.45
                  C103.82,274.79,107.23,292.8,113.47,309.41z"
              ></path>
              <path
                fill="#518EF8"
                d="M507.53,208.18C510.47,223.66,512,239.65,512,256
                  c0,18.33-1.93,36.21-5.6,53.45
                  c-12.46,58.68-45.02,109.93-90.13,146.19l-73.04-3.73l-10.34-64.54
                  c29.93-17.55,53.32-45.03,65.65-77.91h-136.89V208.18h138.89z"
              ></path>
              <path
                fill="#28B446"
                d="M416.25,455.62C372.4,490.9,316.67,512,256,512
                  c-97.49,0-182.25-54.49-225.49-134.68l82.96-67.91
                  c21.62,57.7,77.28,98.77,142.53,98.77
                  c28.05,0,54.32-7.58,76.87-20.82L416.25,455.62z"
              ></path>
              <path
                fill="#F14336"
                d="M419.4,58.94l-82.93,67.9
                  c-23.34-14.59-50.92-23.01-80.47-23.01
                  c-66.73,0-123.43,42.96-143.97,102.72l-83.4-68.28
                  C71.23,56.12,157.06,0,256,0
                  C318.12,0,375.07,22.13,419.4,58.94z"
              ></path>
            </svg>
            Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
