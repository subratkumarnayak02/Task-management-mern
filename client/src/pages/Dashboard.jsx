import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    // Not logged in? Redirect to login
    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h2>Welcome back, {user.name}! 👋</h2>
          <p style={{ color: "#666" }}>{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#1976d2" }}>0</h3>
          <p style={{ margin: "5px 0 0", color: "#666" }}>Total Tasks</p>
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff3e0",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#f57c00" }}>0</h3>
          <p style={{ margin: "5px 0 0", color: "#666" }}>In Progress</p>
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#388e3c" }}>0</h3>
          <p style={{ margin: "5px 0 0", color: "#666" }}>Completed</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div
        style={{
          padding: "30px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          textAlign: "center",
          border: "2px dashed #dee2e6",
        }}
      >
        <h3 style={{ color: "#495057" }}>No tasks yet!</h3>
        <p style={{ color: "#868e96" }}>Task features coming soon 🚀</p>
      </div>
    </div>
  );
}

export default Dashboard;
