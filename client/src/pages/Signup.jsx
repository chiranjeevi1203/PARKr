import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast"; // import your Toast component
import styles from "../public/Signup.module.css";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const navigate = useNavigate();

  // ✅ Simple email regex
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Frontend validation
    if (!username.trim()) {
      return setToast({ message: "Username is required", type: "error" });
    }
    if (!isValidEmail(email)) {
      return setToast({ message: "Please enter a valid email", type: "error" });
    }
    if (password.length < 6) {
      return setToast({ message: "Password must be at least 6 characters", type: "error" });
    }

    try {
      const res = await axios.post("http://localhost:8000/user/signup", {
        username,
        email,
        password,
      });

      if (res.status === 201) {

        localStorage.setItem(
    "user",
    JSON.stringify({
      username,
      email,
      phone: "",       // optional: add phone if available
      language: "English", // default
    })
  );

        setToast({ message: "Signup successful! Redirecting to login...", type: "success" });
        setTimeout(() => {
          navigate("/login"); // Redirect after showing toast
        }, 1500);
      } else {
        setToast({ message: "Signup failed. Please try again.", type: "error" });
      }
    } catch (err) {
      console.error("Error in sending signup data", err);
      setToast({ message: "Error signing up. Try again later.", type: "error" });
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
            {/* SVG omitted for brevity */}
            Google
          </button>
        </div>
      </form>

      {/* ✅ Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}
    </div>
  );
}

export default Signup;
