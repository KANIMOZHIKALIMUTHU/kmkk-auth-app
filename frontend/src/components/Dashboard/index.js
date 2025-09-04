import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://kmkk-auth-app.onrender.com/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      alert("Logout failed, try again");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="welcome-box">
        <h3>Welcome, {user?.email}</h3>
        <p>You have successfully logged in. Enjoy your session 🎉</p>
      </div>
    </div>
  );
}

export default Dashboard;
