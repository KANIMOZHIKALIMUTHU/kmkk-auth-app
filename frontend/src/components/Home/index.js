import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to My App 🚀</h2>
      <p>
        This is a simple authentication system with Register, Login, and Dashboard pages.  
        Please register first if you are new, or login if you already have an account.
      </p>
      <Link to="/register">Get Started</Link>
    </div>
  );
}

export default Home;
