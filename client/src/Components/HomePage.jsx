import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-card">
        <h1>Welcome 👋</h1>
        <p>Please login to continue</p>
        <button onClick={() => navigate("/login")}>Click Here</button>
      </div>
    </div>
  );
}

export default HomePage;
