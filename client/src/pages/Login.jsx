import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../public/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        // ✅ Save token for future requests
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/parkrpage"); // Redirect to home
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.log("Error in login:", err);
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className={styles.loginBox}>
      <p className="h1">Login</p>

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

        {/* ✅ Show error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Submit */}
        <button type="submit" className={styles["button-submit"]}>
          Login
        </button>

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

        {/* Google Button */}
        <div className={styles["flex-row"]}>
          <a href="http://localhost:8000/auth/google"></a>
          <button type="button" className={`${styles.btn} ${styles.google}`}>
            <svg
              version="1.1"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FBBB00"
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                  c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                  C103.821,274.792,107.225,292.797,113.47,309.408z"
              />
              <path
                fill="#518EF8"
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                  c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                  c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              />
              <path
                fill="#28B446"
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                  c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                  c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              />
              <path
                fill="#F14336"
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                  c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                  C318.115,0,375.068,22.126,419.404,58.936z"
              />
            </svg>
            Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
