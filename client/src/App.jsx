import React, { use, useEffect, useState } from "react";
import Login from "./Components/Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Components/Home";
import ForgetPassword from "./Components/Pages/ForgetPassword";
import HomePage from "./Components/HomePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <>
      {/* <Login /> */}
      {/* <Router>
        {!user}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Home user={user} onlogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              user ? (
                <Home user={user} onlogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
