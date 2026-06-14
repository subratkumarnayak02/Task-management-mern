import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taskAPI } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchTasks();
  }, [navigate]);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Called by TaskForm when new task created
  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]); // Add to top of list
    setShowForm(false); // Hide form
  };

  // Called by TaskCard when task updated
  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
    );
  };

  // Called by TaskCard when task deleted
  const handleTaskDeleted = (deletedId) => {
    setTasks(tasks.filter((task) => task._id !== deletedId));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // Stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          paddingBottom: "20px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Welcome {user.name}! 👋</h2>
          <p style={{ margin: "5px 0 0", color: "#6c757d" }}>{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            label: "Total",
            value: stats.total,
            color: "#e3f2fd",
            textColor: "#1976d2",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "#fff3e0",
            textColor: "#f57c00",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            color: "#e8eaf6",
            textColor: "#3f51b5",
          },
          {
            label: "Completed",
            value: stats.completed,
            color: "#e8f5e9",
            textColor: "#388e3c",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              padding: "15px",
              backgroundColor: stat.color,
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "28px",
                color: stat.textColor,
              }}
            >
              {stat.value}
            </h3>
            <p
              style={{
                margin: "5px 0 0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            backgroundColor: showForm ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {showForm ? "Cancel" : "+ Add New Task"}
        </button>
      </div>

      {/* Task Form (shown/hidden) */}
      {showForm && <TaskForm onTaskCreated={handleTaskCreated} />}

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {["all", "pending", "in-progress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 15px",
              backgroundColor: filter === f ? "#007bff" : "#e9ecef",
              color: filter === f ? "white" : "#495057",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              textTransform: "capitalize",
            }}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Task List */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#6c757d" }}>
          Loading tasks...
        </p>
      ) : filteredTasks.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "2px dashed #dee2e6",
          }}
        >
          <p style={{ color: "#6c757d", margin: 0 }}>
            {filter === "all"
              ? "No tasks yet! Create your first task above 👆"
              : `No ${filter} tasks found`}
          </p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;
