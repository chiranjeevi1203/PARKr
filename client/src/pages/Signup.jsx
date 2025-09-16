import { useState } from "react";
import axios from "axios";
import styles from "../public/Signup.module.css";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/signup", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        console.log("Signup Successful");
      } else {
        console.log("Signup failed");
      }
    } catch (err) {
      console.log("Error in sending signup data", err);
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
          <svg
            height="20"
            width="20"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 2a7 7 0 1 0 7 7 7 7 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm0 2c-5.33 0-10 2.67-10 6v3h20v-3c0-3.33-4.67-6-10-6Zm8 7H8v-1c0-2.22 3.58-4 8-4s8 1.78 8 4Z" />
          </svg>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className={styles["flex-column"]}>
          <label>Email</label>
        </div>
        <div className={styles.inputForm}>
          <svg
            height="20"
            width="20"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </svg>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className={styles["flex-column"]}>
          <label>Password</label>
        </div>
        <div className={styles.inputForm}>
          <svg
            height="20"
            width="20"
            viewBox="-64 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.45 0-48-21.52-48-48v-224c0-26.47 21.55-48 48-48h288c26.45 0 48 21.52 48 48v224c0 26.48-21.55 48-48 48zm-288-288c-8.81 0-16 7.17-16 16v224c0 8.83 7.19 16 16 16h288c8.81 0 16-7.17 16-16v-224c0-8.83-7.19-16-16-16z"></path>
            <path d="m304 224c-8.83 0-16-7.17-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.83-7.17 16-16 16s-16-7.17-16-16v-80c0-70.59 57.41-128 128-128s128 57.41 128 128v80c0 8.83-7.17 16-16 16z"></path>
          </svg>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg
            viewBox="0 0 576 512"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0z"></path>
          </svg>
        </div>

        {/* Submit Button */}
        <button className={styles["button-submit"]}>Signup</button>

        <p className={styles.p}>
          Already have an account? <span className={styles.span}>Login</span>
        </p>
        <p className={`${styles.p} ${styles.line}`}>Or With</p>

        <div className={styles["flex-row"]}>
          <button className={`${styles.btn} ${styles.google}`}>
            <svg
              version="1.1"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FBBB00"
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                  c0-42.45,10.32-82.48,28.62-117.73l57.99,10.63l25.4,57.64c-5.32,15.5-8.21,32.14-8.21,49.45
                  C103.82,274.79,107.23,292.8,113.47,309.41z"
              ></path>
              <path
                fill="#518EF8"
                d="M507.53,208.18C510.47,223.66,512,239.65,512,256c0,18.33-1.93,36.21-5.6,53.45
                  c-12.46,58.68-45.02,109.93-90.13,146.19l-73.04-3.73l-10.34-64.54c29.93-17.55,53.32-45.03,65.65-77.91h-136.89V208.18h138.89z"
              ></path>
              <path
                fill="#28B446"
                d="M416.25,455.62C372.4,490.9,316.67,512,256,512c-97.49,0-182.25-54.49-225.49-134.68l82.96-67.91
                  c21.62,57.7,77.28,98.77,142.53,98.77c28.05,0,54.32-7.58,76.87-20.82L416.25,455.62z"
              ></path>
              <path
                fill="#F14336"
                d="M419.4,58.94l-82.93,67.9c-23.34-14.59-50.92-23.01-80.47-23.01c-66.73,0-123.43,42.96-143.97,102.72
                  l-83.4-68.28C71.23,56.12,157.06,0,256,0C318.12,0,375.07,22.13,419.4,58.94z"
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
