import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../public/Profile.module.css"; // styling remains unchanged

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // ✅ Fetch user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // If no user, redirect to login
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <button
          onClick={() => navigate("/parkrpage")}
          className={styles.sidebarBtn}
        >
          PARKr
        </button>

        <button
          onClick={handleLogout}
          className={styles.sidebarBtnLogout}
        >
          Logout
        </button>
      </aside>

      {/* Profile Info */}
      <main className={styles.profileSection}>
        <h1 className={styles.title}>Personal info</h1>

        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <span className={styles.avatarIcon}>👤</span>
            <button className={styles.editBtn}>✎</button>
          </div>
        </div>

        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            <strong>Name</strong>
            <span>{user.username || "Chiranjeevi"}</span>
          </div>

          <div className={styles.infoRow}>
            <strong>Phone number</strong>
            <span>{user.phone || "7892304079"}</span>
          </div>

          <div className={styles.infoRow}>
            <strong>Email</strong>
            <span>{user.email || "chiranjeevi.p@bcah.christuniversity.in"}</span>
          </div>

          <div className={styles.infoRow}>
            <strong>Language</strong>
            <span>{user.language || "English"}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
