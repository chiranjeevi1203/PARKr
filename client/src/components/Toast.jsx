import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // auto dismiss after 3s

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!visible) return null;

  return (
    <div key={Date.now()} className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className={styles.close}>
        &times;
      </button>
    </div>
  );
}

export default Toast;
