import { useState } from "react";
import { taskAPI } from "../services/api";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await taskAPI.createTask(formData);

      // Tell Dashboard a new task was created
      onTaskCreated(response.data.task);

      // Reset form
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        dueDate: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        marginBottom: "30px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Create New Task</h3>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="title"
            placeholder="Task title (required)"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        {/* Priority + Status + Due Date in one row */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          {/* Priority */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Error */}
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 25px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
