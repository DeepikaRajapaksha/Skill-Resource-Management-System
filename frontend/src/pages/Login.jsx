import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1 style={styles.title}>Skills Resource Management</h1>
        <p style={styles.subtitle}>
          Manage personnel skills efficiently and match the best team members to projects.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="illustration"
          style={styles.image}
        />
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <form style={styles.form} onSubmit={handleLogin}>
          <h2 style={styles.heading}>Login to Your Account</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="email"
            placeholder="admin@example.com"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="•••••"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>Login</button>

          <p style={styles.footer}>
            © 2025 Skills Resource Management System
          </p>
        </form>
      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },

  // LEFT PANEL (Purple Gradient)
  left: {
    width: "50%",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "18px",
    lineHeight: "28px",
    maxWidth: "350px",
    marginBottom: "40px",
  },

  image: {
    width: "180px",
    height: "180px",
  },

  // RIGHT PANEL (Form)
  right: {
    width: "50%",
    background: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "380px",
    padding: "40px",
    borderRadius: "14px",
    background: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#4a63e7",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #c8cdd3",
    fontSize: "15px",
    background: "#e3e7ed",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4a63e7",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  footer: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#777",
  },
};

