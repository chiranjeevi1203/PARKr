import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../public/Login.module.css";
import Toast from "../components/Toast"; // Make sure Toast.jsx and Toast.module.css exist

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);

          localStorage.setItem(
            "user",
            JSON.stringify({
            username: res.data.username, 
            email: res.data.email,
            phone: res.data.phone || "",
            language: res.data.language || "English",
          })
          );
        // Show success toast
        setToast({ message: "Login successful! Redirecting...", type: "success" });

        setTimeout(() => {
          navigate("/parkrpage");
        }, 1500);
      } else {
        setToast({ message: "Invalid credentials", type: "error" });
      }
    } catch (err) {
      console.log("Error in login:", err);
      setToast({ message: "Login failed. Please check your credentials.", type: "error" });
    }
  }

  return (
    <div className={styles.loginBox}>
      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <h1>Login</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
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

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Submit */}
        <button type="submit" className={styles["button-submit"]}>
          Login
        </button>

        {/* Signup link */}
        <p className={styles.p}>
          Don’t have an account?{" "}
          <span
            className={styles.span}
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Signup
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

export default Login;
