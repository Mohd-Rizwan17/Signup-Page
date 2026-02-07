// import React from "react";
// import Admin from "./Pages/Admin";
// import "./Home.css";

// function Home({ user, onlogout }) {
//   return (
//     <>
//       <div className="home-page">
//         <div className="welcome-card">
//           <h1>Welcome, {user?.name}</h1>
//           {user?.isAdmin && <p className="admin-badge">You are an admin</p>}
//           <div className="admin-divider"></div>
//           {/* <a className="logout-btn" href="#" onClick={onlogout}>
//             Logout
//           </a> */}
//         </div>
//         {/* {user?.isAdmin && <Admin user={user} />} */}
//         {user?.isAdmin && (
//           <div className="users-panel">
//             <h3>Users</h3>
//             <Admin user={user} />
//           </div>
//         )}
//         <div>
//           <a className="logout-btn" href="#" onClick={onlogout}>
//             Logout
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

//new home page

import React, { useEffect, useState } from "react";
import Admin from "./Pages/Admin";
import "./Home.css";

const BASE =
  process.env.REACT_APP_API_BASE || "https://signup-page-73ic.onrender.com";

function Home({ user, onlogout }) {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    admins: 0,
  });

  useEffect(() => {
    const page = document.querySelector(".home-page");

    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      page.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!user?.token || !user?.isAdmin) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASE}/api/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const total = res.data.length;
        const admins = res.data.filter((u) => u.isAdmin).length;

        setStats({
          total,
          admins,
          active: total, // demo active
        });
      } catch (err) {
        console.log("Stats error:", err.message);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="home-page">
      <div className="app-layout">
        {user?.isAdmin && (
          <aside className="sidebar">
            <h2>Admin Panel</h2>
            <a>Dashboard</a>
            <a>Users</a>
            <a>Settings</a>
            <a onClick={onlogout}>Logout</a>
          </aside>
        )}

        <div className="dashboard-area">
          <div className="dashboard">
            {/* Stats Cards */}
            {user?.isAdmin && (
              <div className="stats-row">
                <div className="stat-card">
                  <h4>Total Users</h4>
                  <span>{stats.total}</span>
                </div>
                <div className="stat-card">
                  <h4>Active Account</h4>
                  <span>{stats.active}</span>
                </div>
                <div className="stat-card">
                  <h4>Admins</h4>
                  <span>{stats.admins}</span>
                </div>
              </div>
            )}

            {/* Welcome Card */}
            <div className="welcome-card">
              <h1>Welcome, {user?.name}</h1>
              {user?.isAdmin && <p className="admin-badge">Admin Panel</p>}
            </div>

            {/* Users Panel */}
            {user?.isAdmin && (
              <div className="users-panel">
                <h3>Users</h3>
                <Admin user={user} />
              </div>
            )}

            {/* Logout Button */}
            {!user?.isAdmin && (
              <div>
                <a className="logout-btn" href="#" onClick={onlogout}>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
