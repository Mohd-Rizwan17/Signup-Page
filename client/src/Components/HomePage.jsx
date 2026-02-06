import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homeWrap">
      <h1>Welcome 👋</h1>
      <p>Please login to continue</p>

      <button onClick={() => navigate("/login")}>Click Here</button>
    </div>
  );
}

export default HomePage;
