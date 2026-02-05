import React from "react";
import FetchUser from "./FetchUser";

function Admin({ user }) {
  if (!user?.isAdmin) {
    return <div>Not admin</div>;
  }
  return (
    <div>
      {/* Admin Panel */}
      <FetchUser />
    </div>
  );
}

export default Admin;
