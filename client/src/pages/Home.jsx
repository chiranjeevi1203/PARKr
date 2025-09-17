import { Link } from "react-router-dom";
import video from "../assets/carparking.mp4";
import styles from "../public/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      {/* Background Video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className={styles.backgroundVideo}
      />

      {/* Dark Overlay */}
      <div className={styles.overlay}></div>

      {/* Foreground Content */}
      <div className={styles.content}>
        <h1>Welcome to PARKr</h1>
        <p>
          Find, reserve, and manage your parking spaces with ease and
          convenience.
        </p>
        <Link to="/login" className={styles.button}>
          <span>Get Started</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
